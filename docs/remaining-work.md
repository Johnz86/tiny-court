# Project status & follow-ups

*The path to a shippable Tiny Court (the T1–T6 backlog) is essentially done. This
is the **record** of what landed, the one manual step that remains, and the
non-blocking follow-ups (the open items from the multi-agent review, whose P0s all
shipped). Grounded in the code, `docs/design-spec.md`, and `docs/deployment.md`.*

The feature engine was already complete before this work (Configs A–D, verdict
math frozen). The backlog was flow, payoff, safety, and shipping. Verified green:
**75 unit tests**, fake e2e **33/33**, real-model e2e **36/36**, screenshot sweep.

---

## What shipped (2026-06-14)

| Task | Landed as |
|---|---|
| **T1 — Flow refactor** (one growing transcript) | One glass `trial` surface + `wiz.focus`; `scene`-tagged `wiz.events`; `render.glass_trial` + scene dividers; dynamic-timeline stepper; **Object! inline**; **Fast Judgement from message one**. Engine untouched. ADR-0006; `docs/full-trial-conversation-flow.md`. |
| **T2 — Output safety scrub** | `safety.scrub_output()` floored into the single `add_card` choke point + `react`/`open_case`/`submit_evidence`/`deliver_closing`; adversarial `tests/test_output_safety.py`. ADR-0004 amendment; design-spec §14. |
| **T3 — PNG court-record export** | Client-side capture of `render.record_card` via vendored `static/html2canvas.min.js` (`window.tc.savePng`, the **Save Image** action). design-spec §10.7. |
| **T4 — Landing hero docket** | `render.landing_hero` + `data.LANDING_DOCKETS`: one faux record that **rotates through 4 cases**, above an aligned **Quick Trial / Full Trial** CTA pair. design-spec §15. |
| **T6 — Review + verify** | `/code-review` (4 fixes applied), the test/e2e/screenshot gate above. |

The multi-agent review's headline thesis — *make consequence visible, make the
result travel, close the two safety gaps* — is **done**: the intake classifier is
wired into the live path, all six meters render with delta badges, the PNG record
ships, the funny docket is front-loaded, and the output side is scrubbed (incl. the
`accused` field). The items below are the review's remaining **P1/P2** follow-ups.

---

## Still to do

- **T5 — push the Space.** The deploy *artifacts* are in place and the path is
  validated locally: `requirements.txt`, Space frontmatter in `README.md`, the
  `@spaces.GPU` generation path in `local_client.py` (model in module globals, no
  CUDA at import), and the `gr.State` pickle guard (`tests/test_deploy.py`). What
  remains is the **outward-facing push** (create the Space, set ZeroGPU hardware,
  set the `TINYCOURT_BACKEND=local` variable, `git push`) — needs the HF account.
  Steps: `docs/deployment.md` → "Deploying this build".
- **Inert CSS cleanup.** The old `.example-docket` / `.example-bubble` styles in
  `courtroom.css` are unused since the rotator was repurposed into the hero
  (`#landingHero`); safe to delete in a sweep.

### Review follow-ups (non-blocking P1/P2)

**Prompting (`engine.py`, `prompts.py`)**
- **Corrective parse retry.** `robust_call` re-rolls the *identical* prompt; make
  attempt 2 corrective (append an "output ONLY the `---` fence + `KEY:` lines"
  instruction, drop temp to ~0.3). Highest-leverage prompt change.
- **Bucketed deltas over calibrated integers.** A bucket label
  (`DAMNING|SUSPICIOUS|NEUTRAL|EXCULPATORY`) mapped to deltas + jitter in Python
  classifies far more reliably than a 4–8B model calibrates signed integers (the
  engine already overrides them with direction guards).
- **Closing can truncate.** Bump `closing`/`revised_closing` to ~480 tokens and put
  the delta keys first after the fence (they sit last today).
- **Temperature split.** ~0.5–0.6 for format/number-heavy calls (0.9 is hot).
- **Classifier robustness.** `<think>` is stripped at the client; confirm the
  `VERDICT:` key match is case-insensitive with enough budget to emit it.

**Households / personas (`data.py`, `prompts.py`)**
- **Severity dial is dead code.** `open_case` is always called with
  `severity="dramatic"` (`_build_docket_if_needed`). Re-expose `gentle` (the
  down-dial for couples/kids) and gate an `unhinged` up-dial (doubles as a replay
  lever).
- **Anonymize benign real names.** When `accused` parses as a personal name (not a
  role/pet/object), bias the docket toward a role ("The Roommate") in the record.
  (Harm is already scrubbed; this is the §14 *exposure* guard for safe names.)
- **Persona-flavored sentences + pet-welfare guard.**

**Flow & product (`app.py`, `render.py`)**
- **Quick Trial still hides the argument.** Opening statements surface as an
  `opening` scene on docket build, but a straight Fast Judgement jumps to paper
  without showing them. Consider a brief prosecutor/defense beat (or a "Court is
  deliberating…" gavel beat).
- **`?court=<id>` join is hollow** — it loads a placeholder, not the real case.
  Prefer a read-only shareable finished verdict, or cut the dead link.
- **Best-quote heuristic.** `_auto_best_quote` (longest line) is the fallback;
  prefer always keeping the model's `BEST_QUOTE`.
- **Replay hooks.** A one-tap "retry this crime — stricter/UNHINGED judge" + a
  "next petty crime?" nudge.

**Safety (`safety.py`)**
- **Intake blocklist tiers.** Split the offline list into a hard-danger tier and a
  soft tier routed to the classifier, and drop pure-hyperbole words ("dying",
  "threat", over-broad legal terms) that kill valid comedy. (The *output* scrub was
  already precision-tuned this way — ADR-0004 amendment.)
- **Fail-closed on classifier exception** (gentle INCOHERENT redirect) while still
  failing open on merely-unparseable output.

---

## Decisions — locked & shipped (2026-06-14)

1. **On-Space backend:** ZeroGPU local Qwen3-4B via `@spaces.GPU` — no CUDA / model
   load at import; generation wrapped in `@spaces.GPU(duration=…)`.
2. **Stepper:** dynamic timeline — mandatory anchors always shown, an optional
   scene's pip inserted only once it has happened (derived from trial state).
3. **Record source:** keep `wiz.events`, rename its `phase` tag → `scene`.
   `state.transcript` holds only court-role cards; the user's own bubbles and UI
   meta lines live only in `wiz.events`, and rendering from the engine record would
   drop them and force a `scene` onto frozen engine cards. (ADR-0006.)
4. **PNG render:** client-side capture of the existing `record_card` — no
   server-side Pillow/headless dependency.

---

## Out of scope / parked

- Multiplayer "join" beyond the current simulated `?court=` flow.
- The verdict math, Case File composition, and meter set (ADR-0001 / ADR-0005) —
  frozen.
- Replayability extras (daily Court Theme, witness pools) — nice-to-have,
  post-ship.
