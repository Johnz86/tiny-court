"""Modal OpenAI-compatible MiniCPM-V 4.6 server for Tiny Court.

This follows Modal's official llama.cpp/OpenAI-server example shape:

* build one cached CUDA image with a prebuilt `llama-cpp-python` CUDA wheel;
* keep GGUF weights in a Modal Volume;
* download model files in a separate function;
* expose the server with `@modal.asgi_app()`.

Deploy:

    modal deploy modal_minicpm/modal_app.py
"""

from __future__ import annotations

from pathlib import Path

import modal

from modal_minicpm.models import DEFAULT_MODEL_KEY, model_for_key


APP_NAME = "tinycourt-minicpm-openai"
MINUTES = 60
MODEL_KEY = DEFAULT_MODEL_KEY
MODEL = model_for_key(MODEL_KEY)
MODELS_DIR = "/models"
CACHE_DIR = "/root/.cache/tinycourt-minicpm"

app = modal.App(APP_NAME)
model_cache = modal.Volume.from_name("tinycourt-minicpm-models", create_if_missing=True)

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
    timeout=30 * MINUTES,
)
def download_model(model_key: str = MODEL_KEY) -> None:
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
    print("Model files are present in the Modal volume.")


def _model_path(filename: str) -> str:
    return str(Path(MODELS_DIR) / filename)


@app.function(
    image=server_image,
    gpu="T4",
    volumes={MODELS_DIR: model_cache},
    timeout=15 * MINUTES,
    scaledown_window=10 * MINUTES,
    max_containers=1,
)
@modal.asgi_app()
def serve():
    from llama_cpp.server.app import create_app
    from llama_cpp.server.settings import ModelSettings, ServerSettings

    download_model.remote(MODEL_KEY)
    model_cache.reload()

    model_path = _model_path(MODEL.model_file)
    mmproj_path = _model_path(MODEL.mmproj_file) if MODEL.mmproj_file else None

    model_settings = [
        ModelSettings(
            model=model_path,
            model_alias=MODEL.served_model,
            clip_model_path=mmproj_path,
            n_gpu_layers=-1,
            n_ctx=4096,
            n_batch=512,
            n_threads=8,
            flash_attn=True,
            verbose=True,
        )
    ]
    server_settings = ServerSettings(host="0.0.0.0", port=8000)
    return create_app(server_settings=server_settings, model_settings=model_settings)


@app.local_entrypoint()
def main(model_key: str = MODEL_KEY) -> None:
    model = model_for_key(model_key)
    print(f"App: {APP_NAME}")
    print(f"Model key: {model.key}")
    print(f"Repo: https://huggingface.co/{model.repo_id}")
    print(f"Model file: {model.model_file}")
    print(f"MMProj file: {model.mmproj_file}")
    print(f"Served model alias: {model.served_model}")
