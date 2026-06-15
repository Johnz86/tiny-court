# Single Page Wizard Interaction Plan

This document describes the lead-design direction for the Tiny Court web app. It
intentionally moves away from the earlier three-panel courtroom dashboard. The
target experience is a single full-height landing page that transforms into a
minimal guided court session.

> **What shipped vs. what this describes (2026-06-14).** The "two materials"
> model below (glass for talking, paper for ruling) is exactly what's built. Two
> things evolved past the step-by-step framing here, per
> `docs/full-trial-conversation-flow.md` (the authoritative flow record):
> - **The glass steps are now ONE growing transcript, not separate cleared
>   screens.** Case / Evidence / Witness / Twist / Plea are *scenes* that append
>   to a single conversation (`render.glass_trial`); the "Step 1…6" sections below
>   are best read as the **copy/intent of each scene**, not as distinct screens.
>   The stepper is a dynamic timeline (pips appear as scenes occur), and Object!
>   stays inline. Only the verdict/sentence are paper.
> - **The landing leads with a rotating hero docket and two trial-length CTAs**
>   ("Quick Trial" / "Full Trial"), not a single "Begin" button — see the Landing
>   Mode section, updated below.
> This doc's old "Implementation Plan" section targeted an early static HTML
> mock that is **superseded** by the shipped `tinycourt/` app (CLAUDE.md); that
> section has been removed.

## Product Shape

Tiny Court should feel like a tiny theatrical ritual:

> Describe petty nonsense, get a funny judgement, optionally appeal with
> evidence.

The interface has two modes:

1. **Landing Mode**
   Full-viewport introduction. No app chrome, no visible wizard, no evidence
   controls.
2. **Court Mode**
   Landing content disappears. The user enters a focused single-column wizard
   where each step asks for one thing.

The primary design rule:

> Every screen must answer: what does the court need from me right now?

If a control does not help answer that question in the current step, it should
not be visible.

## Landing Mode

The landing page must occupy the full viewport height and use the courtroom
background as the stage. It should explain the product in the first viewport
without becoming a marketing page.

### Layout

Use the center wall area of the background for copy. Keep the judge and object
witnesses visible enough to establish the joke, but do not let them compete with
the text.

Visible elements:

- Product name: **Tiny Court**
- Primary promise: **Settle petty disputes with dramatic fairness.**
- Short explanation:
  **Describe what happened, add evidence, invite witnesses, and receive a tiny
  judgement.**
- A **hero docket** — one faux court record (case → charge → verdict + stamp →
  sentence) that front-loads the joke *and* the output format at a glance. It is a
  single card that **rotates through several cases** (`render.landing_hero`,
  `data.LANDING_DOCKETS`), crossfading with pure CSS. This replaces the older
  animated chat-sequence example and is the landing's main explanation of the use
  case.
- **Two trial-length CTAs**, a matched/aligned pair under the docket:
  - **Quick Trial** (primary) — the default, ~60–90s path.
  - **Full Trial** (secondary) — witnesses, a twist, the Case File.
- One small support line spelling out the difference (Quick runs in a minute;
  Full calls witnesses, allows a twist, opens the Case File. Evidence optional.
  Grudges welcome.)

### Primary Button Behavior

The two CTAs are the only meaningful actions on the landing page; they differ
only in trial length (`do_begin(w, "quick" | "full")`).

On click:

- Fade or slide all landing-only elements out.
- Slightly zoom and reframe the background to signal court entering session.
- Open the one glass `trial` surface (seeded with the case-scene framing line).
- Reveal Court Mode.

After this transition, landing copy must be gone. Do not keep a marketing header,
feature list, or explanatory hero block in Court Mode.

## Court Mode

Court Mode is a focused wizard, not a dashboard. It should not use a permanent
three-column layout.

### Persistent Structure

The court screen uses one vertical stack:

```text
[top centered phase stepper]

[center active interaction]

[primary action + quick actions]
```

The phase stepper is centered at the top of the viewport. It is a **dynamic
timeline**, not a fixed rail (`app._timeline`): the mandatory anchors are always
shown and an optional scene's pip is inserted only once it has actually happened,
so it reads as a record of *this* trial:

```text
Case · [Evidence] · [Witness] · [Twist] · Verdict · [Appeal] · Sentence
        └── bracketed pips appear only when the scene occurs ──┘
```

Rules:

- Current phase is emphasized.
- Completed phases remain readable and visually lighter than the current phase.
  Avoid status text such as `ok case`; it reads like debug UI.
