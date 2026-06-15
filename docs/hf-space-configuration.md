# Hugging Face Space configuration — variables & commands

The single reference for the environment that the **Tiny Court** Space needs, and
the exact `hf` commands to apply it. Target Space:

```text
build-small-hackathon/tiny-court     # sdk: gradio 6.16.0, app_file: main.py
```

Two kinds of config:

- **Variables** (`hf spaces variables add … --env`) — non-secret, visible to
  visitors. URLs, model name, backend selection, tuning.
- **Secrets** (`hf spaces secrets add … --secrets`) — hidden. Proxy token
  material only. **Never** put these in variables, docs, commits, or the README.

> Convention used below: `SPACE="build-small-hackathon/tiny-court"`.

---

## 0. The Space is a clean subset, not the git repo

The dev git repo is a monorepo (app + `modal_minicpm/` server + docs + tests +
scripts). The **Space carries only the runtime tree** — the Gradio app and what it
needs to start — mirroring a lean Space like `gigscan_via_modal/`:

```text
main.py              # Space entry (app_file)
tinycourt/           # the app package (code + static/)
wheels/*.whl         # the MultimodalComposer wheel (resolve URL in requirements)
requirements.txt     # lean Space deps (no torch / modal / test tooling)
README.md            # HF Space card + frontmatter
.gitattributes       # LFS patterns
```

Everything else (`docs/`, `tests/`, `modal_minicpm/`, `scripts/`, `pyproject.toml`,
the cloned reference app) **never goes to the Space**. Deploy with the helper —
it uploads exactly that tree and removes any leftover dev files from earlier pushes:

```powershell
uv run python scripts/deploy_space.py            # dry run: print the clean tree
uv run python scripts/deploy_space.py --push      # upload + sync (needs a write HF_TOKEN)
```

**Run locally** (uses `pyproject.toml`, not `requirements.txt`):

```powershell
uv run python main.py                             # fake backend by default
$env:TINYCOURT_BACKEND='remote'; uv run python main.py   # against the Modal endpoints
```

After a code push, still apply variables/secrets (below) and restart.

---

## 1. What to set, by goal

### A. Run the deployed app on the real models (Modal, multi-endpoint)

This moves the Space off the `fake` backend onto the live Modal endpoints. The
client routes **text** calls to the judge endpoint and **image-evidence** calls
to the vision endpoint (see [modal-serving-decision.md](modal-serving-decision.md)).
All served models are **< 32B** (judge 4B, vision 1.3B, formatter 12B).

After `modal deploy modal_minicpm/modal_app.py`, the endpoints are
`https://<workspace>--tinycourt-models-serve-<role>.modal.run/v1/chat/completions`.

**Variables (non-secret):**

| Variable | Value | Why |
|---|---|---|
| `TINYCOURT_BACKEND` | `remote` | Force the remote backend (overrides auto-select). |
| `TINYCOURT_MODAL_CHAT_URL` | `https://<workspace>--tinycourt-models-serve-judge.modal.run/v1/chat/completions` | Judge (text) endpoint — all non-image calls. |
| `TINYCOURT_MODAL_MODEL` | `NVIDIA-Nemotron-3-Nano-4B` | Judge model alias sent in the payload. |
| `TINYCOURT_MODAL_VISION_CHAT_URL` | `https://<workspace>--tinycourt-models-serve-vision.modal.run/v1/chat/completions` | Vision endpoint — image-evidence calls. |
| `TINYCOURT_MODAL_VISION_MODEL` | `MiniCPM-V-4.6` | Vision model alias. |

