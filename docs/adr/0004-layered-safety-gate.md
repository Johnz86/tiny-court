# Layered intake safety gate, offline hard-stop first

Safety is a hard requirement (design-spec §13–14), so the intake gate runs before
any Case is created and is layered, in order: (1) deterministic empty / too-long
checks (string length); (2) a curated keyword **blocklist that hard-stops obvious
danger** (self-harm, violence, abuse) instantly and fully offline; (3) one
MiniCPM classification pass for the nuanced "genuinely serious vs petty" and
"incoherent" calls, reusing the main model with a strict prompt. Each outcome
emits the spec's exact redirect copy (empty / too-serious / too-long /
incoherent).

## Why this order

The dangerous failure mode is dark input slipping into a comedy frame during a
live demo. A model-only gate can misjudge a serious input as "petty" and let it
through. Putting a deterministic offline hard-stop *before* the model means a
slow, failed, or fooled model call can never be the only thing standing between
dark input and the courtroom. The model still does the nuanced work the blocklist
can't (paraphrased seriousness, incoherence) but it is never the sole line of
defense.

## Considered options

- **Deterministic only:** brittle, can't tell "incoherent" from "petty" or catch
  paraphrased seriousness.
- **Model classifier only:** no offline backstop; a misclassification sails
  through.
- **Layered (chosen):** rules + offline blocklist + model, defense in depth.

## Consequences

Reusing the main model keeps the gate dependency-free and Off-the-Grid-compatible
([ADR-0002](./0002-pluggable-backend-seam.md)). The blocklist is a maintained
artifact, accepted as a source of false positives in exchange for a guaranteed
offline floor. "Incoherent" is defined as the model failing to extract an Accused
+ a crime (see Accused/Charge in [CONTEXT.md](../../CONTEXT.md)).

## Amendment (2026-06-14): output-side scrub

The original gate floors **input** only (`safety.screen()`). A model can still
*emit* a cruel punishment or real-world legal/violent consequence the input gate
never saw, so a second offline floor now runs on the **generation** seam:

- `safety.scrub_output(text, fallback="")` — a deterministic, word-bounded regex
  over real-world violence and real legal/state punishment (kill/murder/stab/…,
  prison/jail/arrest/deport/death-penalty/…). A match replaces the whole line with
  a gentle in-character redaction (`COPY_OUTPUT_REDACTED`) or the caller's fallback.
- Wired at the single `TrialState.add_card` choke point (every transcript line)
  plus the non-card seams that bypass it: `engine.react` (the returned bubble),
  `open_case` (docket fields), `submit_evidence` (exhibit fields), and
  `deliver_closing` (sentence / reasons / best quote / verdict label).
- Precision over recall on ambiguous stems: "assault", "shot", "execute",
  "arresting" are deliberately **excluded** (they collide with the comedic register
  — "aromatic assault", "a cheap shot", "executed the heist") and are caught at
  intake instead. Over-redaction (a gentle line) is the safe failure mode.

Like the input gate, this is offline and dependency-free, so a slow/fooled model
is never the only thing between dark output and the screen. Adversarial coverage:
`tests/test_output_safety.py`.
