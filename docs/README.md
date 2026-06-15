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
- [field-notes-the-urge-to-outsource-judgment.md](field-notes-the-urge-to-outsource-judgment.md) — essay on Tiny Court as comic arbitration and a cautionary frame for AI judges. Published as a blog post: [Tiny Court and the urge to outsource judgment](https://johnz86.github.io/blog/tiny-court-and-the-urge-to-outsource-judgment.html).
- [trial-meters-brainstorm.md](trial-meters-brainstorm.md) — the meters design space
  (Configs A–D); source for ADR-0001/0005.
- [model-consideration.md](model-consideration.md) — session model catalog (the
  build shipped on Qwen3, not MiniCPM — see ADR-0002).
- [model-serving-recommendations.md](model-serving-recommendations.md) — current
  multimodel serving plan: GGUF availability, Modal serving options, target repos,
  and recommended model roles after MiniCPM-V proved weak at strict formatting.
- [modal-serving-decision.md](modal-serving-decision.md) — the **decision** built on
  the recommendations: can we serve multiple models on one endpoint, the chosen
  judge+vision two-endpoint setup, and exactly what to change in `modal_minicpm`
  and the client.

## Build & deploy
- [deployment.md](deployment.md) — Gradio version, ZeroGPU constraints, and how to
  ship the Space.
- [hf-space-configuration.md](hf-space-configuration.md) — the Space's required
  variables & secrets (backend selection, Modal endpoint, tuning, traces) and the
  exact `hf` commands to set them, restart, and verify.
- [modal-remote-integration-plan.md](modal-remote-integration-plan.md) — current
  Modal MiniCPM remote-backend status, environment variables, smoke tests,
  GigScan lessons, remaining Space rollout plan, and failure modes.
- [deploying-gradio-on-huggingface.md](deploying-gradio-on-huggingface.md) — general,
  reusable field guide: `hf` CLI commands, token/auth traps, `requirements.txt` rules,
  the module-level-`demo`/`launch()` shape, custom-component wheel install, Git LFS,
  ZeroGPU's `@spaces.GPU` startup requirement, log/UTF-8 debugging, and the full
  **iframe height-runaway** fix (CSS + JS).
- [multimodal-textbox.md](multimodal-textbox.md) — the custom chat composer:
  behaviour/design **and** the rebuild recipe.
- [agent-traces.md](agent-traces.md) — redacted JSONL agent-trace capture at the
  generation seam + the publish-to-HF-Dataset workflow (Sharing is Caring).

## Status
- [remaining-work.md](remaining-work.md) — what shipped, the one remaining manual
  step (Space push), and the non-blocking review follow-ups.

## Event context
- [hackathon.md](hackathon.md) — the Build Small hackathon brief.
- [hackathon-winning-roadmap.md](hackathon-winning-roadmap.md) — the badges/steps we
  deferred to deploy first, prioritised (Field Notes, traces dataset, MiniCPM-V via
  Modal/ZeroGPU, fine-tune), with the submission-artifact checklist.
