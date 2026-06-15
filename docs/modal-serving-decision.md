# Modal serving decision — multimodel setup for `modal_minicpm`

Date: 2026-06-15.

Decision record that turns [model-serving-recommendations.md](model-serving-recommendations.md)
into a concrete change plan for the deployed Modal app. It answers two questions:

1. **Can we serve multiple models from one endpoint?** Yes — with one important
   latency caveat.
2. **What should the final setup be?** A text **judge** + a vision **evidence**
   model (+ a **formatter**), served as **warm llama.cpp endpoints in one Modal
   app**, with the client routing per call. Recommended below with the cheaper
   one-endpoint alternative documented.

> **Implemented (2026-06-15).** Built and wired in `modal_minicpm/` +
> `tinycourt/remote_client.py`. Three L4 endpoints, **all models < 32B** (the
> hackathon cap):
>
> | Endpoint | Model | Params | Q | GPU | Sponsor |
> |---|---|---:|---|---|---|
> | `serve_judge` | `unsloth/NVIDIA-Nemotron-3-Nano-4B-GGUF` | 4B | Q8_0 (4.2 GB) | L4 | NVIDIA |
> | `serve_vision` | `openbmb/MiniCPM-V-4.6-gguf` (+mmproj) | 1.3B | Q8_0 (0.8 GB) | L4 | OpenBMB |
> | `serve_formatter` | `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K` | 12B | Q6_K (10.9 GB) | L4 | JetBrains |
> | `serve_asr` | `nvidia/parakeet-tdt-0.6b-v2` (NeMo, custom FastAPI) | 0.6B | — | L4 | NVIDIA |
>
> **Three input modalities:** text → judge, image → vision→judge, audio → ASR→judge.
>
> Bigger Q8 judges (Qwen3-14B on A100-40GB, Nemotron-30B-A3B on A100-80GB) live
> in `models.ALTERNATES` as one-line swaps if the 4B proves too weak. The client
> routes image calls → `serve_vision`, all other calls → `serve_judge`.

---

## 1. Current state (what is deployed today)

`modal_minicpm/modal_app.py` deploys a **single** model:

- one Modal app `tinycourt-minicpm-openai`;
- one `serve()` function, `@modal.asgi_app(requires_proxy_auth=True)`, `gpu="T4"`,
  `max_containers=1`;
- `llama-cpp-python[server]` (prebuilt CUDA wheel, pinned) hosting **one**
  `ModelSettings`: `MiniCPM-V-4.6-Q4_K_M.gguf` + `mmproj-model-f16.gguf`;
- weights cached in a Modal Volume; OpenAI-compatible `/v1/chat/completions`.

The Tiny Court client (`tinycourt/remote_client.py`) sends one model name
(`TINYCOURT_MODAL_MODEL`, default `MiniCPM-V-4.6`) for **every** call type.

**Observed problem (confirmed by the new agent traces):** MiniCPM-V drives the
parser to fall back — live remote trials show `parsed_ok: false` on the docket
and evidence calls. MiniCPM-V is fine at *seeing* an image but too weak to own
the strict `KEY: value` courtroom contract. This is exactly the premise of the
recommendations doc.

---

## 2. Can multiple models share one endpoint?

**Yes.** `llama_cpp.server.app.create_app(model_settings=[...])` accepts a **list**
of `ModelSettings`. The server routes each request to the entry whose
`model_alias` matches the request's `"model"` field — and our client already
sends `"model": <TINYCOURT_MODAL_MODEL>` in every payload, so the wiring is
mostly there.

**The caveat that decides the architecture:** llama-cpp-python's `LlamaProxy`
keeps **one model resident at a time** by default. When a request asks for a
different `model` than the one currently loaded, it **frees the current model and
loads the requested one** — even when both would fit in VRAM. A T4 (16 GB) has
room for MiniCPM-V-4.6 Q4 (~1.3B) **and** a 4B Q4 judge (~2.6 GB) at 4k context
simultaneously, but the default proxy will still swap between them.

Consequence for Tiny Court: a trial alternates text calls (judge) and the
occasional image-evidence call (vision). On one endpoint with the default proxy,
**each alternation pays a model reload** (seconds). Most calls are text, so the
penalty only lands on image-evidence turns — tolerable, but real.

So "one endpoint, multiple models" is **possible and cheap to configure**, but
**not free in latency** unless we run a custom proxy that pins both models
resident (extra work we should not take on for the hackathon).

---

## 3. The architectural fix (independent of endpoint shape)

Regardless of how many endpoints we run, the durable change from the
recommendations doc still applies and matters most:

> **Models propose facts/fields; Python validates and renders the exact
> `KEY: value` contract.**

Today the model is asked to emit the final delimited block, and a weak model
breaks it. Moving the exact formatting into Python (`engine`/`parsing`) makes the
backend choice far less fragile and lets a *content*-strong model that formats
imperfectly still succeed. This is the highest-leverage work; the model swap
below is necessary but secondary.

---

## 4. Options considered

