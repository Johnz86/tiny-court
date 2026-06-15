"""Local Transformers backend (docs/adr/0002), ZeroGPU-ready (docs/deployment.md).

Loads the registry model (Qwen3 — natively supported by transformers, no remote
code) from the repo-local cache and runs the courtroom prompts through the seam.
Imported lazily by ``engine.make_client`` so torch/transformers/bitsandbytes are
never required for the FakeClient path or the test suite.

ZeroGPU shape (huggingface-zerogpu skill):

* ``import spaces`` is unconditional — off-ZeroGPU it is a true no-op, and
  ``@spaces.GPU`` is a transparent passthrough, so this same file runs unchanged
  locally (real GPU), on a CPU box, and on a ZeroGPU Space.
* The model + tokenizer live in **module globals**, loaded once. The real GPU is
  only attached inside the ``@spaces.GPU`` function, which runs in a forked
  worker; that worker reaches the weights through the globals (no pickling of the
  model). Only small encoded tensors cross the process boundary, and a **CPU**
  tensor is returned (returning a CUDA tensor would trip ``torch.cuda._lazy_init``
  in the parent).
* No CUDA computation happens at import — ``model.to(device)`` at load time only
  registers the weights with the ZeroGPU backend (it monkey-patches torch so the
  call succeeds); generation is the only GPU compute and it is decorated.
"""

from __future__ import annotations

import re
import threading
import time
import warnings

import spaces

from .config import ModelSpec, selected_model
from .generation import CallTag, GenerationClient, GenerationResult, Message

# bitsandbytes 0.49 emits a torch `_check_is_size` FutureWarning on every 4-bit
# matmul — one per generated token. Pure third-party noise; silence at the seam.
warnings.filterwarnings("ignore", category=FutureWarning, module=r"bitsandbytes(\..*)?")

# Thinking-hybrid models (Qwen3 base line) may still open a reasoning block even
# with thinking disabled; strip it so the delimited parser only sees the answer.
_THINK_RE = re.compile(r"<think>.*?(?:</think>|\Z)", re.DOTALL)

# Module-global model handles (read-only after load). Kept at module scope so the
# forked @spaces.GPU worker can reach the weights without them crossing the pickle
# boundary (huggingface-zerogpu: process isolation + CUDA availability model).
_MODEL = None
_TOKENIZER = None
_TORCH = None
_SPEC: ModelSpec | None = None
# Serializes the (heavy, slow) one-time load so a warmup thread and the first
# request can't both pass the None-check and load the model twice (double VRAM).
_LOAD_LOCK = threading.Lock()


def _load(spec: ModelSpec) -> None:
    """Load the model + tokenizer into the module globals exactly once. Safe to
    call from a warmup thread or the first request; subsequent calls are no-ops."""
    global _MODEL, _TOKENIZER, _TORCH, _SPEC
    if _MODEL is not None:
        return
    with _LOAD_LOCK:
        if _MODEL is not None:  # another thread finished while we waited
            return
        _load_locked(spec)


def _load_locked(spec: ModelSpec) -> None:
    global _MODEL, _TOKENIZER, _TORCH, _SPEC

    import torch  # noqa: PLC0415 — lazy, heavy

    from transformers import AutoModelForCausalLM, AutoTokenizer

    _TORCH = torch
    _SPEC = spec

    load_kwargs: dict = {"trust_remote_code": spec.trust_remote_code}
    # is_available() is True on a real GPU and is monkey-patched True under
    # ZeroGPU (where it registers the weights for device migration); on a CPU box
    # it is genuinely False and we fall back to float32.
    if torch.cuda.is_available():
        if spec.quantization == "4bit":
            from transformers import BitsAndBytesConfig

            load_kwargs["quantization_config"] = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_compute_dtype=torch.bfloat16,
                bnb_4bit_quant_type="nf4",
                bnb_4bit_use_double_quant=True,
            )
            load_kwargs["device_map"] = "auto"
        else:
            load_kwargs["dtype"] = torch.bfloat16
            load_kwargs["device_map"] = "auto"
    else:
        # CPU fallback (slow, but keeps the path runnable without a GPU).
        load_kwargs["dtype"] = torch.float32

    _TOKENIZER = AutoTokenizer.from_pretrained(
        spec.repo_id, trust_remote_code=spec.trust_remote_code
    )
    _MODEL = AutoModelForCausalLM.from_pretrained(spec.repo_id, **load_kwargs)
    _MODEL.eval()


