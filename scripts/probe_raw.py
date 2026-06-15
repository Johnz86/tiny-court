"""Dev probe: dump RAW model text for every courtroom call so prompt failures
are visible verbatim (the A/B harness only prints the parsed view).

Usage:
    uv run python scripts/probe_raw.py main > probe_main.txt
"""

from __future__ import annotations

import sys

from tinycourt.config import MODEL_REGISTRY
from tinycourt.generation import CallTag
from tinycourt.parsing import parse_delimited
from tinycourt import prompts

COMPLAINT = "My roommate keeps eating my yogurt and pretending it was a misunderstanding."
SUMMARY = (
    "Case: The People vs. The Yogurt Vanisher\n"
    "Charge: Unauthorized Dairy Appropriation\n"
    "Accused: The Roommate\n"
    "Court mood: Gravely unserious\n"
    "Meters — Suspicion 48, Severity 30, Dignity 86"
)

CALLS = [
    (CallTag.CASE_OPEN, lambda: prompts.case_open(COMPLAINT, accused="my roommate"), ("CASE_TITLE", "CHARGE")),
    (CallTag.ARGUMENTS, lambda: prompts.arguments(SUMMARY), ("PROSECUTOR", "DEFENSE")),
    (CallTag.EVIDENCE, lambda: prompts.evidence(SUMMARY, "The empty yogurt cup was in their trash."), ("EXHIBIT",)),
    (CallTag.OBJECTION, lambda: prompts.objection(SUMMARY, "The accused had access and motive."), ("DEFENSE", "JUDGE")),
    (CallTag.REACTION, lambda: prompts.reaction(SUMMARY, "case", "The empty cup was hidden under a napkin like a tiny crime scene."), ("ROLE", "TEXT")),
    (CallTag.PLEA, lambda: prompts.plea(SUMMARY, "leniency", "I was hungry and the label had faded."), ("PLEA_RESPONSE",)),
    (CallTag.CLOSING, lambda: prompts.closing(SUMMARY, "Guilty"), ("SENTENCE",)),
    (CallTag.REVISED_CLOSING, lambda: prompts.revised_closing(SUMMARY, "Guilty of a Lesser Pettiness", "Sentence reduced"), ("SENTENCE",)),
    (CallTag.CLASSIFY, lambda: prompts.classify(COMPLAINT), ()),
]


def main(argv: list[str]) -> int:
    key = argv[0] if argv else "main"
    spec = MODEL_REGISTRY[key]
    print(f"MODEL {key}: {spec.repo_id}", flush=True)
    from tinycourt.local_client import LocalTransformersClient

    client = LocalTransformersClient(spec)
    for tag, build, required in CALLS:
        tokens = 40 if tag is CallTag.CLASSIFY else 320
        result = client.generate(build(), tag=tag, max_new_tokens=tokens, temperature=0.9)
        parsed = parse_delimited(result.text)
        ok = parsed.ok and all(parsed.get(k) for k in required)
        print(f"\n{'='*72}\n{tag.value}  [{'OK' if ok else 'BAD'}]  "
              f"{result.tokens} tok in {result.seconds:.1f}s ({result.meta.get('tok_s', 0)} tok/s)")
        print(f"--- RAW ---\n{result.text}\n--- /RAW ---", flush=True)
        missing = [k for k in required if not parsed.get(k)]
        if missing:
            print(f"missing keys: {missing}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
