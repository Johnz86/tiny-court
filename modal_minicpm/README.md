# Tiny Court Modal backend (multimodel llama.cpp)

This folder deploys the Tiny Court model backend on Modal: **one Modal app
(`tinycourt-models`) exposing one OpenAI-compatible llama.cpp endpoint per role**,
each on its own GPU and kept warm independently so a trial never pays a model-swap
reload. The client routes per call — image evidence → vision, everything else →
judge.

```text
serve_judge      /v1/chat/completions    (text reasoning + fields)
serve_vision     /v1/chat/completions    (image evidence only)
serve_formatter  /v1/chat/completions    (strict formatter / schema repair)
serve_asr        /transcribe             (audio evidence -> transcript; custom FastAPI)
```

Three input modalities reach the judge as text: **text** direct, **image** via
`serve_vision` (caption), **audio** via `serve_asr` (transcript).

Design rationale and the full options analysis: [`docs/modal-serving-decision.md`](../docs/modal-serving-decision.md).
(The folder is still named `modal_minicpm` for history; it now serves the whole
roster, not only MiniCPM.)

## Roster (all models < 32B — the hackathon cap)

Defined in `models.py` (`DEPLOYED`). Quantization prefers the **larger Q8** GGUF
where published; sizes are on-disk GGUF, verified via the HF API on 2026-06-15.

