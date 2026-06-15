---
title: Tiny Court of Everyday Crimes
emoji: ⚖️
colorFrom: yellow
colorTo: red
sdk: gradio
sdk_version: 6.16.0
app_file: main.py
python_version: "3.12"
pinned: true
license: apache-2.0
short_description: Multimodal comedy courtroom — text, photo & voice on trial.
datasets:
  - build-small-hackathon/tiny-court-traces
tags:
  - build-small-hackathon
  - gradio
  - custom-ui
  - comedy
  - agent
  - track:backyard
  - achievement:offbrand
  - achievement:sharing
  - achievement:llama
  - achievement:fieldnotes
  - sponsor:modal
  - sponsor:nvidia
  - sponsor:openbmb
  - sponsor:jetbrains
---

<!-- The block above is Hugging Face Space metadata (must stay at the very top).
     This Space runs the comedy-courtroom UI on the REMOTE backend: four small
     open models served on Modal (judge / vision / formatter / ASR) reached over
     OpenAI-compatible endpoints. No GPU runs on-Space. Backend selection + the
     Modal endpoint URLs are Space *variables*; the Modal proxy token is a Space
     *secret* — never commit tokens. See the dev repo's docs/hf-space-configuration. -->

# Tiny Court of Everyday Crimes

> Ace Attorney for stupid everyday problems.

An interactive comedy courtroom where users put small, ridiculous, everyday
conflicts on trial — snack thefts, suspicious pet behavior, object betrayals —
and receive charges, evidence, witnesses, objections, a verdict, and an absurdly
harmless sentence. A **Gradio app** backed by **four small open models served on
Modal**, accepting **text, photo, and voice** evidence.

This is a comedy experience, **not** legal advice.

## Watch a trial

![Tiny Court — a full trial walkthrough](assets/promo-walkthrough.webp)

*A sped-up loop of one full trial: complaint → evidence → witness → cross-examine
→ twist → verdict → leniency appeal → the shareable **Court Record**.*
▶️ [**Download the full-quality video (MP4)**](https://huggingface.co/spaces/build-small-hackathon/tiny-court/resolve/main/assets/promo-walkthrough.mp4)
(the loop above is an animated WebP so it plays inline everywhere.)

## How it works

A landing page (rotating hero docket + **Quick Trial** / **Full Trial** CTAs)
opens into **one growing courtroom conversation**: you file a complaint and the
court reacts; optional *moves* — submit evidence, call a witness, cross-examine,
object, add a twist — append to the same transcript. **Deliver the Verdict** is
available from the first message and swaps to a printed ruling; you can **appeal**
back into the conversation, then finalize to a shareable **Court Record** (with a
one-click PNG export).

The verdict is **Python-owned and deterministic** — the model proposes meter
deltas, the engine resolves the band — so interactions provably move the needle.
Safety is gated **both ways**: a layered gate on input and an offline scrub on
generated output.

## The model stack

Generation runs through a pluggable seam. In production the Space talks to **four
small open models served on Modal** over OpenAI-compatible endpoints — each
modality is *perceived into text* before the judge reasons over it, so a weak
perception model never owns the verdict:

| Role | Model | Served via | Sponsor |
|---|---|---|---|
| **Judge** (reasoning + fields) | NVIDIA Nemotron-3-Nano-4B | llama.cpp on Modal | NVIDIA |
| **Vision** (photo evidence) | OpenBMB MiniCPM-V-4.6 | llama.cpp on Modal | OpenBMB |
| **Formatter** (schema repair) | JetBrains Mellum2-12B-A2.5B | llama.cpp on Modal | JetBrains |
| **ASR** (voice evidence) | NVIDIA Parakeet-TDT-0.6B | NeMo on Modal | NVIDIA |

All models are **under 32B**; the judge/vision/formatter run on **llama.cpp**. The
app degrades gracefully — if Modal is unreachable it falls back to a deterministic
canned backend so the UI always runs.

## Agent traces

Every model call is captured as a redacted JSONL **agent trace** (the deterministic
verdict meters snapshotted alongside each call) and published to
**[build-small-hackathon/tiny-court-traces](https://huggingface.co/datasets/build-small-hackathon/tiny-court-traces)**
— no raw images, prompts, or tokens.

## Field notes

A short write-up on building Tiny Court — and why a comedy courtroom is a careful
frame for *not* outsourcing judgment to a model:
**[Tiny Court and the urge to outsource judgment](https://johnz86.github.io/blog/tiny-court-and-the-urge-to-outsource-judgment.html)**.

## Docs

Full docs live in the source repo (not shipped to the Space):

- **[Documentation index](https://github.com/Johnz86/tiny-court/blob/main/docs/README.md)** — start here.
- **[Design spec](https://github.com/Johnz86/tiny-court/blob/main/docs/design-spec.md)** — product & UX.
- **[Model-serving decision](https://github.com/Johnz86/tiny-court/blob/main/docs/modal-serving-decision.md)** — the multimodel Modal backend + client orchestration.
- **[Agent traces](https://github.com/Johnz86/tiny-court/blob/main/docs/agent-traces.md)** — the trace format + publish flow.
- **[ADRs](https://github.com/Johnz86/tiny-court/tree/main/docs/adr)** — architecture decisions.

## Quick start

```bash
uv sync
uv run python main.py                         # fake backend (no GPU, no network)

# against the live Modal models:
#   set the TINYCOURT_MODAL_*_URL vars (see docs/hf-space-configuration.md), then
#   TINYCOURT_BACKEND=remote uv run python main.py
```

Requires Python 3.13 locally.