| Option | Shape | Pros | Cons |
|---|---|---|---|
| **A. Two warm endpoints, one app** *(recommended)* | One Modal app file, two `@modal.asgi_app` functions: `serve_judge` (Nemotron-4B) + `serve_vision` (MiniCPM-V). Each its own GPU/container, each stays warm. | No swap latency; failures isolated; each independently smoke-testable (matches existing test pattern); keeps both sponsor stories (OpenBMB vision + NVIDIA judge). | Two URLs + two model names in Space config; two cold starts. |
| **B. One endpoint, two `model_settings`** | Single `serve()` with `model_settings=[judge, vision]`, routed by request `model`. | Minimal Modal change; one URL/one secret pair; smallest Space config. | Default proxy **swaps** models → reload latency on image turns; one container's failure takes both down; bigger image. |
| **C. vLLM judge + llama.cpp vision** | Nemotron/Mellum via Modal vLLM; MiniCPM-V via llama.cpp. | Best for strong safetensors text models; official Modal vLLM example. | Highest GPU cost + cold-start/compat tuning; over-scoped for now. |

---

## 5. Recommended final setup

**Option A — two warm llama.cpp endpoints in one Modal app — plus per-call
routing in the client and Python-rendered fields.**

Concretely:

```text
serve_judge   -> nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF
                 (NVIDIA-Nemotron3-Nano-4B-Q4_K_M.gguf, ~2.6 GiB, T4)
                 default for all text calls (docket, arguments, witness,
                 objection, plea, closing, reaction, classify)

serve_vision  -> openbmb/MiniCPM-V-4.6-gguf
                 (MiniCPM-V-4_6-Q4_K_M.gguf + mmproj, T4)
                 only for evidence calls that carry an image

Python (engine/parsing) validates required fields, clamps meters,
and renders the exact KEY: value output.
```

Why this over one endpoint: the swap penalty is the only real cost of sharing an
endpoint, and Option A removes it for the price of one extra URL in Space config
— config we already manage (see [hf-space-configuration.md](hf-space-configuration.md)).
It also keeps the two models' cold-starts and failures independent, which the
existing per-endpoint smoke tests already assume.

**If config simplicity outweighs latency** (e.g. we want exactly one secret pair
and accept slower image turns), fall back to **Option B** — the code routing is
identical; only the Modal app and the URL count differ.

Keep MiniCPM-V (OpenBMB) in the stack either way: it preserves the `sponsor:openbmb`
and Tiny Titan stories, and it is genuinely the right tool for image facts.

---

## 6. What to change

### 6a. `modal_minicpm/` (Modal side)

- **`models.py`** — broaden the registry beyond MiniCPM:
  - add a `role` field (`"judge"` | `"vision"`) and a Nemotron-4B GGUF entry
    (`nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF`, `NVIDIA-Nemotron3-Nano-4B-Q4_K_M.gguf`,
    no `mmproj`);
  - keep the MiniCPM-V entries as the `vision` role.
- **`modal_app.py`**:
  - **Option A:** split `serve()` into `serve_judge()` and `serve_vision()`, each
    `@modal.asgi_app(requires_proxy_auth=True)` with its own `ModelSettings` (the
    judge has no `clip_model_path`). `download_model` already takes a `model_key`;
    call it per function. Each keeps `gpu="T4"`.
  - **Option B (alt):** keep one `serve()` but build `model_settings=[judge, vision]`
    and download both in the volume.
- **Deploy** unchanged in spirit: `modal deploy modal_minicpm/modal_app.py`
  (re-run because the model set changed; the pinned llama.cpp CUDA wheel and CUDA
  tag stay — do **not** set `CMAKE_ARGS`/`FORCE_CMAKE`).

### 6b. `tinycourt/` (client side) — **implemented**

`remote_client.RemoteModalClient.generate` orchestrates the deployed models so
the *content flow* is correct — the weak vision model never owns courtroom fields,
and the judge never sees raw image bytes:

```text
text call            -> judge endpoint (single POST) -> strip reasoning preamble
image-evidence call  -> 1) VISION endpoint: image -> plain factual caption
                        2) fold caption into the prompt as text (drop the image)
                        3) JUDGE endpoint: text-only -> the actual fields
                        -> strip reasoning preamble
audio-evidence call  -> 1) ASR endpoint: audio -> transcript text
                        2) fold transcript into the evidence text
                        3) JUDGE (+ optional VISION if also an image) -> fields
```

Every non-text modality is **perceived into text** before the judge sees it — the
judge only ever reasons over words, and the weak perception models never own
fields.

- **Image** perception lives in the **client** (`RemoteModalClient.generate` does
  the vision→text→judge two-step), because the image rides inside the prompt
  messages as `image_url`.
- **Audio** perception lives at the **app boundary** (`app._fold_voice`), because
  audio files are composer attachments, not part of the prompt. `_fold_voice`
  calls `client.transcribe(path)` (no-op without an ASR endpoint) and folds
  `[Voice note] …` into the user's text in **both** send paths (`do_send` and
  `do_action_by_id`) — so a voice note works in **every** phase (intake, evidence,
  cross-examination, twist, plea), is safety-screened like typed text, and a
  voice-only message is a valid send. The engine stays pure text + image.

