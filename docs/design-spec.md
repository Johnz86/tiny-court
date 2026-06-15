# Design Specification: Tiny Court of Everyday Crimes

## 1. Product Concept

**Tiny Court of Everyday Crimes** is an interactive comedy courtroom where users put small, ridiculous, everyday conflicts on trial.

The user submits a petty “crime,” such as:

* “My roommate keeps eating my yogurt.”
* “My cat knocked my glass off the table and looked proud.”
* “My coworker microwaved fish in the office kitchen.”
* “My plant died even though I said encouraging things to it.”
* “My washing machine stole one sock.”

The app turns the complaint into a short, structured courtroom experience with charges, evidence, witnesses, objections, arguments, a verdict, and a final ridiculous sentence.

The goal is not to give real legal advice. The goal is to create a delightful, replayable, shareable mini-game.

---

## 2. Core User Promise

The user expects the app to feel like:

> “Ace Attorney for stupid everyday problems.”

The experience should be fast, funny, and interactive. The user should not feel like they are chatting with a normal assistant. They should feel like they entered a tiny theatrical court system that takes their petty complaint absurdly seriously.

---

## 3. Target User

The primary user is someone who wants a quick, funny AI experience they can show to friends.

Typical users:

* hackathon judges trying many apps quickly,
* people sharing funny prompts with friends,
* social media users looking for a funny generated result,
* casual players who enjoy absurd interactive fiction,
* people who want to turn minor annoyances into comedy.

The app should work even if the user gives only one sentence.

---

## 4. Tone and Style

The tone should be:

* theatrical,
* witty,
* dramatic,
* slightly bureaucratic,
* emotionally exaggerated,
* never mean-spirited,
* never actually legalistic in a serious way.

The court should treat tiny problems with absurd seriousness.

Example tone:

> “The Court recognizes the gravity of the missing yogurt. Dairy theft, while not legally actionable in this jurisdiction of nonsense, is morally suspicious.”

The app should avoid:

* real legal claims,
* aggressive insults,
* sensitive personal judgments,
* long walls of text,
* generic chatbot answers.

---

## 5. Main User Flow

### Step 1: Landing Screen

The user arrives at a stylized courtroom interface.

The top of the page should immediately explain the concept:

**Tiny Court of Everyday Crimes**
*Put your petty household disputes, snack thefts, suspicious pet behavior, and minor social crimes on trial.*

The landing screen should include:

* a short input box,
* several example complaint buttons,
* a large “Open Court” button,
* a visual court docket area,
* a note that this is a comedy experience, not legal advice.

Example complaint buttons:

* “My cat knocked over my coffee.”
* “My roommate ate my leftovers.”
* “My printer jammed when I needed it most.”
* “My friend said ‘I’m five minutes away’ and arrived in thirty.”
* “My laundry produced only one sock.”

### Step 2: Complaint Intake

The user enters the petty crime.

Input label:

**What crime shall the court hear today?**

Placeholder:

> “Example: My roommate keeps eating my yogurt and pretending it was a misunderstanding.”

Optional intake fields may include:

* accused party: roommate, cat, printer, sibling, coworker, object, unknown suspect,
* desired severity: gentle, dramatic, unhinged but friendly,
* trial length: quick trial, full trial,
* evidence available: yes / no.

The app should not require these fields. They should enhance the experience but not block it.

### Step 3: Case Creation

After clicking **Open Court**, the app creates a case file.

The first output should be a compact “Court Docket” card:

**Case Title:** The People vs. The Yogurt Vanisher
**Charge:** Unauthorized Dairy Appropriation
**Severity:** Petty but Emotionally Significant
**Court Mood:** Gravely unserious
**Presiding Judge:** The Honorable Crumbwell

The app should then show a button:

**Begin Trial**

This gives the user a moment of anticipation instead of immediately dumping the full output.

---

## 6. Trial Structure

The trial should be divided into clear phases. Each phase should feel like a scene in a mini-game.

Recommended phases:

1. Opening of Court
2. Charges
3. Prosecution Statement
4. Defense Statement
5. Evidence Submission
6. Witness Testimony
7. Objection Round
8. Closing Arguments
9. Verdict
10. Sentence
11. Shareable Court Record

The user should always understand where they are in the trial.

A progress indicator should show:

**Intake → Charges → Evidence → Witness → Objection → Verdict → Sentence**

