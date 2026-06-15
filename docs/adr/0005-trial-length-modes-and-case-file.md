# Trial-length modes and the Case File decomposition of Suspicion

The trial runs in two lengths (design-spec §11): **Quick Trial** (the default,
~60–90s) and **Full Trial** (the power-user path, 3–5 min). `TrialState.length`
(`"quick" | "full"`, default quick) carries the mode; `TrialState.is_full` is the
property everything branches on. The landing offers two aligned CTAs — *Quick
Trial* (the default) and *Full Trial* — and `do_begin(wiz, length)` sets it.

Full Trial unlocks two extra phases and a decomposition of the headline Suspicion
meter into a **Case File** (the meters brainstorm's Config C):

```
Suspicion (Full Trial) = mean(Means, Motive, Opportunity)     # the three legs
  Means        could they have done it (the how)
  Motive       did they want to        (the why)
  Opportunity  were they positioned to (the when/where)
```

## The decision

**Only how Suspicion is *sourced* changes — never the verdict formula.**
`resolve_verdict` still reads `meters.suspicion` and the ADR-0001 band math is
untouched. `engine._apply_meters` is the single choke point:

- In a **Quick Trial** a `suspicion=` delta moves the Suspicion meter directly,
  and the three legs stay 0 — the dense Case File never clutters the default path.
- In a **Full Trial** a move is routed into the legs and Suspicion is recomposed
  as their mean (`compose_suspicion`), so the headline bar is provably the sum of
  its parts. A move that supplies an explicit leg split (`motive=/opportunity=`)
  uses it; a flat `suspicion=` move with no split **spreads equally across all
  three legs** (the "spread fallback"), so a chat reaction still moves the needle.

The legs only become *distinct* once the Full Trial phases land:

- **Witness** (`engine.call_witness`) — summons a witness whose testimony
  establishes **Motive + Opportunity** distinctly (the first per-leg movement).
- **Cross-examination** (`engine.cross_examine`) — the Defense shakes those legs
  (usually down; can backfire up) and wears Patience.
- **Twist** (`engine.add_twist`) — a once-per-trial complication (gated by
  `twist_used`) that swings any leg in *either* direction and reshapes Petty
  Severity.

## Considered options

- **A second, separate Full-Trial verdict engine.** Rejected: forks the
  rule-owned band math (ADR-0001) and doubles the test surface for no gain — the
  band is identical, only its inputs differ.
- **Make the legs first-class guilt inputs, blended directly into GuiltScore.**
  Rejected: it would let Full Trial drift to a different band than Quick for the
  same case, and break the single-source-of-truth weights in `trial.py`.
- **Compose Suspicion from the legs, leave the band untouched (chosen).** Keeps
  one verdict engine, one set of band tests, and a Quick Trial that is provably a
  strict simplification of Full — the Case File is a *lens* on Suspicion, not a
  second guilt model.

## Consequences

The dense decomposition is opt-in and test-pinned out of Quick Trial
(`test_quick_trial_leaves_the_case_file_empty`). The stepper, the Case File strip
(`render.case_file_strip`), and `state_summary` are all length-aware. Because the
witness *adds* to Motive/Opportunity above the spread baseline, a Full Trial that
calls a witness runs hotter than the equivalent Quick Trial — an intended
consequence of playing the case out, not a rebalancing bug. If a future
interaction maps a leg *down* hard at intake, revisit the `open_case` leg
baselines and re-check the band boundaries (`tests/test_verdict.py`).
