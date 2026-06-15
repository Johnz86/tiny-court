"""Modal llama.cpp backend for Tiny Court — one OpenAI-compatible endpoint per
served model (judge / vision / formatter).

Follows Modal's official llama.cpp/OpenAI-server example shape:

* build one cached CUDA image with a prebuilt `llama-cpp-python` CUDA wheel;
* keep GGUF weights in a shared Modal Volume;
* download model files in a separate function (per model key);
* expose **one `@modal.asgi_app` per role**, each on its own GPU and kept warm
  independently so a trial never pays a model-swap reload.

Endpoints (proxy-auth protected) after deploy:

    https://<workspace>--tinycourt-models-serve-judge.modal.run/v1/chat/completions
    https://<workspace>--tinycourt-models-serve-vision.modal.run/v1/chat/completions
    https://<workspace>--tinycourt-models-serve-formatter.modal.run/v1/chat/completions

Deploy / inspect:

    modal deploy modal_minicpm/modal_app.py        # build + publish all endpoints
    modal run    modal_minicpm/modal_app.py         # print the planned roster (local)

Design rationale + model choices: docs/modal-serving-decision.md.
(The package is still named `modal_minicpm` for history; it now serves the full
multimodel roster, not only MiniCPM.)
"""

from __future__ import annotations

from pathlib import Path

import modal

from modal_minicpm.models import DEPLOYED, ServedModel, model_for_key


APP_NAME = "tinycourt-models"
MINUTES = 60
MODELS_DIR = "/models"
CACHE_DIR = "/root/.cache/tinycourt-models"

app = modal.App(APP_NAME)
model_cache = modal.Volume.from_name("tinycourt-models", create_if_missing=True)

CUDA_TAG = "13.2.0-runtime-ubuntu24.04"
PYTHON_VERSION = "3.12"
LLAMA_CPP_WHEEL_URL = (
    "https://github.com/abetlen/llama-cpp-python/releases/download/"
    "v0.3.29-cu132/llama_cpp_python-0.3.29-py3-none-manylinux_2_35_x86_64.whl"
)

server_image = (
    modal.Image.from_registry(f"nvidia/cuda:{CUDA_TAG}", add_python=PYTHON_VERSION)
    .apt_install(
        "libcurl4-openssl-dev",
        "libopenblas-dev",
        "libomp-dev",
    )
    .pip_install(
        [
            "fastapi==0.115.8",
            "huggingface_hub[hf_transfer]>=0.34.0",
            "pydantic==2.10.6",
            "pydantic-settings==2.7.1",
            "python-multipart==0.0.20",
            "sse-starlette==2.2.1",
            "starlette-context==0.3.6",
            "uvicorn[standard]==0.34.0",
        ]
    )
    .run_commands(
        f"pip install 'llama-cpp-python[server] @ {LLAMA_CPP_WHEEL_URL}'"
    )
    .env(
        {
            "HF_HUB_ENABLE_HF_TRANSFER": "1",
            "HF_XET_HIGH_PERFORMANCE": "1",
        }
    )
    .entrypoint([])
    .add_local_python_source("modal_minicpm")
)

download_image = (
    modal.Image.debian_slim(python_version=PYTHON_VERSION)
    .pip_install("huggingface_hub[hf_transfer]>=0.34.0")
    .env(
        {
            "HF_HUB_ENABLE_HF_TRANSFER": "1",
            "HF_XET_HIGH_PERFORMANCE": "1",
        }
    )
    .add_local_python_source("modal_minicpm")
)


@app.function(
    image=download_image,
    volumes={CACHE_DIR: model_cache},
    timeout=60 * MINUTES,
)
def download_model(model_key: str) -> None:
    """Fetch just the GGUF (+ mmproj) for one model key into the shared volume."""
    from huggingface_hub import snapshot_download

    model = model_for_key(model_key)
    allow_patterns = [model.model_file]
    if model.mmproj_file:
        allow_patterns.append(model.mmproj_file)

    print(f"Downloading {model.repo_id}: {', '.join(allow_patterns)}")
    snapshot_download(
        repo_id=model.repo_id,
        local_dir=CACHE_DIR,
        allow_patterns=allow_patterns,
    )
    model_cache.commit()
    print(f"Model files for {model.key} present in the Modal volume.")


