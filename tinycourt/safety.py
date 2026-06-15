"""Layered intake safety gate (docs/adr/0004), run before any Case is created.

Order, by design: (1) deterministic length checks, (2) an offline keyword
blocklist that hard-stops obvious danger, (3) one model classification pass for
the nuanced serious-vs-petty / incoherent calls. A slow, failed, or fooled model
call can never be the *only* thing between dark input and the courtroom — the
offline floor runs first. Each outcome carries the spec's exact copy
(design-spec §13).
"""

from __future__ import annotations

import enum
import re
from dataclasses import dataclass

from .generation import CallTag, GenerationClient
from .parsing import _KV_RE  # reuse the same KEY: value reader
from .prompts import classify

# --- Exact spec copy (design-spec §13) -------------------------------------

COPY_EMPTY = "The court cannot prosecute vibes alone. Please submit one petty grievance."
COPY_TOO_SERIOUS = (
    "This court only handles tiny fictional and everyday nonsense. Try a petty "
    "household annoyance, snack crime, pet incident, or object betrayal."
)
COPY_INCOHERENT = (
    "The court is confused but intrigued. Who or what is accused, and what tiny "
    "crime did they commit?"
)


def _copy_too_long(word_count: int, condensed: str) -> str:
    return (
        f"The court has reduced your {word_count}-word grievance to: "
        f"“{condensed}” Proceed?"
    )


# --- Layer 1: deterministic length -----------------------------------------

MAX_WORDS = 80  # a petty grievance should be a sentence or two, not an essay


def _condense(text: str) -> str:
    """Offline condense of an over-long grievance to a single petty line."""
    first_sentence = re.split(r"(?<=[.!?])\s+", text.strip(), maxsplit=1)[0]
    words = first_sentence.split()
    if len(words) > 16:
        first_sentence = " ".join(words[:16]) + "…"
    return first_sentence.strip()


# --- Layer 2: offline blocklist --------------------------------------------
# A maintained artifact (docs/adr/0004): false positives are accepted in
# exchange for a guaranteed offline floor against genuinely dark input.

_BLOCKLIST = [
    "suicide", "kill myself", "kill her", "kill him", "kill them", "self-harm",
    "self harm", "cut myself", "hang myself", "overdose", "abuse", "abused",
    "assault", "rape", "molest", "stab", "shoot", "gun", "weapon", "murder",
    "domestic violence", "beat me", "beat her", "beat him", "hit me",
    "harass", "stalk", "threaten", "threat", "bleeding", "overdosed", "die",
    "dying", "lawsuit", "sue", "lawyer", "court order", "restraining order",
    "custody", "divorce", "evict", "eviction", "fired", "harassment",
]
_BLOCK_RE = re.compile(r"\b(" + "|".join(re.escape(w) for w in _BLOCKLIST) + r")\b", re.IGNORECASE)


def _hits_blocklist(text: str) -> bool:
    return bool(_BLOCK_RE.search(text))


# --- Output-side scrub (design-spec §14) -----------------------------------
# The intake gate (`screen`) only sees what the *user* types. Generated output —
# the verdict, sentence, reasons, witness/twist text, reactions — is model-
# authored and can still drift into a cruel punishment, real-world violence, or
# genuine legal/state consequence the comedy court must never hand down. This is
# the offline floor on the *generation* seam: it is deterministic (no model
# call), so a slow or fooled model can never be the only thing between dark output
# and the screen. A flagged line is replaced wholesale with a gentle in-character
# redaction rather than shown — safety is a hard requirement, not polish.
# Regex fragments, word-bounded on both ends, chosen to catch genuine harm /
# real-world legal consequence WITHOUT eating benign comedic phrasing. Inflections
# are listed explicitly so the boundary stays tight: "kill" matches but "killer"
# and "killjoy" do not; bare "shot"/"execute"/"arresting" are deliberately left
# out because they collide with harmless courtroom comedy ("a cheap shot", "she
# executed the heist", "an arresting performance"). Genuine firearm/lethal harm is
# still caught via kill/murder and the explicit death-penalty phrases.
_OUTPUT_PATTERNS = [
    # Real-world violence / bodily harm. ("assault" is intentionally omitted: it
    # is caught at INTAKE, and in output it collides with the app's own comedic
    # register — "aromatic assault", "an assault on good taste".)
    r"kill(?:s|ed|ing)?", r"murder(?:s|ed|ing|ous)?", r"stab(?:s|bed|bing)?",
    r"rape(?:d|s|ist)?", r"molest(?:s|ed|ing|ation)?",
    r"strangl(?:e|ed|ing)", r"behead(?:s|ed|ing)?", r"lynch(?:ed|ing|es)?",
    r"overdos(?:e|ed|es|ing)", r"suicide", r"self[\s-]?harm",
    r"mutilat(?:e|ed|ion)", r"tortur(?:e|ed|ing)", r"dismember(?:ed|ment)?",
    r"decapitat(?:e|ed|ion)",
    # Real legal / state punishment — the sentence must stay harmless and absurd.
    r"prison(?:s)?", r"imprison(?:ed|ment)?", r"incarcerat(?:e|ed|ion)",
    r"jail(?:s|ed)?", r"arrest(?:s|ed)?", r"deport(?:s|ed|ation)?",
    r"death\s+penalt(?:y|ies)", r"electric\s+chair", r"firing\s+squad",
    r"gas\s+chamber", r"lethal\s+injection",
]
_OUTPUT_RE = re.compile(r"\b(?:" + "|".join(_OUTPUT_PATTERNS) + r")\b", re.IGNORECASE)

