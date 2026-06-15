# Conversation flow: one growing transcript, two materials

The wizard originally rendered each conversational scene as its own **screen**
with its own slice of the record: five `_glass_*` renderers (case / evidence /
witness / twist / plea), each filtering `wiz.events` by phase and re-injecting a
fresh intro. Walking `case → evidence → witness` *cleared* the visible chat each
time, optional scenes (witness, twist) behaved like mandatory stops, and two
overlapping records (`state.transcript` vs `wiz.events`) drifted because some
appends were untagged. Full design + diagnosis:
`docs/full-trial-conversation-flow.md`.

## Decision

The pre-verdict trial is **one conversation** rendered as a single growing glass
surface; scenes *append*, nothing is cleared. The court swaps to opaque **paper**
only for the two rulings. Two materials, two hard transitions:

- **Glass** (`render.glass_trial`) — the entire ordered transcript + composer +
  contextual action chips; and the appeal.
- **Paper** — `judgement`, `revisedJudgement`, `sentence`.

Concretely (UI/flow only — the verdict engine, `trial.py`, and the Case File,
[ADR-0005](./0005-trial-length-modes-and-case-file.md), are **frozen**):

- `wiz_phase` collapses to the **material**:
  `landing | join | trial | judgement | revisedJudgement | sentence`. A new
  `wiz.focus` (`case | evidence | witness | twist | plea`) carries the current
  scene and drives the composer placeholder + how a send is interpreted.
- `wiz.events` is the one ordered record, every append carrying a **`scene`** tag
  (renamed from `phase`); `_drain()` is the single seam that mirrors each engine
  `Card` into it. `state.transcript` stays the engine's court-only record (it has
  no user bubbles), so the UI renders from `wiz.events` — see the Phase-0
  record-source decision.
- Scenes are **moves**, legal given trial state, that enlarge the transcript and
  **stay in glass**; only **Deliver the Verdict** leaves for paper, and it is
  available **from the first message** (Fast Judgement). **Object!** is inline.
- Scene **dividers** and **stepper pips** are emitted only when the scene actually
  occurs; the stepper (`app._timeline`) is a dynamic timeline, not a fixed rail.

## Considered options

- **Keep per-phase screens:** the status quo — fragments the record, makes
  optional scenes feel mandatory, no single "what happened in court".
- **Render from `state.transcript`:** cleaner single source, but the engine record
  holds only court cards — it would drop every user bubble and force a `scene`
  field onto frozen engine cards. Rejected.
- **One transcript from `scene`-tagged `wiz.events` (chosen):** keeps the user's
  bubbles + UI meta, leaves the engine untouched, realises the interaction spec's
  "the message list grows" intent.

## Consequences

The glass shell now scrolls internally and is bottom-anchored for a long Full
Trial. The fix removed ~5 renderers and the `wiz_phase` cursor; continuity is
guarded by tests (transcript survives evidence→witness→twist; optional pips only
on occurrence; Object! stays in glass; only the verdict goes to paper; Quick
minimal path intact). Stepper, record source, and the (unrelated) PNG/ZeroGPU
Phase-0 decisions are recorded in `docs/remaining-work.md`.
