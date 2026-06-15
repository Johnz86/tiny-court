# Documentation index

Map of the Tiny Court docs. Start with the **design spec** for product/UX and the
**ADRs** for the load-bearing engineering decisions.

## Product & UX
- [design-spec.md](design-spec.md) — the authoritative product/UX spec (flow, trial
  structure, layout, interactions, output design, safety, copy/tone).
- [single-page-wizard-interaction.md](single-page-wizard-interaction.md) — the
  single-page wizard interaction design (landing → court, the two materials).
- [full-trial-conversation-flow.md](full-trial-conversation-flow.md) — the
  authoritative **flow model**: the pre-verdict trial as one growing transcript
  (✅ implemented).

## Architecture decisions (ADRs)
- [adr/0001-hybrid-verdict-engine.md](adr/0001-hybrid-verdict-engine.md) — model
  proposes meter deltas, **Python owns the verdict**.
- [adr/0002-pluggable-backend-seam.md](adr/0002-pluggable-backend-seam.md) — single
  `GenerationClient`; local-first (Qwen3).
- [adr/0003-delimited-output-format.md](adr/0003-delimited-output-format.md) —
  `prose → --- → KEY: value`, tolerant parse + retry + fallback.
- [adr/0004-layered-safety-gate.md](adr/0004-layered-safety-gate.md) — layered
  **input** gate + (amendment) the **output** scrub.
- [adr/0005-trial-length-modes-and-case-file.md](adr/0005-trial-length-modes-and-case-file.md)
  — Quick vs Full Trial + the Case File decomposition of Suspicion.
- [adr/0006-conversation-flow-one-growing-transcript.md](adr/0006-conversation-flow-one-growing-transcript.md)
  — collapse per-phase screens into one glass transcript (two materials).

## Domain & rationale
- [../CONTEXT.md](../CONTEXT.md) — canonical domain glossary (use these terms).
- [motivation.md](motivation.md) — product motivation.
- [trial-meters-brainstorm.md](trial-meters-brainstorm.md) — the meters design space
  (Configs A–D); source for ADR-0001/0005.
- [model-consideration.md](model-consideration.md) — session model catalog (the
  build shipped on Qwen3, not MiniCPM — see ADR-0002).

## Build & deploy
- [deployment.md](deployment.md) — Gradio version, ZeroGPU constraints, and how to
  ship the Space.
- [multimodal-textbox.md](multimodal-textbox.md) — the custom chat composer:
  behaviour/design **and** the rebuild recipe.

## Status
- [remaining-work.md](remaining-work.md) — what shipped, the one remaining manual
  step (Space push), and the non-blocking review follow-ups.

## Event context
- [hackathon.md](hackathon.md) — the Build Small hackathon brief.