| Endpoint | Key | Model | Params | File (Q) | GPU | Sponsor |
|---|---|---|---:|---|---|---|
| `serve_judge` | `judge` | [`unsloth/NVIDIA-Nemotron-3-Nano-4B-GGUF`](https://huggingface.co/unsloth/NVIDIA-Nemotron-3-Nano-4B-GGUF) | 4B | `…-Q8_0.gguf` (4.2 GB) | L4 | NVIDIA |
| `serve_vision` | `vision` | [`openbmb/MiniCPM-V-4.6-gguf`](https://huggingface.co/openbmb/MiniCPM-V-4.6-gguf) | 1.3B | `MiniCPM-V-4_6-Q8_0.gguf` (0.8 GB) + `mmproj-model-f16.gguf` | L4 | OpenBMB |
| `serve_formatter` | `formatter` | [`JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K`](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K) | 12B | `…-Q6_K.gguf` (10.9 GB)* | L4 | JetBrains |

\* Mellum2 publishes no first-party Q8; Q6_K is the largest available.

MiniCPM-V is **vision only** — its text output is too weak for the strict
courtroom contract, which is why a NVIDIA text model owns the fields.

**ASR (`serve_asr`)** is a separate serving pattern — a small custom FastAPI app
serving the NVIDIA sponsor ASR **`nvidia/parakeet-tdt-0.6b-v2`** (0.6B, ungated,
< 32B) via the **NeMo** toolkit on an **L4**. It exposes a JSON `POST /transcribe`
(`{"audio_base64", "format"}` → `{"text"}`), not an OpenAI chat endpoint; ffmpeg
normalises any upload to 16 kHz mono first. **Verified end-to-end:** a spoken clip
transcribed back exactly (50 s cold-start, ~1.6 s warm).

> Why Parakeet and not the listed `nemotron-3.5-asr-streaming-0.6b`? That target
> needs NeMo from git `main` **and** is a *prompted* multilingual model whose
> offline `transcribe()` wants a per-utterance language injected onto the lhotse
> cut — an undocumented path that silently ignores `prompt`/`target_lang` kwargs
> (verified: it loads, but every standard call fails `Unknown prompt key: None`).
> Parakeet TDT keeps the **NVIDIA sponsor** credit and actually transcribes. The
> other target, Cohere Transcribe, is **gated** + needs `trust_remote_code`. The
> load is wrapped so a failure returns a JSON error, not a crash loop.

### Larger-judge swaps (documented, not auto-deployed)

`models.ALTERNATES` — flip one into `DEPLOYED` (or repoint `judge`) to trade cost
for size; both are Q8_0 and still < 32B:

| Key | Model | Params | Q8 size | GPU |
|---|---|---:|---|---|
| `judge-qwen3-14b` | `unsloth/Qwen3-14B-GGUF` | 14B | 15.7 GB | A100-40GB |
| `judge-nemotron-30b` | `unsloth/Nemotron-3-Nano-30B-A3B-GGUF` | 30B (MoE, ~3B active) | 33.6 GB | A100-80GB |

## Deploy / inspect

```powershell
modal deploy modal_minicpm/modal_app.py     # build + publish all three endpoints
modal run    modal_minicpm/modal_app.py      # print the planned roster (local, no GPU)
```

Modal runtime tuple (shared by all endpoints):

```text
Base image: nvidia/cuda:13.2.0-runtime-ubuntu24.04
Container Python: 3.12
llama-cpp-python wheel:
https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.29-cu132/llama_cpp_python-0.3.29-py3-none-manylinux_2_35_x86_64.whl
```

The container is Python 3.12 because the prebuilt llama-cpp-python CUDA wheel
targets 3.10–3.12 (the local uv env is 3.13). Do **not** set `CMAKE_ARGS` or
`FORCE_CMAKE` — they force a ~20-minute source build. On deploy Modal builds one
cached CUDA image, creates/reuses the `tinycourt-models` volume, and each endpoint
downloads only its own GGUF (+ mmproj) into the volume on first cold start.

> llama.cpp arch support: the 4B/vision/formatter GGUFs load on the pinned wheel.
> If a larger swap (e.g. the 30B MoE) fails to load, bump the wheel or use
> `judge-qwen3-14b` (Qwen3 is first-class in llama.cpp).

## Configure the Space

After deploy, set the Space variables/secrets and verify per
[`docs/hf-space-configuration.md`](../docs/hf-space-configuration.md) §A. In short
(`$WS` = Modal workspace):

```text
TINYCOURT_BACKEND=remote
TINYCOURT_MODAL_CHAT_URL=https://$WS--tinycourt-models-serve-judge.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=NVIDIA-Nemotron-3-Nano-4B
TINYCOURT_MODAL_VISION_CHAT_URL=https://$WS--tinycourt-models-serve-vision.modal.run/v1/chat/completions
TINYCOURT_MODAL_VISION_MODEL=MiniCPM-V-4.6
# secrets (shared proxy auth):
TINYCOURT_MODAL_KEY=<Modal proxy token id>
TINYCOURT_MODAL_SECRET=<Modal proxy token secret>
```

When `TINYCOURT_BACKEND=remote`, the app health-checks the judge endpoint once
while constructing the client. If it answers, Tiny Court uses Modal llama.cpp;
otherwise it falls back to the local model path, then to the deterministic fake
backend so the UI still runs.

## Endpoint smoke tests

Opt-in, `.env`-loaded, in the `modal_live` pytest group (excluded by default):

```powershell
uv --cache-dir .uv-cache run --env-file .env pytest -m modal_live tests/test_modal_endpoint.py
```

The live tests verify missing proxy headers are rejected, valid headers are
accepted, the text (judge) request returns a `CHARGE:` field, and an image
request to the vision endpoint returns `EXHIBIT:`. Point `.env` at the new
endpoints:

```text
TINYCOURT_RUN_MODAL_INTEGRATION=1
TINYCOURT_EXPECT_MODAL_PROXY_AUTH=1
TINYCOURT_MODAL_CHAT_URL=https://<workspace>--tinycourt-models-serve-judge.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=NVIDIA-Nemotron-3-Nano-4B
TINYCOURT_MODAL_VISION_CHAT_URL=https://<workspace>--tinycourt-models-serve-vision.modal.run/v1/chat/completions
TINYCOURT_MODAL_VISION_MODEL=MiniCPM-V-4.6
TINYCOURT_MODAL_KEY=<Modal proxy token id>
TINYCOURT_MODAL_SECRET=<Modal proxy token secret>
```

Image uploads are resized to `TINYCOURT_IMAGE_MAX_SIZE` px (default 1024) and JPEG
encoded at `TINYCOURT_IMAGE_JPEG_QUALITY` (default 85) before send. Set
`TINYCOURT_REMOTE_DEBUG=1` to print redacted payloads/timing — inline image data
is never printed (replaced with `[REDACTED]` + hash + length).
