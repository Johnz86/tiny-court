# Hackathon winning roadmap — final-day execution plan

We shipped first; now this is the high-signal checklist for the remaining hackathon
window. The current source of truth is the Build Small field guide:
<https://build-small-hackathon-field-guide.hf.space/#prizes>.

> **Verified constraint:** submissions close **2026-06-15 23:59 UTC**. At the last
> local check (2026-06-15 12:21 CEST), that left roughly **13h 37m**.

---

## 0. Current state

| Thing | Status |
|---|---|
| Live Space | ✅ `build-small-hackathon/tiny-court` is deployed in the official org |
| Git / source | ✅ uploaded to GitHub / Space history |
| App backend | ✅ working `cpu-basic` fake backend; ❌ real generation not yet wired |
| Core track | ✅ keep `track:backyard` |
| Backyard story | ✅ household dispute resolver for people who live together |
| Off-Brand | ✅ custom courtroom UI; tag already present |
| Promo video asset | ✅ `assets/promo-walkthrough.{webp,mp4}` exists |
| Modal local setup | ✅ `uv pip install modal` + `uv run modal setup` completed |
| Modal token | ✅ written to user profile `C:\Users\jan.jakubcik\.modal.toml` |
| Modal app/runtime | ✅ deployed as `tinycourt-minicpm-openai`; `/v1/chat/completions` covered by `modal_live` endpoint test |
| README submission links | ❌ needs final demo/social links |

**Backyard framing:** Tiny Court is not just a toy court. It is a lightweight,
low-stakes mediator for household/roommate/family disputes: snack theft, chores,
object blame, suspicious noise, thermostat crimes, and other tiny conflicts that
benefit from humor, structure, and a harmless verdict. The README, video, and social
post should say this plainly.

---

## 1. Non-negotiable submission checklist

The field guide requires these for a clean entry:

- [x] Models under 32B parameters.
- [x] Gradio app deployed as a Space in the official Build Small org.
- [ ] Demo video linked from README.
- [ ] Social-media post linked from README.
- [ ] README frontmatter tags for track, badges, and sponsors being claimed.
- [ ] Short README write-up explaining idea + tech.

Do **not** spend the final hours on extra engineering until the video/social/README
submission path is closed.

---

## 2. Badge and prize map

| Target | Tag / claim | Needs | Current gap | Final-day priority |
|---|---|---|---|---|
| Backyard AI | `track:backyard` | Specific useful problem for someone close | Strengthen wording around household disputes | **High** |
| Off-Brand | `achievement:offbrand` | Custom UI beyond stock Gradio | Done | Keep |
| Best Demo | README/demo/social claim | Strong demo video + social post | Need public links | **High** |
| Best Agent | likely `agent` / agentic write-up | Multi-step planning/tool-like flow under 32B | Current trial flow is structured; make it explicit | **Med** |
| OpenAI / Codex | sponsor prize claim | Codex-attributed commits/history | Need README mention if history supports it | **Med** |
| Sponsor: Modal | `sponsor:modal` | Use Modal for dev/runtime; note it in README | Local auth done, runtime missing | **Med-High if we can ship runtime** |
| Sponsor: OpenBMB | `sponsor:openbmb` | MiniCPM core to experience | Not wired | **Med-High with Modal path** |
| Tiny Titan | badge/special claim | Every model <= 4B | Possible if using MiniCPM-V ~1.3B or other <=4B | **Only if true** |
| Field Notes | `achievement:fieldnotes` | Blog/report about build and learning | Docs exist, public post/report needed | **Low-Med** |
| Sharing is Caring | `achievement:sharing` | Agent traces on HF Hub | ✅ capture implemented (`tinycourt/tracing.py`); run `scripts/upload_traces.py` to publish the dataset | **Med** |
| Llama Champion | `achievement:llama` | Model served via llama.cpp runtime | No llama.cpp server yet | **High effort** |
| Well-Tuned | `achievement:welltuned` | Fine-tuned model published on HF | No fine-tune | **Skip unless everything else is done** |

Rule of thumb: only add a tag once there is a judge-verifiable artifact.

---

## 3. Recommended order for the remaining 13-ish hours

### A. Close the submission package first

1. Upload or publish the existing MP4 demo. YouTube is fine; hosting it publicly or
   uploading it to the Space also works.
2. Make one social post. The story should be:
   - "Tiny Court helps households resolve tiny disputes without escalating them."
   - "It turns petty conflict into structured evidence, witnesses, objections, and a
     harmless verdict."
   - "Small models are enough because the app needs structured comic reasoning, not
     broad expert intelligence."
