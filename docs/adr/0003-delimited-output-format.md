# Delimited line format for model output, not JSON

Each model call must return both free comedic prose and numeric meter deltas. We
use a fenced **delimited line format** rather than JSON: the prose, then a `---`
fence, then flat `KEY: value` lines (e.g. `SUSPICION_DELTA: +10`,
`DIGNITY_DELTA: -5`). A tolerant parser splits on the fence; a single retry covers
a malformed response; and a deterministic fallback card (canned line, zero delta)
guarantees a parse failure degrades to "slightly less funny," never a frozen
trial.

## Why not JSON

On an 8B model, wrapping comedic prose inside JSON string values is a frequent
break source — apostrophes, quotes, and newlines in the writing corrupt the
structure — and JSON mode tends to stiffen the prose. Flat `KEY: value` lines sit
outside the prose entirely, so the writing can breathe, and small models follow
flat line schemas far more reliably than nested objects. The format is also
provider-agnostic, which matters because the backend seam
([ADR-0002](./0002-pluggable-backend-seam.md)) can't assume any endpoint supports
JSON mode.

## Consequences

The parser is hand-rolled string splitting rather than `json.loads`, and lives
above the backend seam. Schemas stay flat and per-call small (no single giant
nested trial object). If a future served backend offers reliable constrained
decoding, revisiting this is low-cost — the parsing layer is isolated.
