# Model serving recommendations

Date: 2026-06-15.

This document records current candidate models for a Tiny Court multimodel
setup, with GGUF availability and serving recommendations.

The immediate motivation: MiniCPM-V is useful for image understanding, but it is
too weak and inconsistent to own Tiny Court's strict `KEY: value` courtroom
contract. The stronger architecture is to split perception, transcription,
reasoning, and formatting across different models, then let Python validate and
render the final fields.

## Verification method

Model availability was checked with the Hugging Face CLI and API:

```powershell
uv --cache-dir .uv-cache run hf models list --search MiniCPM4.1-8B --limit 10
uv --cache-dir .uv-cache run hf models list --search Nemotron-3-Nano --limit 12
uv --cache-dir .uv-cache run hf models list --search cohere-transcribe --limit 12
uv --cache-dir .uv-cache run hf models list --search Mellum2 --limit 12
uv --cache-dir .uv-cache run hf models list --search VoxCPM2 --limit 10
```

File lists and sizes were checked with `huggingface_hub.HfApi().model_info()`.

Modal serving notes are based on the current Modal web-function docs and vLLM
example:

- `@modal.asgi_app` can serve a FastAPI/ASGI app.
- `@modal.web_server` can expose a subprocess HTTP server such as `vllm serve`.
- Modal proxy auth protects web endpoints with `Modal-Key` and `Modal-Secret`.
- Modal's vLLM example exposes an OpenAI-compatible `/v1/chat/completions`
  endpoint and caches Hugging Face/vLLM files in Modal Volumes.

References:

- Build Small field guide: <https://build-small-hackathon-field-guide.hf.space/>
- OpenBMB partner page: <https://build-small-hackathon-field-guide.hf.space/partners/openbmb>
- NVIDIA partner page: <https://build-small-hackathon-field-guide.hf.space/partners/nvidia>
- Cohere partner page: <https://build-small-hackathon-field-guide.hf.space/partners/cohere>
- JetBrains partner page: <https://build-small-hackathon-field-guide.hf.space/partners/jetbrains>
- Black Forest Labs partner page: <https://build-small-hackathon-field-guide.hf.space/partners/blackforest>
- Modal web functions: <https://modal.com/docs/guide/webhooks>
- Modal vLLM example: <https://modal.com/docs/examples/vllm_inference>

## Recommended multimodel architecture

Do not ask a weak multimodal model to emit final Tiny Court fields.

Prefer:

```text
Raw input
  text / image / audio / document
        |
        v
Specialized perception/transcription/extraction models
        |
        v
Normalized facts
        |
        v
Stronger text judge / formatter model
        |
        v
Python validation and exact KEY: value rendering
```

The final `KEY: value` representation should be deterministic Python output.
Models can propose field values, reasons, deltas, and prose, but Python should
validate required fields, clamp meters, and render the exact format.

## Serving patterns

### llama.cpp / llama-server

Use for GGUF text or vision models that are known to work with llama.cpp:

- MiniCPM-V 4.6 GGUF for image evidence facts.
- MiniCPM4.1-8B GGUF as an OpenBMB text judge candidate.
- MiniCPM5-1B GGUF as a cheap auxiliary classifier/summarizer.
- Nemotron 3 Nano 4B GGUF as a small NVIDIA text judge candidate.
- Mellum2 GGUF as a strict formatter or schema-repair candidate.

This is closest to the existing `modal_minicpm` deployment.

### vLLM on Modal

Use for safetensors/Transformers text models where vLLM supports the
architecture and chat template:

- NVIDIA Nemotron 3 Nano 30B-A3B text model.
- Mellum2 safetensors models if vLLM support is acceptable.
- Other text-generation models that are better served as OpenAI-compatible
  `/v1/chat/completions`.

This is the right route when there is no GGUF or when llama.cpp support is
uncertain. Expect more VRAM, longer cold starts, and model-specific flags.

### Custom FastAPI/Transformers endpoint on Modal

Use when the model has custom code, is not supported by vLLM, or is not a chat
LLM:

- Nemotron Parse.
- Nemotron Omni if using its full multimodal/any-to-any path.
- Cohere Transcribe official safetensors model.
- VoxCPM2 official TTS model.

Expose a typed endpoint such as `/parse`, `/transcribe`, or `/tts`, not an
OpenAI chat endpoint, unless the runtime already provides one.

### Diffusers endpoint on Modal

Use for FLUX.2 Klein image generation/editing. It is not a GGUF/llama.cpp model.
It should be a post-processing endpoint for share-card or comic-record images,
not part of adjudication.

### Speech GGUF caveat

