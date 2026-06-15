# Modal MiniCPM handoff

This document captures the current Modal/MiniCPM state for the next conversation.
Do not repeat the failed source-build path; use the pinned deployed endpoint and
finish the Hugging Face Space integration.

## Current state

- Modal app is deployed as `tinycourt-minicpm-openai`.
- Active app id observed: `ap-S7gW7K5WnscLl431mjVumg`.
- Public endpoint:
  `https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/`
- Chat completions endpoint:
  `https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions`
- Endpoint access should be protected with Modal proxy auth
  (`@modal.asgi_app(requires_proxy_auth=True)`), using `Modal-Key` and
  `Modal-Secret` headers from `TINYCOURT_MODAL_KEY` /
  `TINYCOURT_MODAL_SECRET`.
- Endpoint smoke test passed with HTTP 200 and returned a `CHARGE:` field.
- The Hugging Face Space has **not** yet been switched to this backend.

## Modal implementation

Code lives in `modal_minicpm/`.

- `modal_minicpm/modal_app.py` defines the Modal app.
- `modal_minicpm/models.py` defines the MiniCPM model registry.
- `tests/test_modal_endpoint.py` verifies `/v1/chat/completions` when explicitly
  selected with `-m modal_live`.
- `modal_minicpm/README.md` records verified model links, runtime tuple, and deploy
  commands.

Runtime tuple:

```text
Base image: nvidia/cuda:13.2.0-runtime-ubuntu24.04
Container Python: 3.12
llama-cpp-python wheel:
https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.29-cu132/llama_cpp_python-0.3.29-py3-none-manylinux_2_35_x86_64.whl
```

The repo's local uv environment is Python 3.13, but Modal intentionally uses
Python 3.12 because the prebuilt CUDA wheel is compatible there. Do not switch the
Modal image to Python 3.13 unless a compatible CUDA wheel is verified first.

## Lessons learned

- Do not install `llama-cpp-python` with `CMAKE_ARGS` or `FORCE_CMAKE` for this
  deadline. That forces a source compile and caused a ~20 minute build loop.
- Do not rely on the old `https://abetlen.github.io/.../whl/cu124` index path for
  this deployment. The working artifact is the direct GitHub release wheel above.
- Modal requires `image.add_local_*` calls after all image build steps. In this app,
  `.entrypoint([])` must come before `.add_local_python_source("modal_minicpm")`.
- The OpenBMB competition target is `openbmb/MiniCPM-V-4.6-gguf`, not the plain
  base repo. The plain `openbmb/MiniCPM-V-4.6` repo is still useful as the base
  model link, but it does not contain GGUF files.
- Stopped Modal apps remain visible in recent app history; the CLI exposes `stop`,
  not deletion of those history entries.

## Hugging Face Space variables still needed

Set these on the `build-small-hackathon/tiny-court` Space, then rebuild/restart:

```text
TINYCOURT_BACKEND=remote
TINYCOURT_MODAL_CHAT_URL=https://jan-jakubcik--tinycourt-minicpm-openai-serve.modal.run/v1/chat/completions
TINYCOURT_MODAL_MODEL=MiniCPM-V-4.6
```

Add these as Space secrets, not public variables:

```text
TINYCOURT_MODAL_KEY=<Modal proxy token id>
TINYCOURT_MODAL_SECRET=<Modal proxy token secret>
```

`requirements.txt` now includes `requests>=2.32.0`, which the remote backend needs.

## Verification commands

Use uv for local commands:

```powershell
$env:UV_CACHE_DIR='.uv-cache'
$env:PYTHONIOENCODING='utf-8'
uv run python -m py_compile modal_minicpm\modal_app.py modal_minicpm\models.py tinycourt\remote_client.py
uv run --env-file .env pytest -m modal_live tests\test_modal_endpoint.py
uv run modal app list --json
```

Expected endpoint smoke-test result: missing proxy auth is rejected, valid proxy
auth returns HTTP 200, and the response contains `CHARGE:`.

## Next steps

1. Apply the Space variables above.
2. Rebuild/restart the Hugging Face Space.
3. Run a real Tiny Court trial against the deployed Space.
4. Watch for parser fallbacks in generated trial steps. The endpoint smoke test
   confirms the endpoint shape, but the full app still needs model outputs to
   obey Tiny Court's delimited fields consistently.
5. If stable, update the main README tags/claims for Modal, OpenBMB, and Llama
   Champion only after the Space is demonstrably using the remote backend.

## Suggested skills

- `modal`: use for any further Modal CLI/API work.
- `diagnose`: use if the Space switches to `remote` but trial generation falls back
  or errors.
- `handoff`: use again if another context handoff is needed.