def _model_path(filename: str) -> str:
    return str(Path(MODELS_DIR) / filename)


def _build_server(model_key: str):
    """Construct a llama.cpp OpenAI-compatible ASGI app for one model key.

    Ensures the model's files are in the shared volume first, then serves a
    single-model llama.cpp server whose `model_alias` is the name the Tiny Court
    client sends in the request's `"model"` field.
    """
    from llama_cpp.server.app import create_app
    from llama_cpp.server.settings import ModelSettings, ServerSettings

    model: ServedModel = model_for_key(model_key)
    download_model.remote(model_key)
    model_cache.reload()

    mmproj_path = _model_path(model.mmproj_file) if model.mmproj_file else None
    model_settings = [
        ModelSettings(
            model=_model_path(model.model_file),
            model_alias=model.served_model,
            clip_model_path=mmproj_path,
            n_gpu_layers=-1,
            n_ctx=model.context_size,
            n_batch=512,
            n_threads=8,
            flash_attn=True,
            verbose=True,
        )
    ]
    server_settings = ServerSettings(host="0.0.0.0", port=8000)
    return create_app(server_settings=server_settings, model_settings=model_settings)


# --- One warm endpoint per deployed role -----------------------------------
# Each function reads its GPU/timeouts from the registry so the model roster is
# the single source of truth. `scaledown_window` lets idle endpoints release the
# GPU (scale to zero); the first request after idle pays a cold start.

_JUDGE = DEPLOYED["judge"]
_VISION = DEPLOYED["vision"]
_FORMATTER = DEPLOYED["formatter"]


@app.function(
    image=server_image,
    gpu=_JUDGE.gpu,
    volumes={MODELS_DIR: model_cache},
    timeout=20 * MINUTES,
    scaledown_window=10 * MINUTES,
    max_containers=1,
)
@modal.asgi_app(requires_proxy_auth=True)
def serve_judge():
    return _build_server("judge")


@app.function(
    image=server_image,
    gpu=_VISION.gpu,
    volumes={MODELS_DIR: model_cache},
    timeout=15 * MINUTES,
    scaledown_window=10 * MINUTES,
    max_containers=1,
)
@modal.asgi_app(requires_proxy_auth=True)
def serve_vision():
    return _build_server("vision")


@app.function(
    image=server_image,
    gpu=_FORMATTER.gpu,
    volumes={MODELS_DIR: model_cache},
    timeout=15 * MINUTES,
    scaledown_window=10 * MINUTES,
    max_containers=1,
)
@modal.asgi_app(requires_proxy_auth=True)
def serve_formatter():
    return _build_server("formatter")


# --- ASR (audio evidence) ---------------------------------------------------
# A different serving pattern from the llama.cpp roster: a small custom FastAPI
# app exposing a JSON `/transcribe` endpoint (not an OpenAI chat endpoint). The
# model is NVIDIA Parakeet TDT 0.6B — an NVIDIA sponsor ASR (0.6B, ungated, < 32B)
# that loads with *released* NeMo and transcribes correctly via `model.transcribe`.
#
# Why not the listed nemotron-3.5-asr-streaming target? It needs NeMo from git
# main AND is a *prompted* multilingual model whose offline `transcribe()` wants a
# per-utterance language injected onto the lhotse cut — an undocumented path that
# silently ignores prompt/target_lang kwargs (verified: it loads but every
# standard call fails `Unknown prompt key: None`). Parakeet keeps the NVIDIA
# sponsor credit and actually works. (Cohere Transcribe is the other target but is
# gated + needs trust_remote_code.) NeMo pulls a CUDA-enabled torch, so this runs
# on a GPU; ffmpeg normalises any upload to 16 kHz mono. The load is wrapped so a
# failure returns a JSON error instead of crash-looping the container.

