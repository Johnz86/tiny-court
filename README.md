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
short_description: A comedy courtroom that puts petty everyday crimes on trial.
tags:
  - build-small-hackathon
  - gradio
  - custom-ui
  - comedy
  - agent
  - track:backyard
  - achievement:offbrand
---

<!-- The block above is Hugging Face Space metadata (must stay at the very top).
     This Space runs the lightweight courtroom UI on the deterministic fake
     backend (cpu-basic, no GPU). Running the real model on-Space needs ZeroGPU
     with a registered @spaces.GPU handler, or a remote endpoint — see
     docs/deployment.md. Store any tokens as Space secrets, never in the repo. -->

# Tiny Court of Everyday Crimes

> Ace Attorney for stupid everyday problems.

An interactive comedy courtroom where users put small, ridiculous, everyday
conflicts on trial — snack thefts, suspicious pet behavior, object betrayals —
and receive charges, evidence, witnesses, objections, a verdict, and an absurdly
harmless sentence. Built as a **Gradio app for Hugging Face ZeroGPU**.

This is a comedy experience, **not** legal advice.

## Watch a trial

![Tiny Court — a full trial walkthrough](assets/promo-walkthrough.webp)

*A sped-up loop of one full trial: complaint → evidence → witness → cross-examine
→ twist → verdict → leniency appeal → the shareable **Court Record**.*
▶️ [**Download the full-quality video (MP4)**](https://github.com/Johnz86/tiny-court/raw/main/assets/promo-walkthrough.mp4)
(GitHub can't play a committed video inline — its page CSP blocks repo-hosted
media — so the loop above is an animated WebP.)

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
generated output. Generation runs through a pluggable backend (canned `FakeClient`
by default; local Qwen3 via `@spaces.GPU` on a ZeroGPU Space).

## Docs

**[docs/README.md](docs/README.md)** is the full documentation index. Highlights:

- **[docs/design-spec.md](docs/design-spec.md)** — full product & UX specification
  (user flow, trial structure, layout, interactions, output design, safety).
- **[docs/full-trial-conversation-flow.md](docs/full-trial-conversation-flow.md)**
  — the one-growing-transcript flow model (authoritative).
- **[docs/deployment.md](docs/deployment.md)** — tech stack, Gradio version,
  ZeroGPU constraints, and how to ship the Space.
- **[docs/adr/](docs/adr/)** — architecture decision records (verdict engine,
  backend seam, output format, safety, trial modes, conversation flow).
- **[CONTEXT.md](CONTEXT.md)** — canonical domain glossary.

## Quick start

```bash
uv sync
uv run python main.py
```

Requires Python 3.13.