3. Update README with:
   - Space purpose in Backyard terms.
   - Demo link.
   - Social post link.
   - Final tags only for real artifacts.

This protects the actual submission.

### B. Then take the best engineering swing: Modal + MiniCPM

Modal is now locally authenticated, so the next badge-rich path is:

1. Add a `modal_app.py` based on the GigScan pattern.
2. Serve an OpenAI-compatible endpoint or a narrow Tiny Court endpoint. ✅
3. Add a `remote_client.py` behind the existing backend seam. ✅
4. Put Modal endpoint/secrets into the Space. ❌ still needed
5. Switch the deployed Space from fake backend to remote backend. ❌ still needed
6. Update README to claim Modal/OpenBMB only after the deployed app actually uses them.

This can unlock:

- `sponsor:modal`
- `sponsor:openbmb`
- potentially Tiny Titan, if every runtime model is <=4B
- potentially Llama Champion, if the Modal runtime uses `llama-server`/llama.cpp

Avoid mixing this with a ZeroGPU refactor unless Modal blocks. The existing roadmap
already captured the ZeroGPU problem: HF expects a registered `@spaces.GPU` Gradio
handler, while our local client currently hides GPU work behind an inner helper.

### C. Add traces only if runtime is stable

For Sharing is Caring — **capture is now implemented** (see
[`agent-traces.md`](agent-traces.md)):

1. ✅ Ported the `gigscan_via_modal/gigscan/trace_writer.py` idea into
   `tinycourt/tracing.py`, hooked at the `engine.robust_call` seam so every
   backend (remote/local/fake) and both retry attempts are traced.
2. ✅ Redacted trial events serialize as JSONL (`trace_format: tinycourt-jsonl-v1`),
   with a per-call snapshot of the deterministic verdict meters.
3. ✅ PII and raw uploads excluded — prompt text and inline images reduced to
   lengths + SHA-256; off by default, opt-in content flags for local debugging.
4. ⏳ Publish: capture a few trials with `TINYCOURT_TRACES_ENABLED=1`, then run
   `scripts/upload_traces.py` (target `build-small-hackathon/tiny-court-traces`
   or a user-owned dataset linked from README).
5. ⏳ Add `datasets:` frontmatter and the achievement tag only after publication.

This is useful, but it should not outrank the submission package or a working real
model demo.

### D. Treat Field Notes as a fast documentation win

Use existing material:

- `docs/deploying-gradio-on-huggingface.md`
- ADRs, especially deterministic verdict engine and pluggable backend seam
- `docs/full-trial-conversation-flow.md`
- this roadmap

A short public post/report is enough if it explains what changed, what broke, and what
was learned. Add the tag only after the public link exists.

### E. Skip Well-Tuned unless the core package is done

Fine-tuning, conversion, publishing, and wiring a model is too much risk for the final
hours unless all easier judge-visible artifacts are already complete.

---

## 4. README tag policy

Current safe tags:

```yaml
tags:
  - build-small-hackathon
  - gradio
  - custom-ui
  - comedy
  - agent
  - track:backyard
  - achievement:offbrand
```

Add these only when true:

```yaml
  - sponsor:modal        # after deployed app uses Modal, or Modal is clearly used in runtime/dev and README explains it
  - sponsor:openbmb      # after MiniCPM is core to the app
  - achievement:fieldnotes
  - achievement:sharing
  - achievement:llama
  - achievement:welltuned
```

If the submission tool exposes different exact tag strings, use the tool's generated
README block as the final authority.

---

## 5. Modal notes

Completed:

```powershell
uv pip install modal
uv run modal setup
```

Result:

- Browser auth succeeded.
- Token connected to the `jan-jakubcik` workspace.
- Modal verified the token against `https://api.modal.com`.
- Token was written to `C:\Users\jan.jakubcik\.modal.toml` in profile
  `jan-jakubcik`.

Do not commit `.modal.toml`. The Space will need its own runtime endpoint URL and any
required secrets configured in Hugging Face Space settings.

---

## 6. References

- Live field guide / prize table:
  <https://build-small-hackathon-field-guide.hf.space/#prizes>
- Submit flow:
  <https://build-small-hackathon-field-guide.hf.space/submit>
- Reference submission: [`gigscan_via_modal/`](../gigscan_via_modal)
- HF deployment notes:
  [`deploying-gradio-on-huggingface.md`](deploying-gradio-on-huggingface.md)
- Backend seam:
  [`adr/0002-pluggable-backend-seam.md`](adr/0002-pluggable-backend-seam.md)
- Space deployment specifics:
  [`deployment.md`](deployment.md)
