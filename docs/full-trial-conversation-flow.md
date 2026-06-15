# Full Trial conversation flow — one growing transcript

> **Status: ✅ implemented (2026-06-14).** This was the design pass; the refactor
> it proposes has shipped. The build now renders the pre-verdict trial as one
> growing glass transcript (`render.glass_trial`) with `scene`-tagged
> `wiz.events`, scene dividers, a dynamic-timeline stepper, inline Object!, and
> Fast Judgement from the first message; only the verdict/sentence are paper. The
> engine (`trial.py`, verdict math) was not touched. This doc is kept as the
> authoritative record of the model and the decisions behind it; §10 records what
> was settled. Reflected in `docs/single-page-wizard-interaction.md` and
> design-spec §11.2.

*A design pass on how the Full Trial (and Quick Trial) should sequence its
scenes. The earlier build fragmented the conversation into per-phase screens that
cleared between steps and forced a fixed linear march. This doc diagnoses that,
states the model it should have, fixes the mandatory/optional grammar, and lays
out the concrete refactor. It proposed; the engine (`trial.py`, verdict math) was
not in scope and did not move.*

---

## 1. The problem (what the code does today)

The wizard treats every conversational scene as its own **screen** with its own
**slice** of the conversation and its own **intro**:

- `render.py` has five glass renderers — `_glass_case`, `_glass_evidence`,
  `_glass_witness`, `_glass_twist`, `_glass_plea` — and each filters
  `wiz.events` by `phase` and shows only that slice (capped at the last 5–6):
  - case → `phase == "case"`
  - evidence → `phase not in ("case", "plea")`
  - witness → `phase == "witness"`
  - twist → `phase == "twist"`
  - plea → `phase == "plea"`
- Each renderer re-injects a fresh framing bubble ("File the complaint…",
  "Add one useful detail…", "The witness is sworn in…", "A twist!…", the Judge's
  plea prompt) as the first message.

The consequences the user reported:

1. **The conversation resets between steps.** Walking `case → evidence → witness`
   replaces the visible chat each time: the complaint and the court's reaction to
   it vanish when evidence opens; the evidence exchange vanishes when the witness
   is called. There is no single record of "what happened in court".
2. **Steps are hardcoded and forced.** `wiz.wiz_phase` is a single linear cursor;
   each glass phase has one "primary" that *navigates* to the next phase. Witness
   and Twist behave like mandatory stops rather than things that happen *if the
   user makes them happen*.
3. **The model is doubled and inconsistent.** The engine keeps a continuous
   `state.transcript` (role/text `Card`s: Bailiff, Prosecutor, Defense, Judge,
   Witness, Court Clerk). The wizard separately keeps `wiz.events` (dicts with
   `who/text/phase`), and some handlers append events **without** a `phase` tag
   (e.g. `ask_judge`, the spectator votes), so the filters above catch them by
   accident. Two overlapping records, one of them only partially tagged.

The original design did not ask for this. `docs/single-page-wizard-interaction.md`
("Active Interaction Surface") already says the surface is **two materials** —
glass for talking, paper for ruling — and that on the glass shell *"the message
list grows to fill, anchored to the bottom so the conversation hugs the composer
and grows upward."* One growing list. The fragmentation crept in when the wizard
gained phases.

---

## 2. The model it should have

> There is **one conversation** for the whole pre-verdict trial. Scenes *append*
> to it; nothing is cleared. The court only swaps to **paper** for the two things
> that are rulings, not talk: the **Judgement** and the **Sentence/Record**.

Two materials, only two hard transitions:

| Material | What it is | Phases |
|---|---|---|
| **Glass** (chat) | the growing transcript + composer + contextual action chips | the entire trial up to the verdict; and the appeal, if any |
| **Paper** (card) | an opaque printed ruling that *replaces* the glass | `judgement`, `revisedJudgement`, `sentence` |

"Phases" stop being five separate glass screens. There is a single **Trial**
glass surface. What changes from moment to moment is not the screen but the
**focus**: the composer placeholder and the offered action chips reflect what the
court is doing *now* (filing, weighing evidence, examining a witness, reacting to
a twist), while the message history stays whole behind it.

---

## 3. The trial grammar — mandatory vs optional

A trial is a small grammar of scenes, not a fixed playlist. **A scene is "reached"
when its content actually happens** — the stepper and transcript reflect what
occurred, not a pre-ordained agenda.

### Mandatory (every session has these)

- **Complaint** — the user must describe *something*; this is intake. (`case`)
- **Opening** — charges filed + one prosecution + one defense beat. In Quick this
  is folded into the docket build; in Full it is its own visible exchange.
- **Verdict** — the paper judgement. Always happens (it is the payoff).
- **Sentence / Record** — the paper outcome. Always happens.

### Optional / contingent (happen only if invoked)

