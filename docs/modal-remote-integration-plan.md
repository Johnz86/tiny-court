# Modal remote integration plan

This document captures the remaining plan for making Tiny Court reliably use the
Modal-hosted MiniCPM-V backend from the Hugging Face Space.

Date: 2026-06-15.

## Current verified state

- Modal app name: `tinycourt-minicpm-openai`.
- Deployed chat endpoint:
  `https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions`
- The Modal ASGI app is protected with proxy auth:
  `@modal.asgi_app(requires_proxy_auth=True)`.
- The local client sends `Modal-Key` and `Modal-Secret` headers from
  `TINYCOURT_MODAL_KEY` and `TINYCOURT_MODAL_SECRET`.
- The app auto-selects the remote backend when `TINYCOURT_MODAL_CHAT_URL` or
  `MODAL_CHAT_URL` is set, unless `TINYCOURT_BACKEND` explicitly overrides it.
- Remote startup performs a small chat-completions health check. A healthy
  endpoint uses Modal llama.cpp. If remote is unavailable, Tiny Court falls back
  to local ZeroGPU-compatible construction, then to `FakeClient` if local model
  construction fails.
- Text and image live smoke tests pass against the protected deployed endpoint:
  unauthenticated request rejected, authenticated text request accepted,
  authenticated image evidence request accepted.

Recent verification commands:

```powershell
uv run pytest
uv --cache-dir .uv-cache run --env-file .env pytest -m modal_live tests\test_modal_endpoint.py
uv run ruff check tinycourt\engine.py tinycourt\remote_client.py tests\test_engine.py tests\test_remote_client.py tests\test_modal_endpoint.py
```

Expected results at the time this was written:

```text
uv run pytest
  88 passed, 3 deselected

uv --cache-dir .uv-cache run --env-file .env pytest -m modal_live tests\test_modal_endpoint.py
  3 passed

ruff on touched files
  All checks passed
```

Whole-tree Ruff currently reports an unrelated existing unused import in
`tests/test_output_safety.py`; do not mix that cleanup into Modal work unless
the task is explicitly to clean the full lint state.

## Runtime configuration

For local testing, `.env` should contain:

```text
TINYCOURT_RUN_MODAL_INTEGRATION=1
TINYCOURT_MODAL_CHAT_URL=https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=MiniCPM-V-4.6
TINYCOURT_MODAL_KEY=<Modal proxy token id>
TINYCOURT_MODAL_SECRET=<Modal proxy token secret>
```

`TINYCOURT_EXPECT_MODAL_PROXY_AUTH` defaults to enabled in the live tests. Set it
to `0` only if deliberately checking an old public endpoint before proxy auth is
deployed.

For the Hugging Face Space, set these as variables:

```text
TINYCOURT_BACKEND=remote
TINYCOURT_MODAL_CHAT_URL=https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=MiniCPM-V-4.6
```

Set these as Space secrets:

```text
TINYCOURT_MODAL_KEY=<Modal proxy token id>
TINYCOURT_MODAL_SECRET=<Modal proxy token secret>
```

Optional local/debug settings:

```text
TINYCOURT_REMOTE_HEALTH_TIMEOUT=60
TINYCOURT_MODAL_TIMEOUT=300
TINYCOURT_REMOTE_DEBUG=1
TINYCOURT_IMAGE_MAX_SIZE=1024
TINYCOURT_IMAGE_JPEG_QUALITY=85
```

`TINYCOURT_REMOTE_DEBUG=1` prints redacted request payloads and response timing.
It must not print raw `data:image/...base64` content. The debug payload replaces
inline image data with `[REDACTED]` and records only hash and length metadata.

## Design decisions

Tiny Court should stay remote-preferred, not remote-only.

GigScan is useful prior art because it is a small Gradio Space backed by a Modal
llama.cpp MiniCPM-V endpoint. It deliberately keeps the Space lightweight,
preprocesses images, sends OpenAI-compatible multimodal payloads, uses a warmup
check, and logs redacted payloads. Tiny Court should borrow those operational
habits without adopting GigScan's remote-only import-time configuration.

Keep:

- `GenerationClient` as the single model seam.
- remote auto-selection when a Modal chat URL is configured.
- fallback to local/fake so the app still runs if Modal is down or secrets are
  absent in a non-production environment.
- line-delimited Tiny Court output (`---` plus `KEY: value`) rather than strict
  JSON `response_format`.

Borrowed from GigScan:

- image-first OpenAI content parts for multimodal requests;
- local image resize/compression before upload;
- redacted diagnostics for payloads that include inline image data;
- opt-in live smoke tests, excluded by default.

Deferred:

- a separate `GET /health` endpoint. The current chat-based health check proves
  the actual inference path works. Add a `TINYCOURT_MODAL_BASE_URL` or
  `TINYCOURT_MODAL_HEALTH_URL` only if startup UX requires a faster warmup probe.
- user-visible warmup banner. The current app logs backend selection at startup;
  a UI banner can come later if Space users frequently hit cold-start waits.
- trace upload through Modal. The Sharing-is-Caring trace **capture** is now
  implemented at the generation seam (see [`agent-traces.md`](agent-traces.md));
  publishing goes direct to an HF Dataset via `scripts/upload_traces.py` rather
  than through Modal. A Modal upload relay remains optional.