If `TINYCOURT_MODAL_VISION_CHAT_URL` is unset, image calls fall back to the judge
endpoint (a text model can't see images — set both for real evidence). The
formatter endpoint (`serve_formatter`) is not yet called by the client.

**Secrets (hidden):**

| Secret | Value | Why |
|---|---|---|
| `TINYCOURT_MODAL_KEY` | *Modal proxy token id* | `Modal-Key` header for `requires_proxy_auth` (shared across endpoints). |
| `TINYCOURT_MODAL_SECRET` | *Modal proxy token secret* | `Modal-Secret` header. Must be set **together** with the key. |

If `TINYCOURT_BACKEND` is left unset, the app still auto-selects `remote`
whenever `TINYCOURT_MODAL_CHAT_URL` is present (`config._default_backend`).
Setting it explicitly is clearer and removes ambiguity.

### B. Keep the safe fallback demo (current state)

The Space currently runs `cpu-basic` with the `fake` backend (canned, no GPU, no
network). To stay there, set only:

| Variable | Value |
|---|---|
| `TINYCOURT_BACKEND` | `fake` |

The remote backend already falls back to local→fake if Modal is unreachable, so
even a misconfigured remote Space degrades to canned output rather than erroring.

---

## 2. Optional tuning variables (all have safe defaults)

Set only if you need to deviate from the defaults baked into the code.

| Variable | Default | Effect |
|---|---|---|
| `TINYCOURT_MODAL_TIMEOUT` | `300` | Per-request timeout (seconds) for generation calls. |
| `TINYCOURT_REMOTE_HEALTH_TIMEOUT` | `min(timeout, 60)` | Timeout for the startup health-check chat call. |
| `TINYCOURT_REMOTE_DEBUG` | off | Print redacted request payloads + response timing to logs. Never prints raw base64. |
| `TINYCOURT_IMAGE_MAX_SIZE` | `1024` | Longest edge (px) for image-evidence downscale before upload. |
| `TINYCOURT_IMAGE_JPEG_QUALITY` | `85` | JPEG quality for the downscaled evidence image. |

---

## 3. Agent traces on the Space (Sharing is Caring)

Trace **capture** is independent of any dataset (see
[agent-traces.md](agent-traces.md)). On the Space you can optionally enable
capture to local (ephemeral) disk:

| Variable | Default | Effect |
|---|---|---|
| `TINYCOURT_TRACES_ENABLED` | off | Master switch. Off = the trace hook is a no-op. |
| `TINYCOURT_TRACE_DIR` | `traces/` | Where JSONL is written (ephemeral on a Space — lost on restart). |
| `TINYCOURT_TRACE_INCLUDE_PROMPTS` | off | Include full prompt text (carries the complaint — leave off on a public Space). |
| `TINYCOURT_TRACE_INCLUDE_RESPONSES` | on | Include the model's (pre-scrub) output text, truncated. |

**Publishing the dataset is a local action, not a Space variable.** Space disk is
ephemeral, so do not rely on the Space to upload. Capture trials locally and run
`scripts/upload_traces.py` — these belong in your **local** environment, never as
Space config:

| Local-only var | Used by |
|---|---|
| `TINYCOURT_TRACE_DATASET_ID` | `scripts/upload_traces.py` — target dataset (e.g. `build-small-hackathon/tiny-court-traces`). |
| `TINYCOURT_TRACE_REPO_PRIVATE` | `scripts/upload_traces.py` — create the dataset private. |
| `HF_TOKEN` (write) | `scripts/upload_traces.py` — create/push the dataset. |

---

## 4. Do NOT set these on the Space

These are **local / test-only** and have no effect (or are harmful) on the Space:

- `TINYCOURT_MODEL`, `TINYCOURT_MODEL_SMALL`, `TINYCOURT_MODEL_MAIN`,
  `TINYCOURT_MODELS_DIR` — local model registry/cache (the Space uses `remote`
  or `fake`, not a downloaded model).
- `TINYCOURT_RUN_MODAL_INTEGRATION`, `TINYCOURT_EXPECT_MODAL_PROXY_AUTH` — gate
  the opt-in live smoke tests; belong in local `.env` only.
- `MODAL_CHAT_URL` — accepted as a fallback alias for `TINYCOURT_MODAL_CHAT_URL`;
  prefer the prefixed name to avoid clashing with Modal's own tooling.

---

## 5. Commands

Auth first. A stale `HF_TOKEN` in the environment overrides `hf auth login`, and
a **Process-scope** env var shadows the **User-scope** one — read the active
token explicitly if in doubt (see
[deploying-gradio-on-huggingface.md](deploying-gradio-on-huggingface.md) §auth):

```powershell
$SPACE = "build-small-hackathon/tiny-court"
hf auth whoami                                   # confirm the write identity
```

### Set the variables (non-secret)

```powershell
$WS = "jan-jakubcik"   # Modal workspace
hf spaces variables add $SPACE --env TINYCOURT_BACKEND=remote
hf spaces variables add $SPACE --env TINYCOURT_MODAL_CHAT_URL=https://$WS--tinycourt-models-serve-judge.modal.run/v1/chat/completions
hf spaces variables add $SPACE --env TINYCOURT_MODAL_MODEL=NVIDIA-Nemotron-3-Nano-4B
hf spaces variables add $SPACE --env TINYCOURT_MODAL_VISION_CHAT_URL=https://$WS--tinycourt-models-serve-vision.modal.run/v1/chat/completions
hf spaces variables add $SPACE --env TINYCOURT_MODAL_VISION_MODEL=MiniCPM-V-4.6
# optional: schema-repair pass (coerces a malformed judge draft into KEY: value)
hf spaces variables add $SPACE --env TINYCOURT_MODAL_FORMATTER_CHAT_URL=https://$WS--tinycourt-models-serve-formatter.modal.run/v1/chat/completions
hf spaces variables add $SPACE --env TINYCOURT_MODAL_FORMATTER_MODEL=Mellum2-12B-A2.5B-Instruct
# optional: ASR (audio evidence) — transcribes voice notes into the text flow
hf spaces variables add $SPACE --env TINYCOURT_MODAL_ASR_URL=https://$WS--tinycourt-models-serve-asr.modal.run/transcribe
```

### Set the secrets (hidden — values come from your Modal proxy token)

```powershell
hf spaces secrets add $SPACE --secrets TINYCOURT_MODAL_KEY=<modal-proxy-token-id>
hf spaces secrets add $SPACE --secrets TINYCOURT_MODAL_SECRET=<modal-proxy-token-secret>
```

### Restart so the new config is picked up

A variable/secret change needs a restart; a code change needs a push first
(a Space is a git repo — push the committed tree). `--factory-reboot` clears
caches:

```powershell
hf spaces restart $SPACE --factory-reboot
```

### Verify

```powershell
$env:PYTHONUTF8 = "1"                             # so emoji in logs don't crash the console
hf spaces info $SPACE --format json               # stage: BUILDING | APP_STARTING | RUNNING | RUNTIME_ERROR
hf spaces logs $SPACE                             # run logs (app stdout/stderr)
```

Expected startup lines when the remote backend is live:

```text
[tinycourt] backend: remote
[tinycourt] remote endpoint: Modal MiniCPM OpenAI-compatible API
[tinycourt] remote backend healthy: using Modal llama.cpp
```

If you see `backend: local` → `TINYCOURT_MODAL_CHAT_URL`/`TINYCOURT_BACKEND`
isn't set. If you see "remote backend unavailable" → check the secrets, the URL,
and that the Modal app is up. (Full failure-mode table:
[modal-remote-integration-plan.md](modal-remote-integration-plan.md) §failure modes.)

---

## 6. Quick reference — full variable matrix

| Name | Kind | Scope | Default |
|---|---|---|---|
| `TINYCOURT_BACKEND` | variable | Space | auto (`remote` if URL set, else cached `local`, else `fake`) |
| `TINYCOURT_MODAL_CHAT_URL` | variable | Space | — (required for remote; judge endpoint) |
| `TINYCOURT_MODAL_MODEL` | variable | Space | `NVIDIA-Nemotron-3-Nano-4B` |
| `TINYCOURT_MODAL_VISION_CHAT_URL` | variable | Space | — (vision endpoint; falls back to judge if unset) |
| `TINYCOURT_MODAL_VISION_MODEL` | variable | Space | `MiniCPM-V-4.6` |
| `TINYCOURT_MODAL_FORMATTER_CHAT_URL` | variable | Space | — (schema-repair endpoint; repair is a no-op if unset) |
| `TINYCOURT_MODAL_FORMATTER_MODEL` | variable | Space | `Mellum2-12B-A2.5B-Instruct` |
| `TINYCOURT_MODAL_ASR_URL` | variable | Space | — (audio transcription endpoint; transcribe is a no-op if unset) |
| `TINYCOURT_MODAL_KEY` | **secret** | Space | — |
| `TINYCOURT_MODAL_SECRET` | **secret** | Space | — |
| `TINYCOURT_MODAL_TIMEOUT` | variable | Space | `300` |
| `TINYCOURT_REMOTE_HEALTH_TIMEOUT` | variable | Space | `min(timeout, 60)` |
| `TINYCOURT_REMOTE_DEBUG` | variable | Space | off |
| `TINYCOURT_IMAGE_MAX_SIZE` | variable | Space | `1024` |
| `TINYCOURT_IMAGE_JPEG_QUALITY` | variable | Space | `85` |
| `TINYCOURT_TRACES_ENABLED` | variable | Space (opt) | off |
| `TINYCOURT_TRACE_DIR` | variable | Space (opt) | `traces/` |
| `TINYCOURT_TRACE_INCLUDE_PROMPTS` | variable | Space (opt) | off |
| `TINYCOURT_TRACE_INCLUDE_RESPONSES` | variable | Space (opt) | on |
| `TINYCOURT_TRACE_DATASET_ID` | variable | **local only** | — |
| `TINYCOURT_TRACE_REPO_PRIVATE` | variable | **local only** | off |
| `HF_TOKEN` | secret | local (publish) | — |

## 7. References

- [deploying-gradio-on-huggingface.md](deploying-gradio-on-huggingface.md) — the
  general `hf` CLI / auth / push / log field guide.
- [modal-remote-integration-plan.md](modal-remote-integration-plan.md) — remote
  backend status, smoke tests, and failure modes.
- [agent-traces.md](agent-traces.md) — trace capture + the publish workflow.
