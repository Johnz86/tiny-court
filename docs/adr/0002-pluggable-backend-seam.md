# Pluggable generation backend behind one seam

> **Amendment (2026-06-12):** the local registry now defaults to **Qwen3**
> (`Qwen/Qwen3-4B-Instruct-2507` 4-bit as `main`, `Qwen/Qwen3-1.7B` bf16 as
> `small`). The original MiniCPM defaults ship custom remote code that crashes
> on transformers 5.x (KV-cache API change → reshape error on the first decoded
> token), and we cannot pin transformers <5 because Gradio 6 requires
> huggingface-hub 1.x. Qwen3 is natively supported (no `trust_remote_code`),
> ungated, and instruction-tuned; the seam, env overrides
> (`TINYCOURT_MODEL_SMALL` / `TINYCOURT_MODEL_MAIN`), and A/B harness are
> unchanged. End-to-end verification lives in `scripts/verify_e2e.py`.

All courtroom text generation goes through a single `GenerationClient` interface;
trial logic never imports a model directly. Two implementations exist, selected by
env var: a `LocalTransformersClient` and an `OpenAICompatClient`.

**Iteration 1 is local-first.** The `LocalTransformersClient` loads either
MiniCPM5-1B (bf16, ~2.5GB) or MiniCPM4.1-8B (4-bit, ~6GB) on an 8GB GPU, chosen by
env var, and the two are **A/B-compared early on the real courtroom prompts** to
pick the smallest model whose comedic quality and delimited-format parse rate both
hold up (the Tiny Titan instinct). The hosted `OpenAICompatClient` (live-share
endpoint, token in a Space secret) is wired in a **later** iteration. Local-first
makes the Off-the-Grid / Tiny Titan story real from day one and removes any
dependency on an external endpoint we have not verified is live. llama.cpp, vLLM,
and ZeroGPU remain deferred to a later deployment-serving concern.

## Why

The live-share guidance is "prototype with Transformers → Gradio → Spaces →
(vLLM/llama.cpp) later" (model-consideration.md §6–7). Committing to llama.cpp or
ZeroGPU on day 1 fights the build: ZeroGPU's per-call forked process reloads the
model, and llama.cpp wants a persistent server — both wreck the 60–90s budget and
slow iteration, for a *text* app where a small model is plenty. The seam lets us
move hosted→local→served without touching trial logic.

## Considered options

- **Hosted API first for dev, local as offline twin:** the original plan;
  reconsidered and flipped, because it depends on an unverified endpoint and
  leaves the Tiny Titan / Off-the-Grid story until later.
- **llama.cpp / ZeroGPU on-Space from day 1:** maximal bonus-quest alignment, but
  highest friction and slowest iteration during a 10-day build.
- **Seam, local-first, two local models A/B'd (chosen):** keeps every path alive
  at near-zero cost, secures the tiny-model story immediately, and defers both the
  hosted client and the serving decision until the experience is polished.

## Consequences

Backend (and local model) choice is a config flag, not a rewrite. A thin dev-only
A/B harness loads both local models and runs the *real* courtroom prompts through
each, reporting rendered cards, first-try parse rate, tok/s, and VRAM — so model
selection doubles as hardening the prompt layer rather than being separate eval
tooling. The parsing/fallback layer (see
[ADR-0003](./0003-delimited-output-format.md)) lives above the seam and must not
assume any provider-specific feature (e.g. JSON mode). Tokens are Space secrets,
never committed (model-consideration.md §6).
