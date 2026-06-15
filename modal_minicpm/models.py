"""Served-model registry for the Tiny Court Modal llama.cpp backend.

Tiny Court splits the work across roles instead of asking one weak multimodal
model to do everything (see docs/modal-serving-decision.md). MiniCPM-V is kept
for **vision only** — its text output is too weak for the strict courtroom
contract — and a larger Q8 text model owns the reasoning/fields.

Each deployed model gets its **own** llama.cpp endpoint (its own GPU/container,
kept warm independently) so a trial never pays a model-swap reload. The client
routes per call: image evidence → the vision endpoint, everything else → judge.

Quantization note: we deliberately pick the **larger Q8** GGUFs where they exist
(first-party or a reputable third-party quantizer). First-party Q8 is missing for
several repos, so the judge uses unsloth's Q8_0 and Mellum uses first-party Q6_K
(no Q8 published). Sizes below are the on-disk GGUF sizes verified via the HF API.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ServedModel:
    key: str             # endpoint key == Modal function suffix (serve_<key>)
    role: str            # "judge" | "vision" | "formatter"
    served_model: str    # OpenAI model alias the client sends in "model"
    repo_id: str
    model_file: str
    gpu: str             # Modal GPU string
    approx_params_b: float
    sponsor: str
    why: str
    mmproj_file: str | None = None
    context_size: int = 4096


# Endpoints that actually get deployed (one `serve_<key>` function each). These
# are the "larger Q8" roster: a strong NVIDIA judge, OpenBMB vision at Q8, and a
# JetBrains formatter for schema repair.
DEPLOYED: dict[str, ServedModel] = {
    "judge": ServedModel(
        key="judge",
        role="judge",
        served_model="NVIDIA-Nemotron-3-Nano-4B",
        repo_id="unsloth/NVIDIA-Nemotron-3-Nano-4B-GGUF",
        model_file="NVIDIA-Nemotron-3-Nano-4B-Q8_0.gguf",
        gpu="L4",
        approx_params_b=4.0,
        sponsor="nvidia",
        why=(
            "Primary text judge. NVIDIA sponsor; 4B (well under the 32B cap), "
            "Q8_0 (4.2 GB) so it fits a cheap L4 24GB card with room for vision "
            "and formatter on the same tier. A large quality jump over MiniCPM-V "
            "for the strict courtroom fields without a premium GPU."
        ),
        context_size=8192,
    ),
    "vision": ServedModel(
        key="vision",
        role="vision",
        served_model="MiniCPM-V-4.6",
        repo_id="openbmb/MiniCPM-V-4.6-gguf",
        model_file="MiniCPM-V-4_6-Q8_0.gguf",
        gpu="L4",
        approx_params_b=1.3,
        sponsor="openbmb",
        why=(
            "Vision-only evidence reader. OpenBMB sponsor, Tiny Titan eligible "
            "(~1.3B). Q8_0 (up from Q4) for the best small-VLM perception. Never "
            "asked to own strict court fields."
        ),
        mmproj_file="mmproj-model-f16.gguf",
    ),
    "formatter": ServedModel(
        key="formatter",
        role="formatter",
        served_model="Mellum2-12B-A2.5B-Instruct",
        repo_id="JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K",
        model_file="Mellum2-12B-A2.5B-Instruct-Q6_K.gguf",
        gpu="L4",
        approx_params_b=12.0,
        sponsor="jetbrains",
        why=(
            "Strict formatter / schema-repair. JetBrains sponsor; 12B MoE "
            "(~2.5B active). No first-party Q8 published, so Q6_K (10.9 GB). "
            "Used to coerce rough judge output into typed fields, not as the "
            "court persona."
        ),
    ),
}


# Documented, *not auto-deployed* swaps. Flip one into DEPLOYED (or change the
# judge's repo/file/gpu) to trade cost for size. All verified to publish Q8_0.
ALTERNATES: dict[str, ServedModel] = {
    "judge-qwen3-14b": ServedModel(
        key="judge-qwen3-14b",
        role="judge",
        served_model="Qwen3-14B",
        repo_id="unsloth/Qwen3-14B-GGUF",
        model_file="Qwen3-14B-Q8_0.gguf",
        gpu="A100-40GB",
        approx_params_b=14.0,
        sponsor="none",
        why="Bigger non-sponsor judge: guaranteed llama.cpp support, large jump "
        "(15.7 GB, fits A100-40GB / A10G 24GB). Use if the 4B isn't strong enough.",
        context_size=8192,
    ),
    "judge-nemotron-30b": ServedModel(
        key="judge-nemotron-30b",
        role="judge",
        served_model="Nemotron-3-Nano-30B-A3B",
        repo_id="unsloth/Nemotron-3-Nano-30B-A3B-GGUF",
        model_file="Nemotron-3-Nano-30B-A3B-Q8_0.gguf",
        gpu="A100-80GB",
        approx_params_b=30.0,
        sponsor="nvidia",
        why="Premium NVIDIA judge: 30B MoE (~3B active, still < 32B cap), top "
        "quality. Needs A100-80GB (33.6 GB Q8). Use only if budget allows and "
        "the pinned llama.cpp wheel loads the arch.",
        context_size=8192,
    ),
}


DEFAULT_MODEL_KEY = "judge"


def all_known() -> dict[str, ServedModel]:
    return {**DEPLOYED, **ALTERNATES}


def model_for_key(key: str | None) -> ServedModel:
    if not key:
        return DEPLOYED[DEFAULT_MODEL_KEY]
    known = all_known()
    try:
        return known[key]
    except KeyError as exc:
        names = ", ".join(sorted(known))
        raise ValueError(f"unknown model key {key!r}; expected one of: {names}") from exc