def _gpu_duration(enc: dict, gen_kwargs: dict) -> int:
    """Estimate the GPU lease for one generation from the token budget, so a short
    call doesn't reserve (and risk failing on) the full default quota window
    (huggingface-zerogpu: declare the smallest realistic duration)."""
    budget = int(gen_kwargs.get("max_new_tokens", 320))
    return min(120, 20 + int(budget * 0.18))


@spaces.GPU(duration=_gpu_duration)
def _gpu_generate(enc: dict, gen_kwargs: dict):
    """The only GPU compute. Runs in the forked ZeroGPU worker; reads the model
    from the module globals, returns a CPU tensor (never a CUDA tensor — that
    would trip ``torch.cuda._lazy_init`` when unpickled in the parent)."""
    torch = _TORCH
    device = _MODEL.device
    enc = {k: v.to(device) for k, v in enc.items()}
    with torch.no_grad():
        output = _MODEL.generate(**enc, **gen_kwargs)
    return output[0].detach().to("cpu")


class LocalTransformersClient(GenerationClient):
    name = "local"

    def __init__(self, spec: ModelSpec | None = None) -> None:
        self.spec = spec or selected_model()
        _load(self.spec)

    def _encode(self, chat: list[dict]):
        """Apply the chat template (on CPU, in the main process), disabling
        thinking on hybrid models whose template accepts the flag (Qwen3); fall
        back cleanly when it doesn't."""
        kwargs = dict(add_generation_prompt=True, return_tensors="pt", return_dict=True)
        try:
            return _TOKENIZER.apply_chat_template(chat, enable_thinking=False, **kwargs)
        except (TypeError, ValueError):
            return _TOKENIZER.apply_chat_template(chat, **kwargs)

    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        chat = [{"role": m.role, "content": m.content} for m in messages]
        raw = self._encode(chat)
        # Cross the GPU boundary with a plain dict of CPU tensors only. Most chat
        # templates emit attention_mask; tolerate one that doesn't rather than
        # KeyError. token_type_ids and other extras are dropped (unused by Qwen3).
        enc = {"input_ids": raw["input_ids"]}
        if "attention_mask" in raw:
            enc["attention_mask"] = raw["attention_mask"]
        input_len = enc["input_ids"].shape[-1]

        # Only pass sampling knobs when actually sampling — transformers warns
        # ("generation flags are not valid") if they ride along with greedy.
        gen_kwargs: dict = {"max_new_tokens": max_new_tokens, "pad_token_id": _TOKENIZER.eos_token_id}
        if temperature > 0:
            gen_kwargs.update(do_sample=True, temperature=temperature, top_p=0.9)
        else:
            # Null out the model's own sampling defaults (Qwen ships temperature/
            # top_p in generation_config.json) or greedy mode warns about them.
            gen_kwargs.update(do_sample=False, temperature=None, top_p=None, top_k=None)

        start = time.perf_counter()
        output = _gpu_generate(enc, gen_kwargs)
        elapsed = time.perf_counter() - start

        new_tokens = output[input_len:]
        text = _TOKENIZER.decode(new_tokens, skip_special_tokens=True)
        text = _THINK_RE.sub("", text).strip()
        return GenerationResult(
            text=text,
            tag=tag,
            tokens=int(new_tokens.shape[-1]),
            seconds=elapsed,
            meta={"model": self.spec.repo_id, "tok_s": round(int(new_tokens.shape[-1]) / elapsed, 1) if elapsed else 0.0},
        )