- Future phases are muted.
- On mobile, the stepper becomes compact and horizontally scrollable if needed.
- Do not show meter panels, transcript sidebars, or persistent case-file columns.

### Active Interaction Surface

The center surface changes by step, and the two kinds of step use two
deliberately different materials:

- Case, evidence, and plea steps use a chat-like message shell with a fixed
  composer bar. This shell is **smoked glass** — a dark, warm, translucent panel
  that lets the courtroom show through, matching the landing page's example-chat
  box so Landing -> Court feels continuous. The court is *talking*, so the stage
  stays visible behind the conversation.
- Judgement and sentence steps use one verdict/card artifact rendered on
  **opaque warm paper**. The court is *ruling*, so the artifact should read like
  a printed court document. The glass-vs-paper contrast is intentional.

The surface should not feel like a heavy card dashboard.

Suggested visual treatment for the conversational (glass) shell:

- `max-width: min(760px, calc(100vw - 40px))`
- Background: warm-dark glass, around `rgba(42, 22, 13, 0.42)` (optionally with a
  faint per-phase color wash), light ink text around `rgba(255, 247, 232, 0.95)`.
- Backdrop blur for readability.
- Translucent message bubbles (clerk/court ~`rgba(255, 247, 232, 0.16)`, the
  filer's own ~`rgba(49, 95, 112, 0.38)`), not opaque white cards.
- The composer bar uses the **same smoked glass** as the shell (matching outline,
  background, and shadow), so the input reads as one continuous glass system
  rather than a separate solid card. Its icons stay full solid colour and the
  placeholder is a dimmed cream.
- Radius no larger than 8px.
- No nested cards.

The shell **stretches the full height** of the court viewport: it fills the space
between the top phase stepper and the bottom action row. The message list grows
to fill, anchored to the bottom so the conversation hugs the composer and grows
upward; the composer pins to the bottom of the tall box. The empty area above the
conversation is not dead space — the courtroom shows through the glass.

- No page-level scrolling in normal desktop or mobile screenshots. The active
  surface and the bottom action row must both fit in one viewport.

### Typography

The app uses two self-hosted **variable** fonts, loaded via local
`@font-face` (`assets/fonts/`), to give the courtroom two distinct voices:

- **Display serif — Fraunces** (`--font-display`): the court's theatrical voice.
  Used for the `Tiny Court` wordmark, the landing promise, verdict titles, the
  `Court Record` / prompt headings, and the stamp/seal. Its variable axes are
  driven on purpose: the optical-size (`opsz`) axis is pushed up for the big
  beats so they read as high-contrast display cuts, and a touch of the `WONK`
  axis adds character on the hero and verdict titles.
- **UI sans — Inter** (`--font-ui`): everything else — transcript bubbles,
  labels, buttons, composer, docket metadata.

Weight rules:

- Inter is a true variable font (100–900), so weights now resolve continuously.
  Do **not** use `font-weight` above `900`; values like `1000`/`950` clamp to the
  font max and flatten the hierarchy. Use the `--w-regular/-medium/-bold/-black`
  tokens (440 / 560 / 720 / 900).
- Use `font-variant-numeric: tabular-nums` for docket numbers, case IDs, and the
  stepper count so figures do not jitter.

### Composer Bar

Case, evidence, and plea states use one fixed composer near the bottom of the
active surface. In the production app this is a **custom multimodal Gradio
component** (`custom_components/MultimodalComposer`, value `{text, files}`),
styled as a smoked-glass bar to match the chat shell:

```text
[upload] [textarea / prompt input] [microphone] [send arrow]
```

Behavior:

- The upload (paperclip) button opens the native file picker for **real**
  image / audio / video / generic-file uploads (no separate tools menu).
- The central textarea starts as a single-line prompt-like control and expands
  when content is added, then scrolls internally past its max height.
- The microphone button records/attaches an audio file.
- The send button runs the phase's primary action, usually fast judgement, ask
  judge, or submit plea (`Enter` sends, `Shift+Enter` inserts a newline).
- Attachments appear as **type-aware cards** (image thumbnail, audio card, video
  card, generic-file chip) in a tray **above** the textarea, each removable.
- Invite is a quick action in the action row, not a composer tool.

Do not include a generic agent dropdown such as `case/proof/judge`; the current
phase and button labels already communicate intent.

## Step 1: Case

Question:

> What happened?

Visible elements:

- One chat-like clerk prompt.
- The multimodal composer with an expanding textarea.
- Upload (paperclip) button for real file attachments.
- Type-aware attachment cards above the textarea, only after attachments exist.
- Primary action button.
- Optional secondary quick action.

Composer textarea behavior:

- Centered in the page.
- Starts as a compact prompt input.
- Expands on focus or when content is present.
- Should not push the page into vertical scrolling.

Placeholder:

```text
Tell the court what happened...
```

Attachments are uploaded through the composer's paperclip (image / audio /
video / generic files) or recorded via the microphone. Each upload appears as a
type-aware card above the textarea — an image thumbnail, an audio/video card, or
a generic-file chip — showing the filename and size, e.g.:

- `photo-1.jpg`
- `voice-note.wav · 4.7 KB`
- `kitchen-clip.mp4`

Primary action:

```text
Fast Judgement
```

Secondary quick action:

```text
Add Evidence First
```

Validation nudge for weak input:

```text
The court needs at least one dramatic detail before swinging the hammer.
```

### Session URL Creation

As soon as the user starts a case with text or media, create a unique court
session URL:

```text
/court/yogurt-vanisher-7KQ2
```

Show it quietly below the input:

```text
Court session created - Copy invite
```

This is not a separate wizard step.

## Step 2: Evidence

Evidence is available when:

- The starter chooses `Add Evidence First`.
- Someone joins the session URL.
- The court asks for clarification before ruling.
- A user appeals with evidence after judgement.

Question:

> Add one useful detail for the court.

Visible elements:

- Same multimodal composer, relabeled for evidence.
- Same paperclip upload + attachment cards.
- Compact evidence/event stream.
- Primary action.
- Role-aware quick actions.

Event stream examples:

- `Mira added a photo.`
- `Alex pleaded innocent.`
- `You added a voice note.`

Primary action:

```text
Ask the Judge
```

Quick actions:

- Add Exhibit
- Plead Guilty
- Plead Innocent
- Request Leniency

The page should keep pulling the user toward judgement. Evidence collection must
not become a case-management interface.

## Step 3: Fast Judgement

Triggered by:

- `Seek Fast Judgement`
- `Ask the Judge`
- `Rule Now` when collaborators have pending input

The textarea clears into a judgement state.

Visible elements:

- One verdict card.
- Primary action.
- LLM-suggested follow-up actions.

Verdict card fields:

- Verdict
- Confidence, phrased comedically
- 2-3 short reasons
- Sentence

Example:

```text
Verdict: Guilty of Snack Negligence
Confidence: 72% judicial eyebrow certainty
Reasoning:
- The cookies existed before the accused entered the timeline.
- The accused displayed suspicious crumb adjacency.
- The defense offered only vibes and a napkin.
Sentence: Replace the cookies, write a three-line apology, and endure one
ceremonial side-eye.
```

Primary action:

```text
Accept
```

Follow-up quick actions:

- Innocent
- Leniency
- Evidence
- Fairer

Cap visible quick actions at 3-5. On narrow mobile, hide the least important
shortcut rather than letting the row overflow.

## Step 4: Plea

Triggered by:

- `Plead Innocent`
- `Plead Leniency`
- `Appeal With Evidence`
- Role-specific participant actions

The verdict card remains visible but becomes secondary. A new textarea appears
for the plea.

Prompt variants:

- Innocence:
  `State your defense. The court allows one dramatic objection.`
- Leniency:
  `Explain why mercy is appropriate.`
- Evidence appeal:
  `Add new evidence or suspicious context.`

Primary action:

```text
Submit Plea
```

Quick actions:

- Blame Circumstances
- Admit Partial Guilt
- Call Witness
- Offer Apology
- Request Community Service

Quick-action behavior:

- Tapping a chip inserts a draft into the textarea.
- It does not immediately submit.
- The user can edit before submitting.

## Step 5: Revised Judgement

The revised judgement should prove that the court listened.

Visible elements:

- Same verdict card format.
- Small change marker.
- Primary action.
- Limited secondary actions.

Change marker examples:

- Sentence reduced
- Verdict upheld
- New evidence accepted
- Court remains unimpressed

Example:

```text
Verdict upheld, but sentence reduced due to credible snack panic.
```

Primary action:

```text
Finalize
```

Secondary actions:

- One More Plea
- Invite Witness
- Share Verdict

Repeat plea limit:

After 2-3 plea rounds, the court should gently close the loop:

```text
The court has heard enough theatre for one session.
```