---

## 7. Screen Layout

The Gradio app should avoid looking like a plain chatbot.

Recommended layout:

### Left Panel: Court Controls

Contains:

* current phase,
* action buttons,
* evidence cards,
* trial settings,
* restart button.

### Center Panel: Courtroom Transcript

Contains the main dramatic output.

Each role should have a visually distinct card:

* Judge
* Prosecutor
* Defense
* Witness
* Bailiff
* Court Clerk

Each card should be short. Ideally 2–5 sentences.

### Right Panel: Case File

Contains persistent information:

* case title,
* charge,
* accused,
* evidence,
* witness list,
* verdict meter,
* chaos level,
* courtroom dignity level.

The right panel makes the app feel like a game, not just generated text.

---

## 8. Core Interactions

### 8.1 Open Court

User submits the complaint.

Expected result:

* app creates a case title,
* app identifies the accused,
* app invents one or more absurd charges,
* app sets courtroom mood,
* app prepares the trial.

### 8.2 Submit Evidence

The user can add evidence during the trial.

Evidence can be typed naturally:

> “The yogurt lid was in their trash.”

The app turns it into an evidence card:

**Exhibit A:** The Lid of Betrayal
**Relevance:** Highly suspicious
**Admissibility:** Accepted, with dramatic eyebrow raise

Evidence should influence the trial outcome.

### 8.3 Call Witness

The user can call a witness.

Witness options should be generated from the complaint.

For a yogurt theft case:

* The Fridge
* The Spoon
* The Accused Roommate
* The Empty Yogurt Container
* The Plaintiff’s Trust Issues

For a cat case:

* The Mug
* The Table
* The Cat
* Gravity
* A Nearby Houseplant

The witness gives a short testimony. The user can then choose:

* “Cross-examine”
* “Accept testimony”
* “Accuse witness of bias”
* “Ask one follow-up question”

### 8.4 Object!

The **Object!** button should be one of the most important interactions.

When clicked, the app generates a dramatic objection based on the current statement.

Possible objection types:

* hearsay,
* speculation,
* emotionally manipulative,
* irrelevant but funny,
* excessive drama,
* suspiciously convenient,
* snack-based prejudice.

The judge then sustains or overrules the objection.

Example:

**User clicks:** Object!
**Defense:** “Objection! The prosecution is assuming motive when the only proven fact is spoon proximity.”
**Judge:** “Sustained. Spoon proximity alone cannot convict a roommate, though it does look bad.”

### 8.5 Add Twist

The user can click **Add Twist** once per trial.

This introduces a surprising complication.

Examples:

* “The yogurt was expired.”
* “The cat was framed by gravity.”
* “The missing sock has written a letter.”
* “The printer claims it was under emotional stress.”
* “The roommate says it was communal yogurt.”

The twist should meaningfully alter the verdict or sentence.

### 8.6 Request Harsher Sentence

Near the end, the user can request:

* lenient sentence,
* fair sentence,
* maximum petty punishment,
* poetic justice.

The sentence should remain funny and harmless.

Example harmless sentences:

* “The accused must replace the yogurt and label it ‘Evidence Custard.’”
* “The cat is sentenced to 12 minutes of being called a tiny criminal.”
* “The printer must be unplugged and made to think about what it has done.”
* “The roommate must endure one passive-aggressive fridge note.”

### 8.7 Appeal Verdict

After the verdict, the user can appeal.

Appeal should create a very short second round:

* one new argument,
* one new judge comment,
* final ruling.

The appeal should not restart the whole trial. It should be a quick bonus interaction.

---

## 9. Main Buttons

The app should have clear, playful buttons.

Primary buttons:

* **Open Court**
* **Begin Trial**
* **Submit Evidence**
* **Call Witness**
* **Object!**
* **Cross-Examine**
* **Add Twist**
* **Deliver Verdict**
* **Appeal**
* **Generate Court Record**
* **Start New Case**

Secondary buttons:

* **Make it more dramatic**
* **Make it shorter**
* **Make it sillier**
* **Make the judge stricter**
* **Make the defense better**
* **Summon surprise witness**

---

## 10. Output Design

The app should produce several types of outputs.

### 10.1 Court Docket

A compact case summary.

Example:

**Case #042:** The People vs. The Office Microwave
**Charge:** Aggravated Fish Reheating
**Plaintiff:** Everyone within 20 meters
**Accused:** Unknown lunch criminal
**Severity:** Olfactory emergency
**Status:** Pending trial

### 10.2 Charges

Charges should be funny and specific.

Example charges:

* Unauthorized Yogurt Conversion
* Malicious Beverage Displacement
* Reckless Use of Office Microwave
* First-Degree Sock Disappearance
* Aggravated Printer Betrayal
* Emotional Damage by False ETA
* Negligent Crumb Distribution
* Failure to Respect Leftover Sovereignty

### 10.3 Transcript Cards

Each role should speak in distinct short blocks.

Example:

**Prosecutor:**
“The facts are simple. A yogurt existed. The yogurt was loved. The yogurt is now gone. The accused had access, opportunity, and suspiciously good calcium levels.”

**Defense:**
“My client is being persecuted by circumstantial dairy evidence. We ask the court to consider the possibility of spoon-based coincidence.”

**Judge:**
“The court will allow spoon-based coincidence, but only under protest.”

### 10.4 Evidence Cards

Evidence should be displayed as cards.

Each card should include:

* exhibit label,
* name,
* description,
* relevance,
* court ruling: admitted / rejected / admitted with suspicion.

Example:

**Exhibit B: The Crumpled Wrapper**
A suspicious wrapper found near the couch.
**Relevance:** Moderate
**Ruling:** Admitted, but the court notes the couch is a known chaos zone.

### 10.5 Verdict

The verdict should be concise and satisfying.

Example:

**Verdict:** Guilty of Petty Dairy Misconduct
**Confidence:** 78%
**Reason:** Access, motive, suspicious spoon behavior, and weak defense.

### 10.6 Sentence

The sentence should be harmless, funny, and personalized.

Example:

**Sentence:**
The accused must buy replacement yogurt, write “I respect refrigerated boundaries” three times, and endure one dramatic fridge label for 48 hours.

### 10.7 Shareable Court Record

At the end, the app should generate a compact result card suitable for screenshotting or sharing.

It should include:

* case title,
* charge,
* verdict,
* sentence,
* best quote,
* court seal.

Example:

**Tiny Court of Everyday Crimes**
**Case:** The People vs. The Yogurt Vanisher
**Verdict:** Guilty
**Sentence:** Replacement yogurt and one ceremonial apology spoon.
**Best Quote:** “Spoon proximity alone cannot convict, but it does look bad.”

> **As shipped.** The card is `render.record_card`. The **Save Image** action
> exports it to a downloadable PNG entirely client-side (vendored
> `static/html2canvas.min.js` → `window.tc.savePng`); **Copy/Share** still emit the
> plain-text form (`render.share_text`).

---

## 11. Interaction Modes

The app should support two modes.

### 11.1 Quick Trial

For judges or casual users.

Duration: 60–90 seconds.

Flow:

1. complaint,
2. charges,
3. one prosecution statement,
4. one defense statement,
5. one evidence card,
6. verdict,
7. sentence,
8. share card.

This should be the default.

### 11.2 Full Trial

For users who want to play.

Duration: 3–5 minutes.

Flow:

1. complaint,
2. charges,
3. opening statements,
4. evidence,
5. witness,
6. cross-examination,
7. objection,
8. twist,
9. closing arguments,
10. verdict,
11. appeal,
12. final court record.

**As shipped (the single-page wizard — one growing transcript).** The whole
pre-verdict trial is **one glass conversation that grows**; only the verdict and
sentence are paper: `trial → judgement → (appeal → revisedJudgement) → sentence`
(`docs/full-trial-conversation-flow.md`). The numbered flow above is the *content*
of that conversation, not a sequence of cleared screens. Quick Trial is the default
(reach the verdict in one move — **Fast Judgement is available from the first
message**). Full Trial (`TrialState.length == "full"`, set by the *Full Trial* CTA)
adds **Witness**, **cross-examination**, and a once-per-trial **Twist** as optional
*moves* that append to the transcript, and unlocks the **Case File** — Suspicion
decomposed into Means / Motive / Opportunity. **Object!** is inline (it appends the
Defense/Judge exchange and stays in glass); the **appeal** returns to the same
transcript after the paper verdict. Optional scene dividers and stepper pips appear
only when the scene actually happens. The verdict band math is identical in both
modes — only how Suspicion is *sourced* changes. See `docs/adr/0001`, `docs/adr/0005`.