Some ASR/TTS models have GGUF repos, but they are not necessarily usable through
the same llama.cpp `llama-server` chat deployment. ASR GGUF repos may target
whisper.cpp/crispasr-like runtimes; TTS GGUF repos may need a dedicated speech
runtime. Treat each as a separate serving proof-of-concept.

## Model inventory

### Main courtroom text judge

| Candidate | Repo | GGUF status | Serving recommendation | Tiny Court recommendation |
|---|---|---:|---|---|
| NVIDIA Nemotron 3 Nano 30B-A3B | `nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16` | No first-party GGUF in this repo. Third-party `unsloth/Nemotron-3-Nano-30B-A3B-GGUF` exists. | Prefer vLLM with safetensors if supported. Third-party GGUF is possible but large: smallest useful quants around 17-23 GiB, so use A100/H100/H200-class Modal GPU. | Best candidate for stronger judge/reasoning if budget allows. |
| NVIDIA Nemotron 3 Nano 4B | `nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF` | First-party GGUF: `NVIDIA-Nemotron3-Nano-4B-Q4_K_M.gguf`, about 2.6 GiB. | llama.cpp / llama-server. | Best low-risk replacement test for MiniCPM as the structured text judge. |
| JetBrains Mellum2 Instruct | `JetBrains/Mellum2-12B-A2.5B-Instruct` | First-party GGUF variants exist, e.g. `JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K`, about 10.1 GiB. | llama.cpp for GGUF, or vLLM/Transformers for safetensors. | Strong candidate for strict formatter/schema-repair, less obviously the best comic judge. |
| JetBrains Mellum2 Thinking | `JetBrains/Mellum2-12B-A2.5B-Thinking` | First-party GGUF variants exist, e.g. Q4_K_M about 7.5 GiB. | llama.cpp for GGUF. | Useful if reasoning quality matters more than latency; test against parser contract. |
| OpenBMB MiniCPM4.1-8B | `openbmb/MiniCPM4.1-8B-GGUF` | First-party GGUF: `MiniCPM4.1-8B-Q4_K_M.gguf`, about 4.6 GiB. | llama.cpp / llama-server. | OpenBMB-focused text judge candidate; likely better than MiniCPM-V for text-only formatting, but must be tested. |
| OpenBMB MiniCPM5-1B | `openbmb/MiniCPM5-1B-GGUF` | First-party GGUF: Q4_K_M about 656 MiB, Q8_0 about 1.1 GiB, F16 about 2.0 GiB. | llama.cpp / llama-server. | Auxiliary classifier/summarizer only; probably too small for the main judge. |

Recommended first experiment:

```text
NVIDIA-Nemotron-3-Nano-4B-GGUF
  as main text judge via llama.cpp
MiniCPM-V-4.6-GGUF
  only for image facts
Python
  renders final KEY: value fields
```

If Nemotron 4B is too weak, test:

```text
Mellum2 Instruct GGUF
  strict formatter / repair
Nemotron 30B-A3B via vLLM
  higher-quality judge if Modal GPU budget permits
```

### Image and OCR evidence

| Candidate | Repo | GGUF status | Serving recommendation | Tiny Court recommendation |
|---|---|---:|---|---|
| MiniCPM-V 4.6 | `openbmb/MiniCPM-V-4.6-gguf` | First-party GGUF exists: Q4/Q5/Q6/Q8 plus `mmproj-model-f16.gguf`. Current deployment uses Q4_K_M + mmproj. | Existing llama.cpp / llama-server deployment. | Keep for visual observation only. Do not ask it to own strict court fields. |
| NVIDIA Nemotron Parse v1.2 | `nvidia/NVIDIA-Nemotron-Parse-v1.2` | No GGUF found in official repo; safetensors. | Custom Transformers/FastAPI endpoint on Modal. | Use for receipts, screenshots, PDFs, forms, and document-like evidence. |
| NVIDIA Nemotron Omni 30B-A3B | `nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16` | No first-party GGUF in official repo. Third-party `unsloth/NVIDIA-Nemotron-3-Nano-Omni-30B-A3B-Reasoning-GGUF` exists with model GGUFs around 17-32 GiB plus `mmproj`. | Prefer official safetensors/custom runtime or vLLM only after support is proven. Third-party GGUF is a larger Modal GPU experiment. | Defer. It is too heavy for the immediate Tiny Court path. |
| FLUX.2 Klein 4B | `black-forest-labs/FLUX.2-klein-4B` | No GGUF; Diffusers/safetensors. | Diffusers endpoint on Modal. | Optional share-card/comic-record image generation, not evidence reasoning. |
| FLUX.2 Klein 9B | `black-forest-labs/FLUX.2-klein-9B` | No GGUF; Diffusers/safetensors, gated auto at time checked. | Diffusers endpoint on larger GPU. | Defer unless image-generation badge becomes a priority. |