## Multimodal evidence behavior

Uploaded evidence files are ingested by the Gradio app and passed to
`submit_evidence(..., image_paths=...)`.

For valid image files:

- the evidence prompt's last user message becomes OpenAI-style list content;
- image parts are placed before text parts, matching the working GigScan pattern;
- images are converted to RGB, resized so the longest edge is at most
  `TINYCOURT_IMAGE_MAX_SIZE`, and encoded as JPEG at
  `TINYCOURT_IMAGE_JPEG_QUALITY`;
- the remote backend receives `{"type": "image_url", "image_url": {"url":
  "data:image/jpeg;base64,..."}}`.

For malformed images or environments without Pillow, Tiny Court falls back to
the original file bytes if the filename has an image MIME type. This preserves
the previous behavior and keeps tests lightweight.

The live image smoke test uses a tiny inline PNG and asks the model for the same
field contract the app parser expects:

```text
---
EXHIBIT:
DESCRIPTION:
RELEVANCE:
RULING:
```

## Remaining plan

1. Commit the current Modal remote integration changes only.
   Include tests/docs/client changes, but avoid unrelated files such as local
   agent config, field notes, or imported reference apps unless explicitly
   requested.

2. Push the branch to the synchronized GitHub remote.
   The earlier unrelated-history divergence was already resolved by force-pushing
   the real local line to `origin/main`. Do not rewrite history again unless the
   user asks.

3. Confirm the Hugging Face Space has the variables and secrets listed above.
   Use Space variables for URLs/model/backend selection and Space secrets for
   proxy token material. Do not put Modal proxy secrets into docs, commits, or
   public variables.

4. Rebuild/restart the Space after the code is pushed.
   The Modal backend itself does not need redeploy for client-side image
   preprocessing or redacted logging changes. Redeploy Modal only if
   `modal_minicpm/modal_app.py` or Modal runtime configuration changes.

5. Verify backend selection from Space logs.
   Expected startup lines:

```text
[tinycourt] backend: remote
[tinycourt] remote endpoint: Modal MiniCPM OpenAI-compatible API
[tinycourt] remote backend healthy: using Modal llama.cpp
```

If logs show `backend: local`, the Space is missing `TINYCOURT_BACKEND=remote`
or `TINYCOURT_MODAL_CHAT_URL`. If logs show remote unavailable, check proxy
secrets, endpoint URL, and Modal app state.

6. Run local integration smoke after any deploy-affecting change:

```powershell
uv --cache-dir .uv-cache run --env-file .env pytest -m modal_live tests\test_modal_endpoint.py
```

This verifies:

- missing proxy headers are rejected;
- authenticated text request returns `CHARGE:`;
- authenticated image evidence request returns `EXHIBIT:`.

7. Run one real trial through the Space.
   Cover at least:

- complaint intake and charge generation;
- normal text chat/action;
- uploaded image evidence;
- verdict generation;
- fallback counter or visible canned output symptoms.

8. Watch parser fallback behavior.
   Endpoint smoke proves transport and auth. It does not prove the model will
   obey every Tiny Court prompt over a full trial. If fallback cards appear often,
   tune prompts before changing parser policy.

9. Only after the Space demonstrably uses Modal, update public-facing README
   claims/tags for Modal, OpenBMB, MiniCPM-V, and Llama Champion.

## Failure modes and diagnosis

`uv run --env-file .env ...` fails with global uv cache/path errors:

- Use a workspace-local cache:

```powershell
uv --cache-dir .uv-cache run --env-file .env pytest -m modal_live tests\test_modal_endpoint.py
```

- In sandboxed agent sessions, this may need escalation because uv's managed
  Python lives outside the workspace.

Unauthenticated smoke request returns 200:

- The endpoint is not protected, or the test is pointing at an old public URL.
- Confirm Modal serving uses `requires_proxy_auth=True`.

Authenticated smoke request returns 401/403:

- Check `TINYCOURT_MODAL_KEY` and `TINYCOURT_MODAL_SECRET`.
- They must be the Modal proxy auth token id and token secret.
- Both must be set together.

Remote health fails but direct live smoke passes:

- Check `TINYCOURT_REMOTE_HEALTH_TIMEOUT`.
- Check that the app process has the same `.env` values as the test process.
- Remember that `uv run --env-file .env <command>` passes variables to Python;
  there is no need to expand them in PowerShell first.

Image smoke returns HTTP 200 but no `EXHIBIT:`:

- Keep image parts before text parts.
- Keep the prompt strict and delimited.
- The issue is likely model formatting, not auth or transport.

Space starts local Qwen instead of remote:

- `TINYCOURT_MODAL_CHAT_URL` is missing, misspelled, or not loaded.
- `TINYCOURT_BACKEND` may be explicitly set to `local`.
- Check startup logs before debugging model code.

Modal rebuild becomes slow or compiles llama.cpp from source:

- Do not set `CMAKE_ARGS` or `FORCE_CMAKE`.
- Keep using the pinned prebuilt CUDA wheel recorded in
  `modal_minicpm/README.md`.