ASR_REPO = "nvidia/parakeet-tdt-0.6b-v2"
ASR_FILE = "parakeet-tdt-0.6b-v2.nemo"
ASR_DIR = "/asr-models"
asr_cache = modal.Volume.from_name("tinycourt-asr", create_if_missing=True)

asr_image = (
    modal.Image.debian_slim(python_version=PYTHON_VERSION)
    .apt_install("ffmpeg", "libsndfile1")
    .pip_install(
        "nemo_toolkit[asr]",
        "cuda-python>=12.3",
        "fastapi==0.115.8",
        "uvicorn[standard]==0.34.0",
        "huggingface_hub[hf_transfer]>=0.34.0",
    )
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .add_local_python_source("modal_minicpm")
)


@app.function(
    image=asr_image,
    gpu="L4",
    volumes={ASR_DIR: asr_cache},
    timeout=20 * MINUTES,
    scaledown_window=10 * MINUTES,
    max_containers=1,
)
@modal.asgi_app(requires_proxy_auth=True)
def serve_asr():
    import base64
    import subprocess
    import tempfile

    from fastapi import Body, FastAPI

    # Load once at startup, but never let a load failure crash-loop the container.
    model = None
    load_error = None
    try:
        import nemo.collections.asr as nemo_asr
        from huggingface_hub import hf_hub_download

        nemo_path = hf_hub_download(repo_id=ASR_REPO, filename=ASR_FILE, local_dir=ASR_DIR)
        model = nemo_asr.models.ASRModel.restore_from(nemo_path, map_location="cuda")
        model.eval()
    except Exception as exc:  # surfaced via /transcribe, not a crash loop
        load_error = f"{type(exc).__name__}: {exc}"
        print(f"[asr] model load failed: {load_error}")

    web = FastAPI()

    @web.post("/transcribe")
    def transcribe(payload: dict = Body(...)):
        if model is None:
            return {"text": "", "error": f"asr unavailable: {load_error}"}
        audio_b64 = payload.get("audio_base64") or ""
        if not audio_b64:
            return {"text": "", "error": "no audio_base64"}
        raw = base64.b64decode(audio_b64)
        suffix = "." + (payload.get("format") or "wav")
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as fh:
            fh.write(raw)
            src = fh.name
        # Normalise to 16 kHz mono wav (what NeMo ASR expects) from any format.
        wav16 = src + ".16k.wav"
        try:
            subprocess.run(
                ["ffmpeg", "-y", "-i", src, "-ar", "16000", "-ac", "1", wav16],
                check=True, capture_output=True,
            )
            out = model.transcribe([wav16])
            hyp = out[0] if out else ""
            if isinstance(hyp, list):
                hyp = hyp[0] if hyp else ""
            text = getattr(hyp, "text", hyp)  # NeMo returns str or Hypothesis
            return {"text": str(text).strip()}
        except Exception as exc:  # surface the error instead of a bare 500
            return {"text": "", "error": f"{type(exc).__name__}: {exc}"}

    return web


@app.local_entrypoint()
def main() -> None:
    """Print the planned roster (runs locally, no GPU billing)."""
    print(f"App: {APP_NAME}\n")
    for key, m in DEPLOYED.items():
        print(f"[{m.role}] serve_{key}")
        print(f"  alias : {m.served_model}")
        print(f"  repo  : https://huggingface.co/{m.repo_id}")
        print(f"  file  : {m.model_file}" + (f" (+ {m.mmproj_file})" if m.mmproj_file else ""))
        print(f"  gpu   : {m.gpu}   sponsor: {m.sponsor}   ~{m.approx_params_b:g}B")
        print()
    print(f"[asr] serve_asr   {ASR_REPO} (NeMo) on L4  -> POST /transcribe")
