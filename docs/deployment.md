# Deployment & Tech Stack: Tiny Court of Everyday Crimes

This document captures the technical constraints for hosting the app as a
**Gradio Space on Hugging Face ZeroGPU**. The product/UX spec lives in
[`design-spec.md`](./design-spec.md).

## Target platform

- **Host:** Hugging Face Spaces, **ZeroGPU** hardware (dynamic, shared H200 slices).
- **SDK:** Gradio.
- **Python:** 3.13 (see `.python-version` / `pyproject.toml`).

## Gradio version

- Latest at time of writing: **Gradio 6.16.0** (released 2026-06-03).
- Pin a known-good version in `requirements.txt`, e.g. `gradio==6.16.0`.
- Gradio 5+ is required for the custom-themed, non-chatbot layout the spec calls
  for (multi-panel `Blocks`, `gr.State`, per-role styled cards).

## ZeroGPU essentials

ZeroGPU only matters if/when the app runs a model **on-Space**. Key constraints:

- Any function that touches the GPU must be decorated with `@spaces.GPU`
  (from the `spaces` package). GPU is attached only for the duration of that call.
- `requirements.txt` must include `spaces`, and the Space's `README.md` front
  matter sets `sdk: gradio` plus a ZeroGPU-eligible hardware tag.
- CUDA is **not** available at import/module load time — only inside the
  `@spaces.GPU` function. Do not call `.cuda()` or check `torch.cuda.is_available()`
  at module scope.
- Tune `@spaces.GPU(duration=...)` to the real inference time; over-requesting
  burns the user's daily quota.
- Each GPU call runs in an isolated forked process — module-level globals set
  inside a GPU call do not persist back to the main process.

> **Architecture note:** If the courtroom text is generated via the **Inference
> API / a hosted LLM endpoint** (no local model), ZeroGPU is not strictly needed
> and `@spaces.GPU` can be omitted. Decide the generation backend early — it
> changes the whole deployment shape. See the open question in `design-spec.md`
> §20 (MVP) about generation quality vs. latency.

## Recommended Claude Code skills (Hugging Face Skills plugin)

Add the marketplace once (registers under the name `huggingface-skills`):

```
/plugin marketplace add huggingface/skills
```

Then install the skills relevant to this hackathon build. Note the install
suffix is the **marketplace name** `@huggingface-skills`, not `@huggingface/skills`:

```
/plugin install huggingface-gradio@huggingface-skills    # build the Gradio UI / Blocks
/plugin install huggingface-zerogpu@huggingface-skills    # @spaces.GPU, requirements, ZeroGPU constraints
/plugin install huggingface-spaces@huggingface-skills     # create & deploy the Space
/plugin install hf-cli@huggingface-skills                 # Hub operations (push, secrets, hardware)
```

Optional, only if generation runs a local/fine-tuned model rather than a hosted API:

```
/plugin install huggingface-best@huggingface-skills       # pick a model from leaderboards
/plugin install huggingface-local-models@huggingface-skills
```

## Custom component: MultimodalComposer

The chat composer is a **custom Gradio component** at
`custom_components/MultimodalComposer` (a `gradio cc` package based on the
MultimodalTextbox template; value contract `{text, files}`). It is registered as
an editable path dependency in the root `pyproject.toml`
(`[tool.uv.sources]`), so `uv sync` installs it from source.

Its **compiled Svelte frontend** lives in
`backend/gradio_multimodalcomposer/templates/` and is **committed on purpose**
(the deploy target has no Node toolchain to rebuild it). When deploying:

- **uv-based Space:** `uv sync` installs the component from the vendored source
  (templates included). Nothing else to do.
- **`requirements.txt`-based Space:** add `-e ./custom_components/MultimodalComposer`
  (the committed source + `templates/` is enough — no Node build on the Space).
  If a built wheel is preferred instead, produce one with the build recipe below
  (`dist/` is git-ignored, so build it in CI or commit it with `git add -f`).

To **rebuild** the component after editing its frontend, see
[`docs/multimodal-textbox.md`](./multimodal-textbox.md) → "Building the component"
(Windows needs `PYTHONUTF8=1`, an explicit `--python-path`, and a one-line
`@gradio/preview` patch). App-side composer CSS overrides are hand-edited directly
in `tinycourt/static/courtroom.css`.

## Pre-deploy checklist

- [x] `requirements.txt` pins `gradio`; **omits `spaces`** (the platform pins its
      own — a conflicting pin breaks build-time resolution); leaves `torch`
      unpinned so the Space resolves a CUDA wheel.
- [x] Custom component installs in the Space (`-e ./custom_components/MultimodalComposer`;
      compiled `templates/` are committed, so no Node build runs on the Space).
- [x] Space `README.md` front matter: `sdk: gradio`, `app_file: main.py`,
      `python_version`. (ZeroGPU hardware is selected in Space **settings**, not
      frontmatter — see steps below.)
- [x] No CUDA / model load at import time — the model loads into module globals on
      first use and the only GPU compute is `local_client._gpu_generate`, decorated
      `@spaces.GPU` (dynamic `duration` from the token budget).
- [x] `gr.State` (the `WizardState`/`TrialState` graph) pickles across the worker
      boundary — guarded by `tests/test_deploy.py`.
- [ ] API keys / tokens stored as **Space secrets**, never committed. (None needed
      for the local-model backend.)
- [ ] Cold-start: the 4B model downloads on first load; enable **persistent
      storage** (or accept a slow first cold-start) so it isn't re-fetched.

## Deploying this build

The deployment artifacts are in place (`requirements.txt`, Space frontmatter in
`README.md`, the `@spaces.GPU` generation path). To actually ship:

1. **Create the Space** (Gradio SDK), then **set hardware to ZeroGPU** in its
   Settings (or `hf`):
   ```bash
   hf auth login
   hf repo create <user>/tiny-court --repo-type space --space_sdk gradio
   # set ZeroGPU hardware in the Space's Settings → Hardware (ZeroGPU tier)
   ```
2. **Select the real backend.** A fresh Space has no cached model, so the backend
   auto-selects `fake` (canned text). Add a Space **variable** to force the model:
   ```
   TINYCOURT_BACKEND = local
   ```
   (Optional: `TINYCOURT_MODEL=small` for the lighter Qwen3-1.7B.)
3. **Push the repo** (includes the vendored composer `templates/` and
   `static/html2canvas.min.js`):
   ```bash
   git remote add space https://huggingface.co/spaces/<user>/tiny-court
   git push space <branch>:main
   ```
4. **Smoke-test live:** run one Quick Trial end to end; confirm the verdict card
   renders, the Save Image PNG downloads, and the first `@spaces.GPU` call lands
   (watch the Space logs for the duration lease). Tune `local_client._gpu_duration`
   if generations are getting cut off or over-reserving quota.

> ZeroGPU note: the default `large` slice has ample VRAM for a 4B model. If
> bitsandbytes 4-bit misbehaves under the forked worker, switch the `main` spec to
> `bf16` (it fits) — the load path already branches on `quantization`.