## Step 6: Sentence / Court Record

The final step creates a compact, shareable artifact.

Court record fields:

- Case title
- Defendant
- Verdict
- Sentence
- Best quote
- Court seal on desktop, optional or hidden on narrow mobile

Actions:

- Copy
- Share
- Served
- New Case

Completed sentence state:

```text
Sentence served. The court grudgingly approves.
```

## Collaborative Court Sessions

Each court session should have a distinct URL:

```text
/court/the-yogurt-vanisher-7KQ2
```

The starter creates the session and is treated as the **Court Clerk** by default.
Joiners opening the URL skip Landing Mode and enter a role-selection flow.

### Join Flow

When a participant opens a court URL:

1. Show the current case title, charge, and phase.
2. Ask how they are involved.
3. Let them choose a role.
4. Enter Court Mode with role-relevant actions.

Role choices:

- I am accused
- I have evidence
- I plead for mercy
- I am watching silently

### Roles

Roles should affect quick actions and copy, not create a heavy permissions
system.

| Role | Suggested Actions |
| --- | --- |
| Court Clerk / Starter | Advance phases, invite others, request fast judgement, finalize |
| Accused | Plead guilty, plead innocent, request leniency, submit defense evidence |
| Defense | Object, request leniency, submit defense evidence, propose alternative suspect |
| Prosecutor | Submit incriminating evidence, request harsher sentence, call witness |
| Witness | Add testimony, upload exhibit, answer one prompted question |
| Spectator | Vote suspicious, vote reasonable doubt, request drama |

Every collaborative action becomes a Court Record event:

- Evidence added
- Plea entered
- Objection raised
- Leniency requested
- Verdict accepted

### Collaboration Scope

For this hackathon build, collaboration can be simulated or local-only:

- Generate fake unique URLs.
- Simulate joined participants.
- Store events in browser state.
- Show role-specific actions.
- Do not implement accounts, moderation queues, or true real-time sync yet.

## Responsive Design

### Desktop

- Full viewport stage.
- Top phase stepper fixed or sticky at top center.
- Main surface centered horizontally and vertically.
- Width around `min(760px, calc(100vw - 40px))`.
- Action row centered below the surface and allowed to wrap.
- Use compact drawers or sheets only for optional evidence/people/record views.
- Judgement and sentence documents must be compact enough that the action row is
  fully visible in a 1365x768 or similar laptop viewport.

### Mobile

- Use `100svh` instead of only `100vh`.
- Keep the phase stepper compact.
- Place the main content slightly above center, around 45% viewport height, so
  the keyboard does not bury it.
- Textarea width: `calc(100vw - 28px)`.
- Textarea max height: `30vh`.
- Media tools become thumb-friendly icon buttons.
- Primary action may sit near the bottom when the keyboard is closed.
- Background movement should be subtler than desktop.
- Judgement and sentence documents use narrower safe widths, one-column final
  records, wrapped verdict/order text, and shortened action labels.

## Background and Motion

The courtroom background is a stage, not decoration.

Stage zones:

- Center wall: landing and case description.
- Right side: evidence, witnesses, pleas, object defendants.
- Left judge: judgement and sentence.

Suggested phase crops:

```css
/* Landing */
background-position: center center;
background-size: cover;

/* Case */
background-position: center center;
background-size: 108%;

/* Evidence */
background-position: 72% 58%;
background-size: 122%;

/* Plea */
background-position: 82% 62%;
background-size: 132%;

/* Judgement */
background-position: 18% 54%;
background-size: 132%;

/* Sentence */
background-position: 24% 52%;
background-size: 145%;
```

Motion rules:

- Transitions should be under 800ms.
- Start Court: slight zoom, then landing fades out.
- Phase change: small stepper fade/slide.
- Fast judgement: small gavel-like pulse, then crop toward judge.
- Evidence added: chip drops into the tray.
- Plead innocence: pan toward defendants/evidence.
- Plead leniency: warmer overlay and softer motion.
- Sentence revealed: verdict stamp appears with one confident pop.
- Respect `prefers-reduced-motion`.
---

*The former "Implementation Plan" section was removed (2026-06-14): it targeted
an early static HTML mock, now superseded by the production app in `tinycourt/`
(CLAUDE.md). For how to run, verify, and
screenshot the real app, see `docs/deployment.md`, `scripts/verify_e2e.py`, and
the `scripts/drive_*.cjs` Playwright drivers (screenshots land in
`tests/screenshots/`).*
