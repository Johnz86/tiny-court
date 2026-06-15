# Trial Meters — Brainstorm & Refinement

*A creative pass on the courtroom "meters": what we measure, what it could be, and
which measurements are more genuinely **court / crime / case / judgement** shaped.
This is a thinking document — no code, no commitment. It proposes; `trial.py` still
decides if/when anything lands.*

---

## 1. Where we are, and the hidden gap

The current engine (`trial.py`) tracks **three** meters, each doing a distinct job:

| Meter | Range | Mechanical role |
|---|---|---|
| **Suspicion** | 0–100 | Dominates the verdict (0.70 weight) — *"did they do it?"* |
| **Petty Severity** | 0–100 | Raises the guilt baseline (0.30 weight) **and** shapes the sentence — *"how bad was it?"* |
| **Courtroom Dignity** | 100→0 | Only scales **Confidence**, never guilt — *"how seriously do we take this ruling?"* |

`GuiltScore = 0.70·Suspicion + 0.30·Severity` → band; `Confidence = depth × (Dignity/100)`.

This triad is actually well-chosen — it maps cleanly onto the three questions a real verdict
answers: **did they do it / how bad is it / how sure are we.** That's the bar any new meter has to
clear: *does it answer a question the triad doesn't already answer?*

Three honest gaps the current set leaves open:

1. **There is no sentencing axis.** Sentence harshness is implicit — it falls out of Severity and
   whatever the closing model decides. A *plea for mercy* pushes Suspicion down (a hack — mercy
   isn't really about guilt) because there's nowhere else for it to go. **Mercy / leniency has no
   home.**
2. **Suspicion is a black box.** "Did they do it" is one number, but a trial gets there through
   *motive, opportunity, and evidence* — three things the user manipulates separately (Object!
   attacks evidence; a Twist invents motive). Collapsing them hides *why* the needle moved, which
   the flow review already flagged as the product's biggest legibility gap.
3. **Severity is overloaded.** It both raises guilt and shapes the sentence — two jobs that should
   be able to diverge (a *trivial* crime committed with *malice* is funny precisely because
   severity-low meets intent-high).

So the brainstorm isn't "more meters for flavor." It's: **what dimensions would let interactions
land somewhere legible, give the sentence its own axis, and stay funny.**

---

## 2. Design criteria for a *good* meter

Before listing candidates — a meter earns its place only if it does most of these:

- **Moves visibly on a verb.** Object! / Evidence / Plea / Twist must each light up a specific
  meter. A meter nothing moves is dead weight.
- **Does mechanical work.** Feeds the verdict, scales confidence, shapes the sentence, or gates an
  interaction. (A pure-flavor score is fine too — but label it as such.)
- **Is distinct.** Not a re-skin of Suspicion. Different verbs should push it.
- **Is theatrical & on-brand.** Absurdly official, never clinical. A meter is also a *joke*.
- **Stays legible at a glance.** ≤ ~4 load-bearing meters on screen; more become noise.

I'll tag each candidate below with its likely **role**:
🟥 verdict driver · 🟦 confidence · 🟩 sentence shaper · 🟧 charge shaper · ⚙️ interaction gate ·
🎭 pure flavor.

---

## 3. The brainstorm bank

Grouped by the four questions a trial answers.

### A. "Did they do it?" — the case against (verdict drivers)

- **Suspicion** 🟥 *(existing)* — overall likelihood of guilt.
- **Motive — "Means, Motive & Munchies"** 🟥 — did the accused *want* to? (The snack was beloved;
  the couch was contested.) A Twist or a damning complaint spikes it.
- **Opportunity — "Scene-of-the-Crime Proximity"** 🟥 — were they *there*? Spoon proximity, fridge
  loitering, paw at the scene. Witnesses and alibis move it.
- **Evidence Weight — "Exhibit Gravity"** 🟥🟦 — *hard* proof vs vibes. Submit Evidence raises it;
  a sustained Objection guts it. Distinct from Suspicion: you can be very suspicious on flimsy
  evidence — and the *gap between them* is comedy gold ("the court is 90% suspicious and 4%
  certain").
- **Reasonable Doubt — "Benefit of the Doubt"** 🟥 — the defense's mirror of Suspicion. Frames the
  same axis for the accused so Object!/Plea have something that *goes up* for them (meters that
  only ever fall feel punishing).
- **Alibi Integrity** 🟥 — how well the "I was at the blender" story holds. Cross-examination
  cracks it.

### B. "How bad was it?" — the nature of the crime (charge & sentence shapers)

- **Petty Severity** 🟧🟩 *(existing)* — gravity of the offence.
- **Pettiness Index — "Beneath the Dignity of the Court"** 🟧🎭 — the *inverse* comedic axis: how
  gloriously trivial this is. High pettiness could *lower* the band but *raise* the theatrical
  stakes (the court takes the smallest crimes most seriously). A nice tension knob.
- **Premeditation / Malice — "Mens Rea-ish"** 🟧🟩 — accident vs deliberate. A knocked-over coffee
  is innocent chaos; *sitting calmly beside it* is premeditation. Shapes the *charge name* and the
  sentence more than guilt.
- **Sacredness of the Violated — "Snack Sanctity"** 🟧🟩 — how holy was the thing wronged? A
  birthday cake > a generic yogurt > a sock. Scales the charge's drama and the sentence's
  restitution.
- **Recidivism — "The Rap Sheet"** 🟩 — is this a repeat offender? ("He's done this with the
  hummus too.") Hardens the sentence, never guilt.

### C. "Who got hurt / who's watching?" — the parties & the gallery (social axis)

- **Emotional Damages — "Heartbreak Index"** 🟩🎭 — the complainant's suffering. Drives the
  *restitution* side of the sentence (an apology, a replacement snack) independent of guilt.
- **Petty Grudge / Overreaction — "Vendetta Level"** 🟦🎭 — is the *complainant* being dramatic?
  A high grudge could quietly *lower* confidence or invite the court to scold both parties — a
  built-in "are you sure this is a crime?" check that fits the safety/"ceremonial apology" tone.
- **Defendant Remorse — "Contrition Gauge"** 🟩 — sorry vs smug. A leniency plea fills it; it
  softens the sentence. *This is where pleas should actually land.*
- **Public Sympathy / Gallery Mood — "Gasp-o-meter"** 🎭⚙️ — the crowd. Pure theatre, but could
  gate a "the gallery demands a Twist" beat.

### D. "How sure, how harsh, how dignified?" — the court & the outcome

- **Courtroom Dignity** 🟦 *(existing)* — decorum; scales confidence.
- **Chaos / Drama Level — "Theatricality"** 🎭⚙️ — the *positive* face of falling dignity. Tracks
  entertainment; at max could unlock an "unhinged" closing or a surprise-witness twist. Lets the
  same fall (decorum ↓) read as a *gain* (show ↑).
- **Judge's Patience — "His Honor's Last Nerve"** ⚙️🟦 — depletes with every objection/chatter.
  Hits zero → the judge cuts to the verdict ("The court has *heard enough*"). A natural,
  in-character **pacing/anti-stall mechanic** and a soft cap on infinite interactions.
- **Judge's Lean / Bias — "Bench Mood"** 🟥🟦 — a hidden or visible tilt toward prosecution/defense
  that day (a hungry judge is harsh on snack crimes). Adds replay variance; risky if too swingy.
- **Mercy / Clemency — "Bench Clemency"** 🟩 — the missing sentencing axis. Separates *guilty* from
  *how hard the hammer falls.* Pleas, remorse, and a sympathetic story raise it; it can't change
  the verdict (you're still guilty) but it turns "label every snack for a month" into "write one
  kind fridge note." **The single most justified addition.**
- **Confidence / Certainty** 🟦 *(derived, existing)* — keep as output, not an input meter.

### E. Wildcards & callbacks

- **Vibe Check** 🎭 — a callback to the empty-input copy ("the court cannot prosecute vibes
  alone"). Mostly a joke meter, but charming on the share card.
- **Contempt of Court** ⚙️ — accrues when the *user* spams or argues; at max, a comedic "fine"
  (a cosmetic stamp), never a real penalty.
- **Karmic Balance** 🎭 — a cosmic ledger across the *session* ("the universe owes you one"),
  flavor for replay.

---

## 4. Refinement — what survives the criteria

Scoring the bank against §2 (does it move on a verb / do work / stay distinct / stay funny):

**Keep & promote (earn real mechanical work):**

- **Mercy / Clemency** 🟩 — fills the genuine sentencing gap; gives pleas an honest home instead of
  the current "push Suspicion down" hack.
- **Evidence Weight** 🟥🟦 — separates "suspicious" from "proven," makes Object!/Evidence land on
  *different* meters, and the Suspicion-vs-Evidence gap is inherently funny.
- **Judge's Patience** ⚙️ — solves the "infinite interactions / when does it end" pacing problem
  *in character*, which no current meter does.
- **Drama / Chaos** 🎭⚙️ — reframes falling Dignity as a *gain*, and can gate the "unhinged"
  content the dead severity knob was meant to unlock.

**Keep as flavor / share-card only (no verdict math):**

- Emotional Damages, Sacredness of the Violated, Recidivism, Vibe Check — great on the **court
  record** and for shaping *sentence prose*, but they shouldn't touch the band (keeps the engine
  legible and unit-testable).

**Decompose only if you want legibility over simplicity:**

- Motive / Opportunity / Reasonable Doubt are *components of* Suspicion. Splitting them makes "why
  did the needle move" visible (Object! → Evidence ↓; Twist → Motive ↑) but risks meter overload.
  Best as an **optional "case file" expansion**, not the default.

**Park (too swingy / not distinct / not legible):**

- Judge's Bias (fun but can make verdicts feel arbitrary), Public Sympathy, Karmic Balance,
  Contempt — lovely as one-off animated beats, weak as persistent meters.

---

## 5. Four concrete configurations

Rather than one answer, here are coherent *sets* at different ambition levels. Each keeps the
non-negotiable rule from `trial.py`: **only some meters touch guilt; the verdict stays
Python-owned and testable.**

### Config A — "Minimal fix" (recommended starting point)
Keep the triad, add **one** meter that closes the real gap.

> **Suspicion** 🟥 · **Petty Severity** 🟧🟩 · **Courtroom Dignity** 🟦 · **+ Mercy** 🟩

- Mercy is raised by pleas/remorse, lowered by smugness/recidivism. It **never changes the band** —
  it scales *sentence harshness only*. Pleas finally land somewhere honest, and the
  guilty-but-forgiven outcome becomes expressible.
- Lowest risk: the verdict math is untouched; one new axis, clearly a *sentencing* axis.

### Config B — "Vibes vs Proof"
Make the courtroom's favourite joke mechanical.

> **Suspicion** 🟥 · **Evidence Weight** 🟥🟦 · **Petty Severity** 🟧🟩 · **Courtroom Dignity** 🟦

- Guilt now blends *suspicion* (vibes) with *evidence* (proof); **Confidence keys off Evidence
  Weight × Dignity** instead of Dignity alone. A high-suspicion / low-evidence case yields a
  guilty-feeling verdict the court openly admits it can't *prove* — peak comedy.
- Object! attacks Evidence; Submit Evidence raises it; they stop fighting over the same bar.

### Config C — "The Case File" (full decomposition, power-user / Full Trial)
Turn the verdict black box into a visible dossier.

> **Means · Motive · Opportunity** (→ compose into Suspicion 🟥) · **Severity** 🟧🟩 ·
> **Dignity** 🟦 · **Mercy** 🟩

- Each interaction lights up a *named* component ("your Twist established **Motive**; the verdict
  shifts"). Maximum legibility — directly addresses the "consequence is invisible" finding — at
  the cost of more on-screen meters. Best reserved for **Full Trial**, with Config A shown in
  Quick Trial.

### Config D — "Living Courtroom" (situational layer, orthogonal to the above)
Add non-verdict meters that govern *tempo and tone*, not guilt.

> **Judge's Patience** ⚙️ (depletes → forces the verdict) ·
> **Drama / Chaos** 🎭⚙️ (rises → unlocks an unhinged beat)

- These pair with *any* of A–C. Patience gives the trial a natural, in-character end (great for the
  ~60–90s Quick Trial pacing target) and Chaos turns "dignity collapsing" into an earned
  spectacle.

---

## 6. Recommendation & open questions

**Recommendation:** ship **Config A** (add **Mercy**) first — it fixes the one real *structural*
gap (no sentencing axis) with near-zero risk to the verdict math, and it gives the Plea verb an
honest home. Then, *if* the meters get rendered (the bigger product win), layer in **Evidence
Weight** (Config B) for the vibes-vs-proof joke, and reserve the full **Case File** (Config C) for
Full Trial. **Judge's Patience** (Config D) is worth it independently as a pacing mechanic.

> **Status — shipped.** Config A (the **Mercy** meter) is implemented: `trial.py` carries a
> fourth `mercy` meter that never touches the band (verified by test), a leniency plea now raises
> Mercy instead of hacking Suspicion down (`engine.py` `submit_plea`), and the closing prompt
> softens the sentence as Mercy rises. The prerequisite "render the meters" landed alongside it —
> all four meters now show as labelled bars on the ruling/record cards (`render.py meters_strip` +
> `courtroom.css`), and the **revised** card shows signed ▲/▼ delta badges so a plea's effect on
> the needle is legible (the "make consequence visible" review headline). Verified by the unit
> suite and a real-model end-to-end run.
>
> **Update — also shipped.** The deferred *evidence/objection delta badges on the first judgement*
> are now in (the docket build snapshots a "charges filed" baseline; the first verdict shows the
> movement the user's evidence caused, e.g. Suspicion ▲18). And **Config D (Judge's Patience)** is
> implemented: a fifth meter that depletes with chatter/evidence/objections, renders in the strip,
> and — when spent — has the court decline further idle chatter and call for the ruling (a gentle
> anti-stall). Patience, like Dignity and Mercy, never touches the verdict band (test-pinned).
>
> **Update — also shipped.** **Config B (Evidence Weight)** is now in. A sixth meter, `evidence_weight`,
> opens at the prosecution's circumstantial baseline (~40 at intake); **Submit Evidence** builds it and a
> **sustained Objection** tears it down. Guilt is now `0.55·Suspicion + 0.25·EvidenceWeight + 0.20·PettySeverity`,
> and **Confidence keys off Evidence Weight × Dignity** — so a high-suspicion / low-evidence case returns a
> guilty-feeling verdict the court openly can't prove. Object! and Submit Evidence stop fighting over the
> Suspicion bar: they move proof, not vibes (`engine.py`, with direction guards). The strip now renders six
> meters on one line (`render.py` + `courtroom.css`). Verified by the verdict/engine unit suites and a
> real-model end-to-end run. See `docs/adr/0001`.
>
> **Update — Config C shipped.** The **Means/Motive/Opportunity Case File** now backs the **Full Trial**.
> `TrialState.length` (`quick|full`) gates it: in a Full Trial, interactions route into the three legs and
> **Suspicion is recomposed as their mean** (`engine._apply_meters` + `trial.compose_suspicion`), shown as a
> captioned sub-strip beneath the meters (`render.case_file_strip`). The legs move *distinctly* via three new
> Full-Trial phases — **Witness** (`call_witness`, lights Motive + Opportunity), **cross-examination**
> (`cross_examine`, shakes them), and a once-per-trial **Twist** (`add_twist`, swings any leg ± and reshapes
> Severity). The verdict band math (ADR-0001) is untouched — only how Suspicion is *sourced* changes — and the
> Quick Trial keeps the Case File empty (test-pinned). See `docs/adr/0005`.
>
> **All four configs (A Mercy · B Evidence Weight · C Case File · D Patience) are now shipped.**

The richest, most "court-shaped" reframe underneath all of this: stop computing one blended
GuiltScore and instead let three *separate* questions own separate inputs —

- **Did they do it?** ← Suspicion / (Motive · Opportunity · Evidence) → the **band**
- **How sure are we?** ← Evidence Weight × Dignity → the **confidence**
- **How hard does the hammer fall?** ← Severity − Mercy (+ Recidivism, + Sacredness) → the
  **sentence**

That decomposition is what makes the meters feel like a real *case file* rather than a single
guilt slider wearing three hats.

**Open questions to resolve before any of this is built:**
1. Are meters even *visible* yet? (Per the prior review they're computed but unrendered.) New
   meters are pointless until the existing ones are on screen — **render first, expand second.**
2. Quick vs Full split: how many meters can Quick Trial show before it stops being glanceable? (Gut
   feel: 3, maybe 4.)
3. Should any new meter be allowed to flip the *band*, or only the *sentence/confidence*? Keeping
   guilt driven by a small, fixed set protects the engine's testability (a core ADR-0001 value).
4. Do we want a meter that can move *up for the defense* (Reasonable Doubt / Mercy), so interactions
   aren't all one-directional doom? (Probably yes — it makes Object!/Plea feel rewarding.)
