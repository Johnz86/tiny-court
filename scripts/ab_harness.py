"""Dev-only A/B harness (handoff step 4): run the *real* courtroom prompts
through a local model and report rendered cards, first-try parse rate, tok/s,
and peak VRAM. Building model selection on the real prompts hardens the prompt
layer rather than being separate eval tooling (docs/adr/0002).

Usage:
    uv run python scripts/ab_harness.py small
    uv run python scripts/ab_harness.py main
    uv run python scripts/ab_harness.py small main   # compare both
"""

from __future__ import annotations

import sys

from tinycourt.config import MODEL_REGISTRY
from tinycourt.generation import CallTag
from tinycourt.parsing import parse_delimited
from tinycourt import prompts

SAMPLE_COMPLAINT = "My cat knocked over my coffee and then sat next to it like nothing happened."

# A fixed call script that mirrors a Quick Trial.
CALLS = [
    (CallTag.CASE_OPEN, lambda: prompts.case_open(SAMPLE_COMPLAINT, accused="cat", severity="dramatic"),
     ("CASE_TITLE", "CHARGE")),
    (CallTag.ARGUMENTS, lambda: prompts.arguments(f"Case about: {SAMPLE_COMPLAINT}"),
     ("PROSECUTOR", "DEFENSE")),
    (CallTag.EVIDENCE, lambda: prompts.evidence(f"Case about: {SAMPLE_COMPLAINT}", "There were paw prints."),
     ("EXHIBIT",)),
    (CallTag.OBJECTION, lambda: prompts.objection(f"Case about: {SAMPLE_COMPLAINT}", "The cat had motive."),
     ("DEFENSE", "JUDGE")),
    (CallTag.CLOSING, lambda: prompts.closing(f"Case about: {SAMPLE_COMPLAINT}", "Guilty"),
     ("SENTENCE",)),
]


def run_model(key: str) -> None:
    import torch
    from tinycourt.local_client import LocalTransformersClient

    spec = MODEL_REGISTRY[key]
    print(f"\n{'='*70}\nMODEL {key}: {spec.label} ({spec.repo_id})\n{'='*70}")
    client = LocalTransformersClient(spec)

    if torch.cuda.is_available():
        torch.cuda.reset_peak_memory_stats()

    first_try_ok = 0
    total_tokens = 0
    total_seconds = 0.0
    for tag, build, required in CALLS:
        result = client.generate(build(), tag=tag, max_new_tokens=300)
        parsed = parse_delimited(result.text)
        ok = parsed.ok and all(parsed.get(k) for k in required)
        first_try_ok += int(ok)
        total_tokens += result.tokens
        total_seconds += result.seconds
        flag = "OK " if ok else "BAD"
        print(f"\n--- {tag.value} [{flag}] {result.meta.get('tok_s', 0)} tok/s ---")
        if parsed.prose:
            print(f"  prose: {parsed.prose[:120]}")
        for k in required:
            print(f"  {k}: {parsed.get(k)[:120] or '(missing)'}")
        print(f"  deltas: {parsed.deltas}")

    n = len(CALLS)
    tok_s = total_tokens / total_seconds if total_seconds else 0
    print(f"\n{'-'*70}")
    print(f"first-try parse rate: {first_try_ok}/{n} ({100*first_try_ok//n}%)")
    print(f"throughput: {tok_s:.1f} tok/s over {total_tokens} tokens")
    if torch.cuda.is_available():
        print(f"peak VRAM: {torch.cuda.max_memory_allocated()/1e9:.2f} GB")


def main(argv: list[str]) -> int:
    keys = argv or ["small"]
    for k in keys:
        if k not in MODEL_REGISTRY:
            print(f"Unknown key {k}. Known: {list(MODEL_REGISTRY)}")
            return 2
        run_model(k)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
