# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Tiny Court of Everyday Crimes** — a Gradio comedy-courtroom app to be deployed
as a Hugging Face **ZeroGPU** Space. Users submit a petty everyday "crime" and
the app runs a short, theatrical, interactive trial (charges → evidence →
witness → objection → verdict → harmless sentence → shareable court record).

The app is implemented in `tinycourt/` (run via `main.py`) as a single-page
courtroom **wizard** built from two materials (see
`docs/full-trial-conversation-flow.md`): a landing stage hands off to **one
growing glass `trial` transcript** — the whole pre-verdict trial is a single
conversation that *grows* as scenes (evidence, witness, cross, objection, twist)
**append** to it — and only the rulings swap to opaque **paper**:
`trial → judgement → (appeal → revisedJudgement) → sentence`, plus a simulated
`?court=<id>` join flow. `wiz_phase` is the *material*
(`landing|join|trial|judgement|revisedJudgement|sentence`); `wiz.focus` carries
the current scene; events carry a `scene` tag. **Deliver the Verdict is reachable
from the first message** (Fast Judgement); optional scene dividers/stepper pips
appear only when the scene happens. The chat input is a custom Gradio component,
`custom_components/MultimodalComposer`. The authoritative specs:

- **`docs/design-spec.md`** — the authoritative product/UX spec. Read this before
  implementing any feature; it defines exact button labels, output card formats,
  copy/tone, trial phases, and safety rules.
- **`docs/deployment.md`** — Gradio version, ZeroGPU constraints, and which
  Hugging Face Claude Code skills to install.

## Commands

```bash
uv sync                      # install deps into .venv
uv run python main.py        # run (auto-selects the local model when cached;
                             #      TINYCOURT_BACKEND=fake|local overrides)
uv add <pkg>                 # add a dependency (updates pyproject.toml + lock)
uv run python scripts/verify_e2e.py        # end-to-end flow verification (fake)
# real-model verification (PowerShell):
#   $env:TINYCOURT_BACKEND='local'; uv run python scripts/verify_e2e.py
```

This project uses **uv** (note `.python-version` → 3.13, `pyproject.toml`).
Prefer `uv` over bare `pip`/`python`. Tests live in `tests/` — run `uv run pytest`.
No linter is configured yet; add `ruff` via `uv add --dev` if introducing one.

Front-end resources are plain, hand-maintained files in `tinycourt/static/`:
`courtroom.css` (loaded via `launch(css_paths=…)`) and `courtroom.js` (a single
`window.tc` namespace inlined into `<head>`; Python wires Gradio events to it with
thin one-line `js=` bridges). There is **no** build/generation step — edit the
files directly. The composer lives in
`custom_components/MultimodalComposer`; rebuilding its frontend needs Node (see
`docs/deployment.md`). Diagnostic/QA screenshots are produced by the
`scripts/drive_*.cjs` Playwright drivers and land in `tests/screenshots/`.

## Key architectural constraints (from the specs)

- **Not a chatbot, not a dashboard.** The spec rejects open-ended chat as the
  main interface (design-spec §21), and the earlier three-panel courtroom
  dashboard (left controls / center transcript / right case-file) was dropped in
  favour of the **single-page, single-column wizard** — see
  `docs/single-page-wizard-interaction.md`. It uses a stepper, a smoked-glass
  chat shell of per-role styled messages (Judge, Prosecutor, Defense, Witness,
  Bailiff, Clerk), and the custom multimodal composer. It must not look like
  default Gradio.
- **One growing transcript, not cleared screens.** The pre-verdict trial is a
  single glass conversation; scenes are optional **moves** that append (with a
  `scene` tag + a divider that shows only when the scene happens), never detours
  that wipe the record. `render.glass_trial` renders the whole ordered flow; the
  stepper is a dynamic timeline derived from trial state. Do not reintroduce
  per-phase glass screens. (`docs/full-trial-conversation-flow.md`.)
- **State machine, not free text.** The trial moves through fixed scenes
  (design-spec §6). Track trial state in `gr.State`; interactions (Object!,
  Submit Evidence, Add Twist, Appeal) mutate that state and must measurably
  affect the verdict/sentence. The verdict engine (`trial.py`, ADR-0001) and Case
  File (ADR-0005) are **frozen** — flow/UI work must not touch the verdict math.
- **Quick Trial is the default** (~60–90s, design-spec §11.1); Full Trial is the
  power-user path. Optimize the default path for hackathon-judge attention spans.
- **ZeroGPU rules apply only if a model runs on-Space.** No CUDA / model load at
  import time — only inside `@spaces.GPU` functions. If generation uses a hosted
  LLM/Inference API instead, `spaces` is not needed. Pick the backend early; it
  changes the deployment shape (see `docs/deployment.md`).
- **Safety is a hard requirement, not polish.** Genuinely serious/dangerous/legal/
  medical/traumatic input must be gently redirected, and real people kept
  low-stakes and never targeted (design-spec §13–14). Implement the empty /
  too-serious / too-long / incoherent input states with the spec's exact copy.
  Both directions are gated: `safety.screen()` floors **input** (intake + chat
  sends); `safety.scrub_output()` floors **generated output** (real harm / real
  legal punishment) at the single `add_card` choke point plus the closing/docket
  seams, with a gentle in-character redaction (ADR-0004).

## Payoff & shipping

- **Shareable PNG.** The Court Record exports client-side via vendored
  `static/html2canvas.min.js` (`window.tc.savePng`, the "Save Image" action) — no
  server render. The landing front-loads a rotating hero docket (`landing_hero`).
- **ZeroGPU path.** The local backend (`local_client.py`) keeps the model in
  module globals and does the only GPU compute in a module-level
  `@spaces.GPU(duration=…)` function (no CUDA at import). Deploy steps +
  requirements/README frontmatter: `docs/deployment.md`.

## Tone

All generated and UI copy is theatrical, witty, bureaucratic, emotionally
exaggerated — never mean-spirited, never seriously legalistic. When writing
strings or prompts, match the worked examples in design-spec §17 and §10.
