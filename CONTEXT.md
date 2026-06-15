# Tiny Court of Everyday Crimes

A comedy-courtroom Gradio app: the user submits a petty everyday grievance and
the app runs a short, theatrical, interactive trial. This glossary fixes the
domain language so prompts, UI copy, state, and code all use the same words.

## Language

### The case

**Complaint**:
The raw petty grievance the user submits ("my roommate keeps eating my yogurt").
This is the user's words, before the court touches it.
_Avoid_: grievance, case description, prompt, query.

**Charge**:
The absurd formal accusation the court derives from the Complaint ("Unauthorized
Dairy Appropriation"). A Case may carry a primary and secondary Charge.
_Avoid_: crime (reserve "crime" for the product name / casual framing only).

**Accused**:
The party blamed by the Complaint — a person, pet, object, or unknown suspect.
_Avoid_: defendant, suspect, perpetrator.

**Case**:
One complete trial instance: its docket, charges, accused, transcript, meters,
verdict, and sentence. Identified by a Case Title ("The People vs. The Yogurt
Vanisher").

### The trial

**Trial**:
The staged proceeding that moves the Case through fixed Phases. Runs in one of
two lengths: **Quick Trial** (default, ~60–90s) or **Full Trial** (power-user,
3–5 min).
_Avoid_: session, conversation, chat.

**Phase**:
A single scene in the Trial (Charges, Prosecution, Defense, Evidence, Witness,
Objection, Verdict, Sentence …). The user always knows which Phase they are in.
_Avoid_: step, stage, turn.

**Exhibit**:
A piece of evidence entered into the Trial, shown as an evidence card with a
label, relevance, and the court's ruling (admitted / rejected / admitted with
suspicion).
_Avoid_: attachment, item, proof.

**Witness**:
A summoned character (often an object or abstraction — The Spoon, Gravity) that
gives short **Testimony**. May be cross-examined or accused of bias.

**Objection**:
A user-triggered dramatic interruption the Judge then **Sustains** or
**Overrules**. A load-bearing interaction: a sustained objection lowers
Suspicion.
_Avoid_: protest, complaint (Complaint means the original grievance).

**Twist**:
A once-per-trial surprise complication that meaningfully swings the meters.

### The outcome

**Verdict**:
The court's ruling, resolved from trial state into one of three bands — **Not
Guilty**, **Guilty of a Lesser Pettiness**, **Guilty** — with a Confidence %.
_Avoid_: judgment, ruling (use "ruling" loosely in copy, not as the state term).

**Verdict Label**:
The case-specific comedic title the closing call writes for the Verdict
("Guilty of Reckless Paw Conduct"). Display dressing on cards/record/share; it
must agree with — and never replaces — the canonical band, which stays
rule-owned (docs/adr/0001). The stamp word always uses the band.

**Sentence**:
The harmless, funny, personalized punishment that follows a Verdict.
_Avoid_: penalty, punishment (in code/state).

**Court Record**:
The compact shareable artifact generated at the end (case title, charge,
verdict, sentence, best quote, court seal). The screenshot-worthy payoff.
_Avoid_: summary, result card, share image.

### Meters

**Suspicion** (0–100):
The primary load-bearing meter — how guilty the Accused *looks* (the vibes).
Interactions push it up or down; it is the largest driver of the Verdict, blended
with Evidence Weight and Petty Severity.

**Evidence Weight** (0–100):
How much the case can actually be *proven* (hard proof, not vibes). Opens at the
prosecution's circumstantial baseline; **Submit Evidence** builds it, a sustained
**Objection** tears it down. It blends into guilt alongside Suspicion *and* keys
the Verdict's **Confidence** (Evidence Weight × Dignity), so a high-suspicion /
low-evidence case returns a guilty-feeling verdict the court can't actually prove
("Guilty. Confidence: 19%."). See `docs/trial-meters-brainstorm.md` (Config B).

**Petty Severity** (0–100):
How dramatically serious the (absurd) Charge is. Set at intake from the
Complaint, nudged by Twists; raises the Verdict baseline and shapes Sentence
intensity.

**Courtroom Dignity** (0–100):
Starts at 100 and falls as the court descends into absurdity. Does **not** change
guilt — together with Evidence Weight it scales the Verdict's Confidence (a court
that let a spoon testify cannot claim certainty).

**Mercy** (0–100):
Starts at 0 and rises when a leniency Plea lands. Like Dignity, it does **not**
change guilt — it softens only the **Sentence** (the accused stays just as guilty,
but the hammer falls more gently). This keeps "did they do it" (the band) separate
from "how hard is the punishment" (the sentence). See
`docs/trial-meters-brainstorm.md` (Config A).

**Patience** — "His Honor's Last Nerve" (0–100):
Starts at 100 and falls as the court sits through chatter, evidence, and
objections. It does **not** touch the verdict — it paces the trial: when it hits 0
the court declines further idle chatter and calls for the ruling (a gentle,
in-character anti-stall). See `docs/trial-meters-brainstorm.md` (Config D).

**Case File** — Means / Motive / Opportunity (0–100 each):
The three legs Suspicion decomposes into in a **Full Trial** only. **Means** (could
they have done it — the how), **Motive** (did they want to — the why), and
**Opportunity** (were they positioned to — the when/where). The Witness establishes
Motive and Opportunity; cross-examination shakes them; a Twist can swing any leg.
In a Full Trial **Suspicion is recomposed as the mean of the three legs**, so the
headline bar is provably the sum of its parts. In a Quick Trial the legs stay 0 and
Suspicion moves directly — the dense decomposition never clutters the default path.
The verdict band math is unchanged either way: only how Suspicion is *sourced*
differs. See `docs/adr/0005` and `docs/trial-meters-brainstorm.md` (Config C).

### Roles

The transcript speaks through fixed, visually distinct roles, each its own card:
**Judge**, **Prosecutor**, **Defense**, **Witness**, **Bailiff**, **Court Clerk**.