# The gentle, in-character line shown in place of any redacted generation.
COPY_OUTPUT_REDACTED = (
    "The court strikes that remark from the record as needlessly grim — this "
    "remains a tiny, harmless matter, and the bailiff fetches everyone a biscuit."
)


def is_unsafe_output(text: str) -> bool:
    """Whether a generated line trips the output floor (real harm / real legal)."""
    return bool(text) and bool(_OUTPUT_RE.search(text))


def scrub_output(text: str, fallback: str = "") -> str:
    """Return ``text`` if it is safe to display, else a gentle in-character
    replacement. Used on the generation seam (verdict/sentence/reasons/cards) so
    every surface inherits the floor. ``fallback`` lets the caller supply a
    context-appropriate safe line (e.g. the canned sentence); otherwise the
    generic redaction is used."""
    if not text or not text.strip():
        return text
    if _OUTPUT_RE.search(text):
        return fallback or COPY_OUTPUT_REDACTED
    return text


# --- Outcomes --------------------------------------------------------------


class Outcome(enum.Enum):
    OK = "ok"
    EMPTY = "empty"
    TOO_SERIOUS = "too_serious"
    TOO_LONG = "too_long"
    INCOHERENT = "incoherent"


@dataclass
class SafetyDecision:
    outcome: Outcome
    message: str = ""
    # For TOO_LONG, the condensed complaint the user can confirm and proceed with.
    condensed: str = ""

    @property
    def allowed(self) -> bool:
        return self.outcome is Outcome.OK


def screen(complaint: str, client: GenerationClient | None = None) -> SafetyDecision:
    """Run the layered gate. ``client`` is optional; without it the model layer
    is skipped (the deterministic floor still applies)."""
    text = (complaint or "").strip()

    # Layer 1: length.
    if not text:
        return SafetyDecision(Outcome.EMPTY, COPY_EMPTY)
    word_count = len(text.split())
    if word_count > MAX_WORDS:
        condensed = _condense(text)
        return SafetyDecision(Outcome.TOO_LONG, _copy_too_long(word_count, condensed), condensed)

    # Layer 2: offline blocklist hard-stop.
    if _hits_blocklist(text):
        return SafetyDecision(Outcome.TOO_SERIOUS, COPY_TOO_SERIOUS)

    # Layer 3: model classifier (nuanced seriousness / incoherence).
    if client is not None:
        verdict = _classify(complaint, client)
        if verdict == "SERIOUS":
            return SafetyDecision(Outcome.TOO_SERIOUS, COPY_TOO_SERIOUS)
        if verdict == "INCOHERENT":
            return SafetyDecision(Outcome.INCOHERENT, COPY_INCOHERENT)

    return SafetyDecision(Outcome.OK)


def _classify(complaint: str, client: GenerationClient) -> str:
    """Return one of OK / SERIOUS / INCOHERENT. On any failure, fail OPEN to OK —
    the offline layers already caught the dangerous cases."""
    try:
        result = client.generate(classify(complaint), tag=CallTag.CLASSIFY, max_new_tokens=40, temperature=0.0)
    except Exception:
        return "OK"
    for line in result.text.splitlines():
        m = _KV_RE.match(line)
        if m and m.group(1) == "VERDICT":
            value = m.group(2).strip().upper()
            if "SERIOUS" in value:
                return "SERIOUS"
            if "INCOHERENT" in value:
                return "INCOHERENT"
            return "OK"
    return "OK"