| Scene | Mode | Cardinality | Trigger |
|---|---|---|---|
| **Evidence** (submit an exhibit) | Quick + Full | repeatable | composer send / "Submit Evidence" |
| **Witness** (summon + testimony) | Full | once (maybe a few) | "Call Witness" |
| **Cross-examination** | Full | repeatable *while a witness stands* | composer send / "Cross-examine" |
| **Objection** | Full (and Quick via plea) | limited (≈once) | "Object!" |
| **Twist** | Full | **once** (`twist_used`) | "Add Twist" |
| **Appeal / Plea** | Quick + Full | limited rounds (`plea_rounds < 2`) | "Appeal" from the judgement |

So the minimal Quick path is `Complaint → Verdict → Sentence`, and a fully played
Full path is `Complaint → Opening → {Evidence, Witness+Cross, Twist, Objection}* →
Verdict → Appeal? → Sentence`. The optional scenes are **moves**, available when
the trial state allows them, that append to the one transcript — never detours
that wipe it.

### The single forward affordance — always available

At any point in the glass trial there is exactly one terminal action that leaves
the conversation: **"Ask the Judge" / "Deliver the Verdict"** → paper. Everything
else (evidence, witness, cross, objection, twist) keeps the user in the glass
flow and *enlarges* it. This is the fix for "some steps lead to the next step":
only the verdict does.

Crucially this terminal action is **available from the very first moment** — a
bored or impatient user (or a hackathon judge) can demand the ruling immediately,
straight after the complaint, without touching evidence/witness/twist. Fast
Judgement is not a separate mode; it is just *taking the one forward affordance
early*. The optional scenes never gate it.

### Optional scenes (and their dividers) often simply do not happen

Because the scenes are moves, **most sessions will not contain most scenes** — a
quick session has no Witness, no Twist, maybe no Evidence. Their dividers,
stepper pips, and intro cards must therefore be **emitted only when the scene
actually occurs**; a Twist divider in a session with no twist is a bug, not an
empty placeholder. The transcript and stepper are a record of what happened, not
a checklist of what could have.

---

## 4. Rendering — one surface, scene dividers, focus

Replace the five `_glass_*` renderers with **one** `glass_trial(state, events,
*, actions, focus)` that renders the **entire** ordered conversation as a
continuous bubble stream (no `phase` filter, no per-call cap — the shell already
scrolls internally and is bottom-anchored).

To keep a long flow legible, scenes are separated by a light **scene divider**
rather than by clearing — a thin centered rule with a label:

```
———————————  Evidence  ———————————
———————————  The Witness  ———————————
———————————  Twist!  ———————————
———————————  Appeal  ———————————
```