Recommended image path:

```text
MiniCPM-V 4.6
  image -> factual caption/OCR snippets
Nemotron Parse
  document-like image/PDF -> structured text facts
Text judge
  facts -> exhibit fields
Python
  exact EXHIBIT/DESCRIPTION/RELEVANCE/RULING rendering
```

### Audio and voice

| Candidate | Repo | GGUF status | Serving recommendation | Tiny Court recommendation |
|---|---|---:|---|---|
| Cohere Transcribe | `CohereLabs/cohere-transcribe-03-2026` | Official repo has safetensors and is gated auto. Third-party `cstr/cohere-transcribe-03-2026-GGUF` exists with q4/q5/q6/q8/F16 GGUFs. | Prefer official Transformers/custom ASR endpoint if access is available. GGUF route needs a speech runtime proof, not the current llama-server chat path. | Best ASR candidate for voice notes and multilingual complaints. |
| Nemotron 3.5 ASR streaming 0.6B | `nvidia/nemotron-3.5-asr-streaming-0.6b` | Official repo has no GGUF. Third-party `cstr/nemotron-3.5-asr-streaming-GGUF` has F16 about 1.2 GiB and Q4_K about 457 MiB. | Official route likely NeMo/custom ASR endpoint. Third-party GGUF needs speech runtime proof. | Good NVIDIA-aligned ASR candidate; smaller and probably easier to serve than Cohere official if NeMo setup is manageable. |
| VoxCPM2 | `openbmb/VoxCPM2` | Official repo has safetensors. Third-party `cstr/voxcpm2-GGUF` has F16 about 4.6 GiB, Q4_K about 1.6 GiB, and a ref file. | Prefer official `voxcpm` runtime/custom TTS endpoint first. GGUF TTS route needs runtime proof. | Optional TTS for final verdict/sentence only. Do not put in the adjudication loop. |
| MiniCPM-o 4.5 | searched as `MiniCPM-o-4.5` | No obvious first-party GGUF found. Quantized non-GGUF repos exist, e.g. W8A16/W4A16. | Custom Transformers/runtime endpoint if pursuing full omni interaction. | Defer. Full-duplex voice court is a separate product mode. |

Recommended audio path:

```text
Audio upload / microphone
  -> ASR endpoint
  -> transcript text
  -> existing evidence/plea/witness flow
```

Add TTS only after ASR works:

```text
Final sentence/verdict
  -> VoxCPM2 endpoint
  -> optional playable judge audio
```

### Multilingual helpers

| Candidate | Repo | GGUF status | Serving recommendation | Tiny Court recommendation |
|---|---|---:|---|---|
| Tiny Aya Global | `CohereLabs/tiny-aya-global` | Official repo has safetensors, gated auto; no GGUF in that repo. | Transformers endpoint if needed. | Good multilingual normalization candidate, but not first priority. |
| Tiny Aya Water | `CohereLabs/tiny-aya-water-GGUF` | First-party GGUF: Q4_K_M about 2.0 GiB, Q8_0 about 3.3 GiB, F16/BF16 about 6.2 GiB. | llama.cpp / llama-server. | Test if multilingual complaint normalization matters. |
| Tiny Aya Earth | `CohereLabs/tiny-aya-earth-GGUF` | First-party GGUF: same rough sizes as Water. | llama.cpp / llama-server. | Same as Water; pick based on language coverage/quality tests. |

Use these for preprocessing:

```text
non-English complaint/transcript
  -> normalized English facts
  -> main judge
```

Do not use Tiny Aya as the main Tiny Court judge unless tests prove the comedy
and formatting quality are acceptable.

## Deployment shape recommendations

### Option A: keep one llama.cpp Modal app per GGUF model

Use separate Modal apps or functions:

```text
tinycourt-judge-nemotron4b
tinycourt-vision-minicpmv
tinycourt-formatter-mellum
```

Pros:

- closest to current `modal_minicpm` code;
- easy independent smoke tests;
- each model has its own cold-start and resource profile;
- failures are isolated.

Cons:

- more endpoints and secrets/config;
- more cold starts if several models are called in one user turn.

### Option B: one Modal gateway app with multiple internal workers

Expose one protected ASGI app:

```text
/judge
/vision
/transcribe
/parse
/tts
```

Each route can call a different internal function, class, or subprocess.

Pros:

- one public proxy-auth endpoint;
- central request logging/redaction;
- simpler Space configuration.

Cons:

- more custom orchestration;
- mixed dependencies can make image builds larger;
- care needed to avoid loading every model in every container.