Details:

- **Two-step image flow.** `_describe_images` posts the image(s) to the vision
  endpoint with a fixed *describe-only* instruction (no charges/rulings);
  `_fold_caption` replaces the image part with `[Photographic evidence] <caption>`
  text so the judge call is pure text. Verified live: the vision endpoint reads
  images but is unreliable at text/fields — hence it only ever produces context.
- **Reasoning strip.** The Nemotron judge GGUF emits a `</think>` reasoning
  preamble even with `enable_thinking:false` (confirmed live). `_strip_thinking`
  keeps only the text after the final `</think>`, matching `local_client`’s
  `_THINK_RE`, so the tolerant parser sees clean delimited output.
- **Config:** `TINYCOURT_MODAL_VISION_CHAT_URL` + `TINYCOURT_MODAL_VISION_MODEL`
  (default `MiniCPM-V-4.6`). If the vision URL is unset, the describe step still
  runs against the judge URL with the vision alias (Option B single-endpoint).
- **Formatter repair (wired).** `RemoteModalClient.repair` sends a malformed judge
  draft to the formatter endpoint to coerce it into the delimited contract;
  `engine.robust_call` calls it at its single choke point *after* the generate +
  retry loop fails to parse, then re-parses — salvaging a structurally-drifted
  draft before falling back to a canned card. It is a **no-op unless
  `TINYCOURT_MODAL_FORMATTER_CHAT_URL` is set**, so fake/local backends and
  unconfigured deployments are unaffected. Verified live: a free-prose draft was
  reformatted into valid `CHARGE:` / `SECONDARY_CHARGE:` lines.
- **Python-rendered fields** remain the durable next step (start with
  `submit_evidence`): model proposes values, Python validates + renders the exact
  `EXHIBIT/DESCRIPTION/RELEVANCE/RULING` block; keep the tolerant parser as
  fallback.
- The deterministic verdict engine (`trial.py`, ADR-0001) stays frozen — this is
  content orchestration/formatting, not verdict math.

### 6c. Space configuration

Add to the matrix in [hf-space-configuration.md](hf-space-configuration.md):

| New (Option A) | Kind | Value |
|---|---|---|
| `TINYCOURT_MODAL_CHAT_URL` | variable | judge endpoint (`…serve-judge…/v1/chat/completions`) |
| `TINYCOURT_MODAL_MODEL` | variable | `NVIDIA-Nemotron-3-Nano-4B` |
| `TINYCOURT_MODAL_VISION_CHAT_URL` | variable | vision endpoint (`…serve-vision…/v1/chat/completions`) |
| `TINYCOURT_MODAL_VISION_MODEL` | variable | `MiniCPM-V-4.6` |

Secrets (`TINYCOURT_MODAL_KEY`/`SECRET`) are shared — same Modal proxy auth.

### 6d. Smoke tests

Extend `tests/test_modal_endpoint.py` (still `modal_live`, off by default):

- judge endpoint: authenticated text request returns a parseable `CHARGE:`/field;
- vision endpoint: authenticated image request returns `EXHIBIT:`;
- unauthenticated request rejected on **both** endpoints.

---

## 7. Phasing (smallest shippable first)

1. **Phase 0 — judge swap (highest value, low risk).** Add the Nemotron-4B judge
   endpoint and point text calls at it; leave image evidence on MiniCPM-V. Run the
   judge-contract check: does fallback rate drop? This alone should fix the
   `parsed_ok: false` symptom for the common path.
2. **Phase 1 — Python-rendered fields** for `submit_evidence`, then the docket.
   Makes backend choice robust; demote the parser to a fallback.
3. **Phase 2 — formatter/repair** (`Mellum2 Instruct GGUF`) only if Nemotron
   content is good but structurally drifts after Phase 1.
4. **Phase 3+ — audio (ASR), document (Nemotron Parse), TTS, share-card image**
   as separate endpoints, per the recommendations doc. Not on the critical path.

---

## 8. Bottom line

- **One endpoint, many models = yes**, via llama.cpp `model_settings` routed by
  the request `model` field — but the default proxy swaps models, so image turns
  pay a reload. We use separate warm endpoints instead.
- **Final setup (implemented) = Option A, three L4 endpoints:** NVIDIA
  Nemotron-3-Nano-4B **judge** + OpenBMB MiniCPM-V-4.6 **vision** + JetBrains
  Mellum2 **formatter**, one Modal app (`tinycourt-models`), client routes by
  whether the call carries an image. **All models < 32B** (4B / 1.3B / 12B). The
  registry keeps Qwen3-14B and Nemotron-30B as larger-judge swaps.
- Still do **Python-rendered fields** next — it is the durable fix for the
  formatting failure the traces exposed, independent of the model.
- Deploy: `modal deploy modal_minicpm/modal_app.py`. Inspect roster locally:
  `modal run modal_minicpm/modal_app.py`.