The framing/intro line for a scene ("Add one useful detail…", "The witness is
sworn in…") is appended to the flow **once**, when the scene opens — it becomes a
normal court message in the record, not a header that re-renders every turn.

The composer placeholder and the reply chips are driven by the current **focus**
(see §6), but they sit beneath the same unbroken transcript.

Paper is unchanged: `judgement_card` and `record_card` still replace the surface
for `judgement / revisedJudgement / sentence`.

---

## 5. State model — collapse the cursor, unify the record

Two changes, both UI-only (engine untouched):

1. **One ordered conversation record.** Render the glass flow from a single
   ordered list. Two viable sources:
   - **(preferred)** keep appending to `wiz.events`, but render *all* of it in
     order and **require every append to carry a `scene` tag** (case | opening |
     evidence | witness | twist | objection | appeal). Drop the `phase`-filter
     reads. The inconsistent untagged appends get fixed as part of this.
   - or render directly from `state.transcript` (already continuous) and stop
     maintaining a parallel `wiz.events` for display. This is cleaner long-term
     but touches more handlers; the engine cards would need a `scene` too.
2. **`wiz_phase` shrinks to the material, not the scene.** It collapses to:
   `landing | join | trial | judgement | revisedJudgement | sentence`. The
   former `case/evidence/witness/twist/plea` glass phases all map to `trial`.
   A new `wiz.focus` (or derive it from trial state) carries "what the court is
   doing now" for the placeholder + chips. The stepper is derived from trial
   state (§7), not from a phase index.

---

## 6. Action grammar — what is offered, and when

In the glass `trial`, `_actions_for` stops switching on `wiz_phase` and instead
offers the **moves currently legal given trial state** plus the terminal verdict:

- **Submit Evidence** — always (repeatable).
- **Call Witness** — Full Trial, while no witness stands (or to summon another).
- **Cross-examine** — Full Trial, only while a witness stands.
- **Object!** — when there is a statement on the record to object to; inline
  (appends the Defense/Judge exchange to the flow, **stays** in glass) — *not* a
  jump into the plea screen, which is today's surprising behaviour.
- **Add Twist** — Full Trial, while `not twist_used`.
- **Ask the Judge / Deliver the Verdict** — the one terminal → paper.

Each move calls its existing engine function (`submit_evidence`, `call_witness`,
`cross_examine`, `raise_objection`, `add_twist`) and appends the resulting cards
to the one transcript with the right `scene` tag. Composer sends are interpreted
by the current focus (a detail during evidence, a question during cross, a
reaction during a twist) — but always land in the same flow.

---

## 7. Stepper — a timeline of what happened

The stepper should show **progress through the ritual**, with optional scenes
reflecting reality. Two candidate designs:

- **(A) Fixed rail, honest "done".** Keep `Case · Evidence · [Witness · Twist] ·
  Judgement · Plea · Sentence`, but an optional step only lights "done" when it
  actually occurred (already half-done: `evidence_done`, `witness_done`,
  `twist_done`). Simple; but it always *shows* Witness/Twist even in a session
  that never used them, implying they were skipped.
- **(B) Dynamic timeline (recommended).** Always show the mandatory anchors
  (`Case · … · Verdict · Sentence`); **insert** an optional scene's chip only
  once it has happened. The stepper then reads as a true record of this trial:
  a session with no witness simply has no Witness pip. The "current focus" is the
  rightmost live anchor; a persistent terminal **Verdict** pip signals where the
  flow is heading.

Recommendation: **(B)**, deriving the step list from trial state
(`exhibits`, witness cards, `twist_used`, `plea_rounds`, verdict reached). It
matches the "steps move if the content actually happens" requirement directly.

---

## 8. The appeal is the one post-paper return to glass

Plea/Appeal is special: it happens **after** the verdict, as an appeal against the
paper ruling. So the flow is `judgement (paper) → Appeal → glass → revised
judgement (paper)`. The appeal conversation should **append to the same
transcript** under an "— Appeal —" divider (continuous record), then resolve back
to paper. `plea_rounds` still caps it. This keeps the "one conversation" promise
even across the paper interlude.

---

## 9. Implementation plan (UI/flow only — engine frozen)

1. **`render.py`** — add `glass_trial(...)` rendering the full ordered flow with
   `scene_divider(label)`; delete the five `_glass_*` slice/intro renderers (or
   reduce them to scene-opening helpers that append one card).
2. **`app.py`** —
   - Collapse `GLASS_PHASES` and the `case/evidence/witness/twist/plea` branches
     of `_surface` into a single `trial` surface returning `glass_trial`.
   - Make every `do_send` / `do_action_by_id` append to the one flow with a
     `scene` tag; remove the `phase`-based slicing assumptions.
   - Rewrite `_actions_for` to offer state-legal moves + the terminal verdict
     (§6); make Object! inline.
   - Drive the stepper from trial state (§7).
3. **`tinycourt/static/courtroom.css`** — a `.scene-divider` style; confirm the
   glass shell's internal scroll + bottom-anchor hold for a long transcript (the
   shell already stretches full height — see interaction doc).
4. **Tests** — replace per-phase-slice assumptions; assert (a) the transcript is
   continuous across evidence→witness→twist (earlier messages still present),
   (b) optional scenes only advance the stepper when they occur, (c) Object! stays
   in glass, (d) only the verdict leaves glass for paper, (e) Quick Trial minimal
   path still `Complaint → Verdict → Sentence`.
5. **Docs** — fold the outcome into `docs/single-page-wizard-interaction.md`
   (this realises its "message list grows" intent for the Full Trial) and note it
   in `docs/design-spec.md` §11.2.

This is a render/flow refactor: `engine.py`, `trial.py`, the verdict math
(ADR-0001), and the Case File composition (ADR-0005) are all untouched.

---

## 10. Open questions

### Settled (2026-06-14)

- **Stepper design** → ✅ **(B) dynamic timeline.** Derive the step list from
  trial state; insert optional pips only once the scene happens.
- **Record source** → ✅ **`scene`-tagged `wiz.events`** (not `state.transcript`).
  `state.transcript` holds only court-role cards; the user's own bubbles and UI
  meta lines live only in `wiz.events`, and rendering from the engine record would
  drop them and force a `scene` field onto frozen engine cards. Retag
  `phase`→`scene`, fix untagged appends, render the whole list in order.

### Still to settle (during build)

1. **Opening statements**: auto-play on entering the trial, or appear on the
   first action? (Today `play_arguments` runs inside the docket build.)
2. **Scene ordering**: free order (evidence/witness/twist any time) or gated
   (e.g. a twist only after a witness)? Free is simpler and more playful.
3. **Witness cardinality**: exactly one, or may the court call several?
4. **Appeal transcript**: continuous (one flow, "— Appeal —" divider) vs a
   separate appeal sub-thread.
5. **Long-flow legibility**: dividers + internal scroll only, or also a subtle
   "jump to latest" / fade at the top edge?