Use Modal classes or separate functions so each model has its own image/GPU.
Avoid a single container that loads all models unless the models are tiny.

### Option C: vLLM text judge plus specialized endpoints

Use vLLM for the main text judge:

```text
Nemotron 30B-A3B / Mellum / other text model
  -> OpenAI-compatible /v1/chat/completions
```

Keep specialized models separate:

```text
MiniCPM-V llama.cpp
Nemotron Parse FastAPI
Cohere/Nemotron ASR FastAPI
VoxCPM2 TTS FastAPI
```

Pros:

- best path for strong safetensors text models;
- OpenAI-compatible client shape for the main judge;
- Modal has an official vLLM deployment example.

Cons:

- highest GPU cost;
- model-specific compatibility work;
- more cold-start tuning.

## Proposed Tiny Court model stack

### Phase 1: replace MiniCPM-V as judge

Goal: stop depending on MiniCPM-V for strict fields.

Use:

```text
Main judge:
  nvidia/NVIDIA-Nemotron-3-Nano-4B-GGUF
  file: NVIDIA-Nemotron3-Nano-4B-Q4_K_M.gguf

Vision evidence:
  openbmb/MiniCPM-V-4.6-gguf
  files: MiniCPM-V-4_6-Q4_K_M.gguf + mmproj-model-f16.gguf

Python:
  validates and renders all KEY: value fields
```

Expected engineering work:

- Add a separate `TextJudgeClient` endpoint/config.
- Change prompts to request JSON-like field proposals or simple prose fields.
- Validate with Pydantic/dataclasses.
- Render exact `KEY: value` in Python.
- Keep current parser as a compatibility fallback only.

### Phase 2: add strict formatter/repair

If Nemotron 4B produces good content but still drifts structurally, add:

```text
Formatter:
  JetBrains/Mellum2-12B-A2.5B-Instruct-GGUF-Q6_K
  file: Mellum2-12B-A2.5B-Instruct-Q6_K.gguf
```

Use it only to convert rough model output into typed fields. Do not ask it to
own the court persona unless tests show it can.

### Phase 3: add audio evidence

Use one of:

```text
CohereLabs/cohere-transcribe-03-2026
cstr/cohere-transcribe-03-2026-GGUF
nvidia/nemotron-3.5-asr-streaming-0.6b
cstr/nemotron-3.5-asr-streaming-GGUF
```

Recommended first implementation:

- official Cohere Transcribe if gated access/API/runtime is straightforward;
- otherwise Nemotron ASR official/custom endpoint;
- only use speech GGUF after proving the runtime can run it on Modal.

### Phase 4: add document extraction

Use:

```text
nvidia/NVIDIA-Nemotron-Parse-v1.2
```

This is for receipts, forms, screenshots, and PDFs. Route document-like evidence
through Parse before the judge model.

### Phase 5: optional output modalities

TTS:

```text
openbmb/VoxCPM2
cstr/voxcpm2-GGUF
```

Generate only final sentence/verdict audio first.

Share-card image generation:

```text
black-forest-labs/FLUX.2-klein-4B
black-forest-labs/FLUX.2-klein-9B
```

Use only after the core trial is stable.

## Recommended experiments

1. **Judge contract bakeoff**
   Run the existing Tiny Court prompt suite against:

   - current MiniCPM-V 4.6;
   - Nemotron 3 Nano 4B GGUF;
   - MiniCPM4.1-8B GGUF;
   - Mellum2 Instruct GGUF.

   Measure:

   - required field completion rate;
   - parse fallback rate;
   - comedy/persona quality;
   - latency;
   - output safety scrub rate.

2. **Python-rendered schema path**
   Change one call path, likely `submit_evidence`, so the model proposes fields
   and Python renders the final delimited output. This proves the new contract
   without rewriting the whole engine.

3. **Audio evidence smoke**
   Add one ASR endpoint and a live smoke test:

   ```text
   audio fixture -> transcript contains expected phrase
   transcript -> evidence card
   missing ASR config -> audio attachment remains label-only
   ```

4. **Document evidence smoke**
   Add Nemotron Parse only if we have realistic document evidence examples.

## Bottom line

Recommended near-term stack:

```text
Text judge:
  NVIDIA Nemotron 3 Nano 4B GGUF

Vision facts:
  MiniCPM-V 4.6 GGUF

Formatter fallback:
  Mellum2 Instruct GGUF

Audio:
  Cohere Transcribe or Nemotron ASR, served separately

Document parsing:
  Nemotron Parse, served separately

TTS:
  VoxCPM2, optional and post-verdict only
```

The main architecture change is more important than the exact first model:

```text
Models propose facts and fields.
Python validates and renders Tiny Court's exact KEY: value contract.
```