---

## 12. User Expectations

The user should expect:

* fast startup,
* no complicated instructions,
* funny outputs from tiny inputs,
* a feeling of progress,
* choices that affect the trial,
* short readable text,
* replayability,
* a good final artifact.

The user should not need to know anything about AI, models, prompts, or Hugging Face.

---

## 13. Empty and Error States

### Empty Input

If the user clicks **Open Court** without typing anything:

> “The court cannot prosecute vibes alone. Please submit one petty grievance.”

### Too Serious Input

If the user enters something genuinely serious, dangerous, legal, medical, or traumatic, the app should gently redirect:

> “This court only handles tiny fictional and everyday nonsense. Try a petty household annoyance, snack crime, pet incident, or object betrayal.”

### Very Long Input

If the input is too long, the app should summarize it into a petty charge and ask the user to confirm:

> “The court has reduced your 900-word grievance to: ‘Roommate repeatedly ignores dish duty.’ Proceed?”

### Incoherent Input

If the app cannot understand the complaint:

> “The court is confused but intrigued. Who or what is accused, and what tiny crime did they commit?”

---

## 14. Safety and Boundaries

The app should clearly state that it is a comedy experience.

It should not:

* give real legal advice,
* adjudicate real serious disputes,
* encourage harassment,
* produce cruel punishments,
* intensify genuine interpersonal conflict,
* name real private people in a harmful way,
* handle abuse, violence, self-harm, or criminal accusations as comedy.

When the complaint involves a real person, the app should keep the tone playful and low-stakes.

Example:

> “The court recommends a ceremonial apology, not revenge.”

> **As shipped (both directions are gated).** *Input* — `safety.screen()` runs the
> layered intake gate (length → offline blocklist → model classifier) on the
> complaint and every chat send (ADR-0004). *Output* — `safety.scrub_output()` is
> an offline floor on **generated** text (real-world violence, real legal/state
> punishment) wired into the single `add_card` choke point plus the closing/docket/
> reaction seams; a flagged line is replaced with a gentle in-character redaction.
> Adversarial coverage in `tests/test_output_safety.py`.

---

## 15. Visual Design Direction

The interface should look like a tiny theatrical courtroom.

Suggested visual elements:

* court docket cards,
* stamped verdict labels,
* wooden panel background,
* judge bench header,
* evidence cards,
* courtroom seal,
* typewriter-style transcript blocks,
* progress bar shaped like a legal process,
* animated “Sustained!” / “Overruled!” labels,
* final printable ruling.

The app should feel custom, not like default Gradio.

Visual identity words:

* miniature,
* theatrical,
* paper dossier,
* dramatic,
* playful,
* absurdly official.

---

## 16. Suggested Gradio Page Structure

### Tab 1: Courtroom

Main experience.

Contains:

* complaint input,
* trial controls,
* transcript,
* case file,
* evidence cards,
* verdict.

### Tab 2: Example Cases

Preloaded demo prompts.

Suggested examples:

1. The Missing Yogurt
2. The Cat and the Coffee
3. The Sock That Vanished
4. The Office Microwave Incident
5. The Printer Betrayal
6. The Friend Who Was “Five Minutes Away”

Each example should have a **Try This Case** button.

### Tab 3: Court Records

Shows the final generated result.

Contains:

* case summary,
* verdict,
* sentence,
* best quote,
* copyable share text.

### Tab 4: About the Court

Brief explanation:

* what the app does,
* what kind of cases it accepts,
* reminder that it is fictional comedy,
* how to get the best results.

---

## 17. Detailed User Journey Example

### User Input

> “My cat knocked over my coffee and then sat next to it like nothing happened.”

### Case Docket

**Case:** The People vs. Mr. Whiskers
**Charge:** Malicious Beverage Displacement
**Secondary Charge:** Loitering at the Scene with Suspicious Calm
**Severity:** Emotionally caffeinated
**Judge:** Hon. Biscuit P. Gavel

### Opening

**Bailiff:**
“All rise for the Tiny Court of Everyday Crimes. Today we hear a case of coffee, chaos, and feline confidence.”

### Prosecution

**Prosecutor:**
“The accused had motive, access, and paws. The coffee was upright. Then the cat arrived. Now the coffee is horizontal. The timeline is damning.”

### Defense

