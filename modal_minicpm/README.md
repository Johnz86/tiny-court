# Tiny Court Modal MiniCPM Backend

This folder prepares a Modal deployment that serves OpenBMB MiniCPM-V 4.6
through the llama.cpp runtime via `llama-cpp-python`'s OpenAI-compatible ASGI
server:

```text
/v1/chat/completions
```

## Model choices

The model registry is in `models.py`. These Hugging Face links were verified on
2026-06-15 with both:

```powershell
uv run hf models card openbmb/MiniCPM-V-4.6-gguf
uv run hf models info openbmb/MiniCPM-V-4.6-gguf
uv run hf models ls openbmb/MiniCPM-V-4.6-gguf --tree -h
```

and with `huggingface_hub.model_info()` / `list_repo_files()`.

The primary repo's model card says it hosts the GGUF / llama.cpp quantized
version of `openbmb/MiniCPM-V-4.6`. `hf models info` also reports:

```text
id: openbmb/MiniCPM-V-4.6-gguf
base_model: openbmb/MiniCPM-V-4.6
pipeline_tag: image-text-to-text
tags include: gguf, minicpm-v, multimodal, endpoints_compatible
gated: false
private: false
sha: 78e02f066e9819a60573b78a4275df8a0c27f698
```

| Key | Repo | File | Why |
|---|---|---|---|
| `minicpm-v-4.6-q4` | [`openbmb/MiniCPM-V-4.6-gguf`](https://huggingface.co/openbmb/MiniCPM-V-4.6-gguf) | `MiniCPM-V-4_6-Q4_K_M.gguf` + `mmproj-model-f16.gguf` | Primary competition target: MiniCPM-V-4.6 in GGUF form for llama.cpp / Modal. |
| `minicpm-v-4.6-base` | [`openbmb/MiniCPM-V-4.6`](https://huggingface.co/openbmb/MiniCPM-V-4.6) | no `.gguf` files in this repo | Upstream/base model link for the OpenBMB target; do not serve this repo directly with llama.cpp. |
| `minicpm-v-4-q4` | [`openbmb/MiniCPM-V-4-gguf`](https://huggingface.co/openbmb/MiniCPM-V-4-gguf) | `ggml-model-Q4_K_M.gguf` + `mmproj-model-f16.gguf` | Older GGUF fallback if 4.6 runtime support blocks. |
| `minicpm-v-4.5-q4` | [`openbmb/MiniCPM-V-4_5-gguf`](https://huggingface.co/openbmb/MiniCPM-V-4_5-gguf) | `MiniCPM-V-4_5-Q4_K_M.gguf` + `mmproj-model-f16.gguf` | Quality fallback, but not the first choice for the competition target. |

Verified GGUF files for the primary target:

```text
https://huggingface.co/openbmb/MiniCPM-V-4.6-gguf
MiniCPM-V-4_6-F16.gguf       1.5 GB
MiniCPM-V-4_6-Q4_0.gguf    501.3 MB
MiniCPM-V-4_6-Q4_1.gguf    532.4 MB
MiniCPM-V-4_6-Q4_K_M.gguf  529.1 MB
MiniCPM-V-4_6-Q4_K_S.gguf  505.1 MB
MiniCPM-V-4_6-Q5_0.gguf    563.5 MB
MiniCPM-V-4_6-Q5_1.gguf    594.6 MB
MiniCPM-V-4_6-Q5_K_M.gguf  577.8 MB
MiniCPM-V-4_6-Q5_K_S.gguf  563.5 MB
MiniCPM-V-4_6-Q6_K.gguf    629.5 MB
MiniCPM-V-4_6-Q8_0.gguf    811.6 MB
mmproj-model-f16.gguf        1.1 GB
```

## Deploy

```powershell
modal deploy modal_minicpm/modal_app.py
```

Modal runtime tuple:

```text
Base image: nvidia/cuda:13.2.0-runtime-ubuntu24.04
Container Python: 3.12
llama-cpp-python wheel:
https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.29-cu132/llama_cpp_python-0.3.29-py3-none-manylinux_2_35_x86_64.whl
```

The repo's local uv environment uses Python 3.13, but the Modal container is
intentionally Python 3.12 because the llama-cpp-python CUDA wheel support is
documented for Python 3.10-3.12. The wheel URL above was verified with an HTTP
HEAD request on 2026-06-15 (`200 OK`, `Content-Length: 847160141`), and the
NVIDIA image tag was verified against Docker Hub.

Modal will:

- build one cached CUDA image with the prebuilt CUDA 13.2
  `llama-cpp-python` wheel above;
- create or reuse the `tinycourt-minicpm-models` volume;
- download `MiniCPM-V-4_6-Q4_K_M.gguf` and `mmproj-model-f16.gguf` into that
  volume on first cold start;
- expose the OpenAI-compatible ASGI endpoint.

The image installs the exact wheel URL deliberately. It must not set
`CMAKE_ARGS` or `FORCE_CMAKE`; those force a local source build and caused the
previous ~20 minute compile loop.

## Configure the Space

Set these Hugging Face Space variables after Modal deploys:

```text
TINYCOURT_BACKEND=remote
TINYCOURT_MODAL_CHAT_URL=https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=MiniCPM-V-4.6
```

Then rebuild/restart the Space.

## Smoke Test

```powershell
uv run python modal_minicpm/smoke_test.py https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
```

If the response contains a `CHARGE:` field, the Tiny Court prompt/parse path has
the minimum shape it needs.

Verified deployed endpoint:

```text
URL: https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
Smoke test: HTTP 200
Model: MiniCPM-V-4.6
Expected field returned: CHARGE
```
