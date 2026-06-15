# Hackathon winning roadmap — the steps we skipped to deploy first

We prioritised getting a **live, working Space** over chasing badges. This is the
deferred work, prioritised, so we can pick it up. It builds on the badge analysis we
did against the reference submission ([`gigscan_via_modal/`](../gigscan_via_modal),
live at <https://huggingface.co/spaces/build-small-hackathon/gigscan_via_modal>),
whose `README.md` `tags:` block is effectively the scorecard.

> **Context:** the Build Small Hackathon (Gradio × Hugging Face) rewards useful/
> delightful Gradio apps under 32B params. Each **merit badge** = a README `tag` **+**
> a real artifact a judge can verify. Sponsors (OpenBMB/MiniCPM, Modal, …) have their
> own tags.

---

## 0. Where we are now

| Thing | Status |
|---|---|
| Live Space (org namespace) | ✅ `build-small-hackathon/tiny-court`, `cpu-basic`, **fake** backend |
| Entry tags | ✅ `build-small-hackathon`, `gradio`, `custom-ui`, `track:backyard`, `achievement:offbrand` |
| **Off-Brand** badge (custom UI) | ✅ legitimately ours (the whole courtroom wizard) |
| Promo video | ✅ produced (`assets/promo-walkthrough.{webp,mp4}`) — not yet on YouTube |
| Build-journey material | ✅ extensive `docs/` + ADRs to repurpose |
| **Real model generation** | ❌ deployed on the canned/fake backend |

So we're **officially entered with one badge (Off-Brand)** and a working demo. The
rest below is upside.

---

## 1. The badge map

| Badge | Tag | Needs | Our gap | Effort |
|---|---|---|---|---|
| Off-Brand | `achievement:offbrand` | Custom non-default Gradio UI | **Done** | — |
| Field Notes | `achievement:fieldnotes` | A build-journey write-up (blog) | Repurpose our docs | **Low** |
| (Video) | — | A demo video | Upload existing promo | **Low** |
| Sharing is Caring | `achievement:sharing` | Redacted agent traces → a HF **Dataset** | Port GigScan's `trace_writer.py` | **Med** |
| Sponsor: OpenBMB | `sponsor:openbmb` | Use **MiniCPM** | We ship Qwen3 | **Med–High** |
| Llama Champion | `achievement:llama` | Served via `llama.cpp`/`llama-server` | No llama.cpp path | **High** |
| Sponsor: Modal | `sponsor:modal` | Inference on **Modal** | No Modal app | **High** |
| Well-Tuned | `achievement:welltuned` | A task-specific **fine-tuned** model on HF | No fine-tune | **Highest** |

> Only tag a badge once its artifact exists — judges verify. We deliberately did **not**
> tag `sponsor:openbmb` / `achievement:llama` / `achievement:welltuned` because as-is
> they'd be false claims.

---

## 2. Phase 1 — quick wins (low effort, high certainty)

These need no model/architecture change and bank several badges fast.

1. **Field Notes** (`achievement:fieldnotes`). Write a Medium/blog post on the build
   journey — the deterministic verdict engine (ADR-0001), the single-page wizard
   pivot, the custom composer, and especially the **HF deployment saga** (we already
   have it written up in [`deploying-gradio-on-huggingface.md`](deploying-gradio-on-huggingface.md)).
   Then add the `achievement:fieldnotes` tag + link the post in the README.
2. **Video demo.** Upload `assets/promo-walkthrough.mp4` to YouTube (ideally re-record
   with a short voiceover); link it in the README. (We already solved inline playback
   via the animated WebP.)
3. **Social post.** A LinkedIn/X post tagging the sponsors (the reference did this).
4. **Sharing is Caring** (`achievement:sharing`) — *medium, high value.* Port
   `gigscan_via_modal/gigscan/trace_writer.py`: write a **redacted** JSONL trace per
   trial (no PII, no raw images — store hash/length placeholders), publish to a HF
   **Dataset** (`<ns>/tiny-court-traces`), and add the `achievement:sharing` tag +
   `datasets:` frontmatter. Our trial state is already structured (events/scenes), so
   the trace writer is mostly a serialiser + an `hf` upload. Gate it behind an env var.

**Outcome of Phase 1:** Off-Brand + Field Notes + Sharing-is-Caring + a video, with no
risk to the running app.

---

## 3. Phase 2 — put a real model behind it (the big fork)

This unlocks **`sponsor:openbmb`** and turns the app from "canned demo" into the real
thing. Two strategic decisions:

### Decision A — model: switch to **OpenBMB MiniCPM-V-4.6**
- Earns the **`sponsor:openbmb`** alignment (their model).
- Our composer already accepts **image evidence** → a vision-language model gives a
  genuinely on-theme feature: *"submit a photo as evidence and the court examines it."*
  Strong demo beat.
- Sidesteps our known blocker (MiniCPM remote code broken on `transformers` 5.x — see
  the note in `tinycourt/config.py`, which is why the registry defaults to Qwen3)
  **if** served as GGUF via llama.cpp rather than `transformers`.

### Decision B — serving: ZeroGPU vs Modal
| Path | Earns | Cost |
|---|---|---|
| **MiniCPM-V via `transformers` in `@spaces.GPU`** (ZeroGPU) | `sponsor:openbmb` | Needs a **registered `@spaces.GPU` handler** (see below) + creator on PRO; resolve the transformers-5.x remote-code issue |
| **MiniCPM-V GGUF via `llama-server` on Modal** (GigScan's pattern) | `sponsor:openbmb` + **`achievement:llama`** + **`sponsor:modal`** | Stand up a Modal app + 2 Space secrets; the most badges + a warm, reliable demo |

> **ZeroGPU blocker we already hit:** a ZeroGPU Space refuses to boot unless a
> `@spaces.GPU` function is a *registered Gradio handler* (`No @spaces.GPU function
> detected during startup`). Our `@spaces.GPU` is an inner helper in `local_client.py`,
> so Path-A needs a small refactor: decorate the handler Gradio binds (or a thin
> registered wrapper). See [`deploying-gradio-on-huggingface.md` §8](deploying-gradio-on-huggingface.md).

**Architecture is on our side:** the pluggable backend seam (ADR-0002, `FakeClient` /
`local_client`) means adding a `remote_client.py` that POSTs to an OpenAI-style
`/v1/chat/completions` endpoint is almost a copy of `gigscan/model_client.py`. Both the
remote and local backends can coexist behind the one interface.

**Recommendation:** if maximising badges + demo reliability → **Modal (Path B)**:
`sponsor:openbmb` + `sponsor:modal` + Llama Champion + the photo-evidence feature, with
a lightweight Space (no torch). If minimising moving parts → **ZeroGPU (Path A)** for
`sponsor:openbmb` only.

---

## 4. Phase 3 — stretch: Well-Tuned

`achievement:welltuned` needs a **fine-tuned** model published on HF (the reference
fine-tuned MiniCPM-V for its narrow task and shipped `…-minicpm-v-gguf`). For us:
fine-tune MiniCPM (LoRA) on courtroom-style verdict/charge generation, convert to GGUF,
publish the model repo, point the app at it, and add `models:` frontmatter +
`achievement:welltuned`. This is the **highest-effort** badge — only worth it if the
earlier phases are done and there's time.

---

## 5. Submission artifacts checklist

The reference listed all of these in its README; mirror them:

- [x] **Live app** — the Space (done).
- [ ] **Model repo** — only if we fine-tune (Well-Tuned).
- [ ] **Traces dataset** — `<ns>/tiny-court-traces` (Sharing-is-Caring).
- [ ] **Blog post** — Field Notes.
- [ ] **Social post** — LinkedIn/X tagging sponsors.
- [ ] **Video demo** — YouTube link.
- [ ] **README updated** — final `tags:`, links to all artifacts, `models:`/`datasets:`.

---

## 6. Open questions to verify FIRST

We never pulled the official rules — confirm before investing in Phase 2/3:

- **Deadline** and the **submission form/mechanics**.
- The exact **track** for a "delightful" app (we guessed `track:backyard`; confirm the
  taxonomy — there may be a better-fitting track).
- Whether the Space **must** live in the `build-small-hackathon` org (it does) and any
  per-badge rules (e.g. does Sharing-is-Caring require a minimum trace count / public
  dataset?).
- Whether ZeroGPU is available to us (creator must be **PRO/Team/Enterprise**).

(Use `WebFetch`/`WebSearch` on the hackathon org + rules page, or ask the organisers.)

---

## 7. Recommended order

1. **Verify the rules** (§6) — cheap, prevents wasted effort.
2. **Phase 1** (§2) — Field Notes + Video + Social + Traces dataset. Several badges, no app risk.
3. **Phase 2** (§3) — MiniCPM-V via **Modal** (Path B) for the sponsor + Llama badges and a real, warm demo; add the **photo-evidence** feature.
4. **Phase 3** (§4) — fine-tune for Well-Tuned, only if time remains.

Each phase is independently shippable, and none of it risks the already-live Space.

---

## References

- Reference submission: [`gigscan_via_modal/`](../gigscan_via_modal) — `README.md` tag
  taxonomy, `model_client.py` (OpenAI-style remote backend), `trace_writer.py` (traces).
- [`deploying-gradio-on-huggingface.md`](deploying-gradio-on-huggingface.md) — deploy
  mechanics + the ZeroGPU `@spaces.GPU` startup requirement (the Path-A blocker).
- [ADR-0002](adr/0002-pluggable-backend-seam.md) — the backend seam that makes a
  `remote_client.py` (Modal) a drop-in.
- [`deployment.md`](deployment.md) — this project's ZeroGPU/Gradio specifics.