**Defense:**
“My client is a cat. Gravity is the real repeat offender here.”

### Evidence

**Exhibit A:** The Spilled Coffee
**Relevance:** Extremely high
**Ruling:** Admitted. The court notes visible emotional damage.

### Witness

**Witness: The Mug**
“I was stable. I was warm. Then came a paw of destiny.”

### Objection

**Defense:**
“Objection! The mug is clearly biased due to being shattered emotionally and possibly physically.”

**Judge:**
“Overruled. The mug has suffered enough.”

### Verdict

**Verdict:** Guilty
**Charge Confirmed:** Reckless Paw Conduct
**Confidence:** 91%

### Sentence

The accused is sentenced to:

* 15 minutes of being called “little criminal,”
* one replacement coffee funded by the household,
* mandatory cuddling probation,
* no sitting smugly near the crime scene for 24 hours.

### Share Card

**Tiny Court of Everyday Crimes**
**The People vs. Mr. Whiskers**
**Verdict:** Guilty of Reckless Paw Conduct
**Sentence:** 15 minutes of being called “little criminal.”
**Best Quote:** “Gravity is the real repeat offender here.”

---

## 18. Replayability Features

To make users try multiple cases, include:

* random judge names,
* random court moods,
* different charge styles,
* different witness pools,
* surprise twists,
* verdict variation,
* daily “Court Theme.”

Possible daily themes:

* Snack Crime Monday
* Petty Roommate Tuesday
* Object Betrayal Wednesday
* Feline Felony Friday
* Laundry Mystery Sunday

---

## 19. Delight Features

These are optional but high-impact.

### Courtroom Dignity Meter

A meter that starts at 100% and drops as the trial becomes ridiculous.

Example:

**Courtroom Dignity:** 42%
*The judge has allowed testimony from a spoon.*

### Petty Severity Meter

Rates the crime.

Example:

**Petty Severity:** 8/10
*Technically minor. Emotionally historic.*

### Suspicion Meter

Shows how suspicious the accused looks.

Example:

**Suspicion:** 73%
*The accused was seen near crumbs.*

### Court Seal Generator

Each final ruling gets a fake court seal:

**Certified by the Tiny Court of Everyday Crimes**
*Department of Snacks, Pets, and Domestic Betrayals*

### Best Quote Highlight

The app automatically selects the funniest line from the trial.

---

## 20. MVP Scope

The minimum winning version should include:

1. complaint input,
2. generated case docket,
3. quick trial mode,
4. prosecution and defense arguments,
5. at least one evidence card,
6. at least one witness,
7. objection interaction,
8. verdict,
9. funny sentence,
10. shareable final court record,
11. polished visual layout.

The MVP should prioritize interaction quality over many features.

A short, funny, complete trial is better than a long, chaotic one.

---

## 21. Features to Avoid in Version 1

Avoid:

* open-ended chat as the main interface,
* long multi-page story output,
* real legal terminology used seriously,
* complex user accounts,
* real-time multiplayer,
* serious dispute mediation,
* too many settings,
* complicated role configuration,
* making users write long prompts.

The experience should be simple:

> Type petty crime → press Open Court → play tiny trial → receive verdict.

---

## 22. Success Criteria

The app is successful if:

* a new user understands it within 5 seconds,
* the first generated case is funny,
* the user clicks at least one interaction button,
* the final verdict feels personalized,
* the user wants to try another case,
* the result is screenshot-worthy,
* the app feels like a custom experience rather than a chatbot.

For hackathon judging, the best demo should show:

1. one very strong prepared case,
2. one live user-entered case,
3. the objection button changing the trial,
4. the final shareable court record.

---

## 23. Recommended Demo Script

Start with the example:

> “My cat knocked over my coffee and looked proud.”

Show:

1. Open Court.
2. Case docket appears.
3. Begin Trial.
4. Prosecutor accuses the cat.
5. Defense blames gravity.
6. User clicks **Object!**
7. Judge overrules.
8. User submits evidence: “There were paw prints.”
9. Verdict updates.
10. Final sentence appears.
11. Shareable court record appears.

The demo should be under two minutes and should make the judges smile before the first minute ends.

---

## 24. One-Sentence Pitch

**Tiny Court of Everyday Crimes turns petty daily annoyances into dramatic, interactive comedy trials with charges, evidence, objections, witnesses, verdicts, and absurdly harmless sentences.**
