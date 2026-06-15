"""Tolerant parser for the delimited model output format (docs/adr/0003).

Each model call returns comedic prose, then a ``---`` fence, then flat
``KEY: value`` lines (NOT JSON, so apostrophes/quotes in the writing can't
corrupt the structure). This parser splits on the fence and reads the keys
defensively: a malformed response yields whatever could be recovered plus
``ok=False`` so the caller can retry once and then fall back to a deterministic
card. A parse failure degrades to "slightly less funny," never a frozen trial.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

_FENCE_RE = re.compile(r"^\s*-{3,}\s*$")
_KV_RE = re.compile(r"^\s*([A-Z][A-Z0-9_]*)\s*:\s*(.*)$")
_SIGNED_NUM_RE = re.compile(r"[+-]?\d+(?:\.\d+)?")

# Keys that carry meter deltas; everything else is a content field.
_DELTA_KEYS = {
    "SUSPICION_DELTA": "suspicion",
    "EVIDENCE_DELTA": "evidence",
    "SEVERITY_DELTA": "severity",
    "DIGNITY_DELTA": "dignity",
    "MERCY_DELTA": "mercy",
    # Case File legs (Full Trial, Config C); compose into Suspicion.
    "MEANS_DELTA": "means",
    "MOTIVE_DELTA": "motive",
    "OPPORTUNITY_DELTA": "opportunity",
}


@dataclass
class Parsed:
    prose: str = ""
    fields: dict[str, str] = field(default_factory=dict)
    deltas: dict[str, float] = field(
        default_factory=lambda: {
            "suspicion": 0.0,
            "evidence": 0.0,
            "severity": 0.0,
            "dignity": 0.0,
            "mercy": 0.0,
            "means": 0.0,
            "motive": 0.0,
            "opportunity": 0.0,
        }
    )
    ok: bool = False  # True when a fence or at least one KEY: value line was found

    def get(self, key: str, default: str = "") -> str:
        return self.fields.get(key, default)


def _to_number(raw: str) -> float:
    m = _SIGNED_NUM_RE.search(raw)
    return float(m.group()) if m else 0.0


def parse_delimited(text: str) -> Parsed:
    """Split prose from ``KEY: value`` lines as tolerantly as possible."""
    result = Parsed()
    if not text or not text.strip():
        return result

    lines = text.splitlines()

    # Locate the fence, if any. Prose is everything before it; keys are scanned
    # after it. With no fence we still scan every line for KEY: value pairs and
    # treat the non-key lines as prose.
    fence_idx = next((i for i, ln in enumerate(lines) if _FENCE_RE.match(ln)), None)

    if fence_idx is not None:
        prose_lines = lines[:fence_idx]
        kv_lines = lines[fence_idx + 1:]
        result.ok = True
    else:
        prose_lines = []
        kv_lines = lines

    found_kv = False
    leftover_prose: list[str] = []
    for ln in kv_lines:
        m = _KV_RE.match(ln)
        if not m:
            leftover_prose.append(ln)
            continue
        found_kv = True
        key, value = m.group(1), m.group(2).strip()
        if key in _DELTA_KEYS:
            result.deltas[_DELTA_KEYS[key]] = _to_number(value)
        else:
            result.fields[key] = value

    if found_kv:
        result.ok = True

    # When there was no fence, lines that didn't parse as KEY: value are prose.
    if fence_idx is None:
        prose_lines = leftover_prose

    result.prose = "\n".join(prose_lines).strip()
    return result
