# Hybrid verdict engine: model proposes deltas, app owns the verdict

The trial's "truth" lives in Python, not in the model. Each interaction sends a
model call that returns comedic prose plus proposed **meter deltas**; the app
clamps and accumulates those into meters held in `gr.State`, and computes the
Verdict deterministically from the running totals:

```
GuiltScore (0–100) = 0.55·Suspicion + 0.25·EvidenceWeight + 0.20·PettySeverity
Verdict band: <35 Not Guilty · 35–65 Lesser Pettiness · >65 Guilty
Confidence = (distance from nearest band edge, %) × (EvidenceWeight / 100) × (Dignity / 100)
```

Guilt blends two questions the court loves to confuse: how guilty the accused
*looks* (**Suspicion** — vibes) and how much can actually be *proven* (**Evidence
Weight** — proof). Object! attacks the proof; Submit Evidence builds it (the
meters brainstorm's Config B). Confidence then keys off Evidence Weight × Dignity,
so a high-suspicion / low-evidence case renders a guilty-feeling verdict the court
openly can't back up — peak comedy ("Guilty. Confidence: 19%. We just know.").

Dignity and Evidence Weight deliberately scale only Confidence, not the band: a
court that let a spoon testify, or that proved nothing, renders the same verdict
with less certainty (a running gag, e.g. "Guilty. Confidence: 23%. The bailiff is
crying."). Mercy and Patience stay out of the guilt math entirely (Configs A/D).

## Considered options

- **Model decides everything** (guilt + meters + prose in one call): rejected —
  an 8B model drifts, contradicts earlier scenes, and may ignore that a sustained
  objection should lower guilt. Untestable.
- **App decides everything** (fixed rules, model only narrates): rejected — robs
  the model of creative input on *how much* a twist should swing things.
- **Hybrid (chosen):** model proposes magnitudes, app guarantees consistency and
  owns the final mapping. Makes the spec's "interactions must measurably affect
  the verdict" (design-spec §6, §8.5) structurally true and unit-testable.

## Consequences

The verdict is reproducible and demoable — you can show the Object! button moving
the Suspicion needle. Meter semantics and weights are the single source of truth;
see [CONTEXT.md](../../CONTEXT.md). The verdict can be tested without the model by
feeding synthetic delta sequences.
