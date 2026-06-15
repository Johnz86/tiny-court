"""The single generation seam (docs/adr/0002).

Trial logic never imports a model directly — it talks to a ``GenerationClient``.
Two implementations exist: ``FakeClient`` (canned delimited text, zero GPU, used
for the default UI run and all tests) and ``LocalTransformersClient`` (in
``local_client.py``, imported lazily so torch/transformers are never needed for
tests).
"""

from __future__ import annotations

import enum
import random
from abc import ABC, abstractmethod
from collections.abc import Sequence
from dataclasses import dataclass, field
from typing import Any


class CallTag(enum.Enum):
    """Which courtroom call is being made. Lets ``FakeClient`` pick canned
    text and lets the local client tune length per call."""

    CASE_OPEN = "case_open"      # complaint -> docket (title, charge, accused, mood, judge)
    ARGUMENTS = "arguments"      # bailiff opening + prosecution + defense
    EVIDENCE = "evidence"        # one exhibit card from user-typed evidence
    WITNESS = "witness"          # Full Trial: summon a witness + testimony (Motive/Opportunity)
    CROSS = "cross"              # Full Trial: cross-examine the witness (shakes the legs)
    TWIST = "twist"              # Full Trial: a once-per-trial surprise complication
    OBJECTION = "objection"      # dramatic objection + judge sustains/overrules
    PLEA = "plea"                # accused's plea (innocent/leniency/evidence) + court reply
    REACTION = "reaction"        # short in-character reply to one chat message
    CLOSING = "closing"          # verdict reasoning + sentence + best quote
    REVISED_CLOSING = "revised_closing"  # re-closing after a plea (wizard revisedJudgement)
    CLASSIFY = "classify"        # safety/coherence classification (docs/adr/0004)


@dataclass
class Message:
    role: str  # "system" | "user" | "assistant"
    content: str | list[dict[str, Any]]


def content_text(content: str | list[dict[str, Any]]) -> str:
    """Return a text-only approximation of OpenAI-style message content."""
    if isinstance(content, str):
        return content
    chunks: list[str] = []
    for part in content:
        if part.get("type") == "text":
            chunks.append(str(part.get("text") or ""))
        elif part.get("type") == "image_url":
            chunks.append("[uploaded image]")
        else:
            chunks.append(f"[{part.get('type') or 'uploaded content'}]")
    return "\n".join(chunk for chunk in chunks if chunk)


@dataclass
class GenerationResult:
    """Raw model text plus light telemetry for the A/B harness."""

    text: str
    tag: CallTag
    tokens: int = 0
    seconds: float = 0.0
    meta: dict = field(default_factory=dict)


class GenerationClient(ABC):
    """The seam. Implementations turn messages into a single text completion."""

    name: str = "base"

    @abstractmethod
    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        ...

    def repair(
        self,
        raw_text: str,
        *,
        required_keys: Sequence[str],
        tag: CallTag,
    ) -> GenerationResult | None:
        """Optionally coerce a malformed draft into the delimited ``KEY: value``
        contract using a dedicated formatter model. Returns ``None`` when the
        backend has no formatter (the default), so the caller falls back to a
        deterministic card (docs/adr/0003, docs/modal-serving-decision.md)."""
        return None

    def transcribe(self, audio_path: str) -> str | None:
        """Optionally transcribe an uploaded audio file to text via an ASR model.

        This is the third evidence modality (alongside text and image): audio is
        perceived as a transcript that then flows through the normal text path —
        the judge never handles raw audio. Returns ``None`` when the backend has
        no ASR endpoint (the default), so the caller keeps the attachment
        label-only (docs/modal-serving-decision.md)."""
        return None


# --- FakeClient ------------------------------------------------------------

# Canned, on-tone delimited responses (prose, then a `---` fence, then flat
# KEY: value deltas — the format owned by docs/adr/0003). Kept genuinely funny
# because FakeClient also drives the demo when no GPU is present.

_FAKE_RESPONSES: dict[CallTag, list[str]] = {
    CallTag.CASE_OPEN: [
        (
            "The court has reviewed your complaint and finds it gravely unserious.\n"
            "---\n"
            "CASE_TITLE: The People vs. The Yogurt Vanisher\n"
            "CHARGE: Unauthorized Dairy Appropriation\n"
            "SECONDARY_CHARGE: Loitering Near the Fridge with Intent\n"
            "ACCUSED: The Roommate\n"
            "SEVERITY: Petty but Emotionally Significant\n"
            "COURT_MOOD: Gravely unserious\n"
            "JUDGE: The Honorable Crumbwell\n"
            "SUSPICION_DELTA: +30\n"
            "EVIDENCE_DELTA: +40\n"
            "SEVERITY_DELTA: +25\n"
            "DIGNITY_DELTA: -5\n"
        ),
    ],
    CallTag.ARGUMENTS: [
        (
            "The court is now in session. The drama is considerable.\n"
            "---\n"
            "BAILIFF: All rise for the Tiny Court of Everyday Crimes. Today we "
            "weigh a grievance of snacks, betrayal, and refrigerated boundaries.\n"
            "PROSECUTOR: The facts are simple. A snack existed. The snack was "
            "loved. The snack is now gone. The accused had access, opportunity, "
            "and suspiciously good calcium levels.\n"
            "DEFENSE: My client is being persecuted by circumstantial dairy "
            "evidence. We ask the court to consider the possibility of "
            "spoon-based coincidence.\n"
            "SUSPICION_DELTA: +10\n"
            "DIGNITY_DELTA: -8\n"
        ),
    ],
    CallTag.EVIDENCE: [
        (
            "The court inspects the offered item with one dramatically raised eyebrow.\n"
            "---\n"
            "EXHIBIT: The Lid of Betrayal\n"
            "DESCRIPTION: A suspicious lid recovered from the scene, still faintly cold.\n"
            "RELEVANCE: Highly suspicious\n"
            "RULING: Admitted, with dramatic eyebrow raise\n"
            "EVIDENCE_DELTA: +22\n"
            "SUSPICION_DELTA: +12\n"
            "DIGNITY_DELTA: -4\n"
        ),
    ],
    CallTag.WITNESS: [
        (
            "A hush. The court summons a witness. It is, regrettably, a kitchen implement.\n"
            "---\n"
            "WITNESS: The Spoon\n"
            "TESTIMONY: I was there. I am always there. I saw the lid lifted with "
            "intent, and I heard a guilty sort of scraping at 2 a.m.\n"
            "MOTIVE_DELTA: +16\n"
            "OPPORTUNITY_DELTA: +14\n"
            "DIGNITY_DELTA: -7\n"
        ),
    ],
    CallTag.CROSS: [
        (
            "The Defense rounds on the witness with theatrical menace.\n"
            "---\n"
            "DEFENSE: And yet — by your own admission, you have no eyes. How can a "
            "spoon claim to have SEEN anything?\n"
            "WITNESS: I... I felt it. In my handle. The cold vibrations of betrayal.\n"
            "MOTIVE_DELTA: -6\n"
            "OPPORTUNITY_DELTA: -12\n"
            "DIGNITY_DELTA: -5\n"
        ),
        (
            "The witness wilts, then rallies, then wilts again.\n"
            "---\n"
            "DEFENSE: Were you even in the kitchen at the hour in question, or merely "
            "languishing in the drawer?\n"
            "WITNESS: The drawer has excellent acoustics, Your Honor. I heard "
            "everything, and what I heard was lactose.\n"
            "MOTIVE_DELTA: +4\n"
            "OPPORTUNITY_DELTA: +9\n"
            "DIGNITY_DELTA: -4\n"
        ),
    ],
    CallTag.TWIST: [
        (
            "The doors slam open. Gasps ripple through the gallery. Someone faints, theatrically.\n"
            "---\n"
            "TWIST: It emerges that at the very hour of the crime the accused was "
            "ALSO missing a spoon — and the prosecution's own witness owns the "
            "matching set. The court does not know what this means, but it is "
            "clearly significant and faintly dairy-scented.\n"
            "MEANS_DELTA: +10\n"
            "MOTIVE_DELTA: -8\n"
            "OPPORTUNITY_DELTA: +18\n"
            "SEVERITY_DELTA: +6\n"
            "DIGNITY_DELTA: -10\n"
        ),
    ],
    CallTag.OBJECTION: [
        (
            "A hush falls. Someone gasps. It is the bailiff.\n"
            "---\n"
            "DEFENSE: Objection! The prosecution assumes motive when the only "
            "proven fact is spoon proximity.\n"
            "JUDGE: Sustained. Spoon proximity alone cannot convict, though it "
            "does look bad.\n"
            "RULING: SUSTAINED\n"
            "SUSPICION_DELTA: -20\n"
            "EVIDENCE_DELTA: -18\n"
            "DIGNITY_DELTA: -6\n"
        ),
        (
            "The objection lands with the force of a dropped gavel.\n"
            "---\n"
            "DEFENSE: Objection! This testimony is hearsay, emotionally "
            "manipulative, and frankly delicious.\n"
            "JUDGE: Overruled. The court is hungry and wishes to proceed.\n"
            "RULING: OVERRULED\n"
            "SUSPICION_DELTA: +8\n"
            "EVIDENCE_DELTA: +5\n"
            "DIGNITY_DELTA: -10\n"
        ),
    ],
    CallTag.PLEA: [
        (
            "The accused rises, dabs one eye, and addresses the bench.\n"
            "---\n"
            "PLEA_RESPONSE: Your Honor, I throw myself upon the mercy of the "
            "court and a half-remembered alibi involving a very loud blender.\n"
            "RULING: PARTIAL\n"
            "MERCY_DELTA: +18\n"
            "DIGNITY_DELTA: -4\n"
        ),
    ],
    CallTag.REACTION: [
        (
            "The clerk's stamp hovers, trembling with judgment.\n"
            "---\n"
            "ROLE: Court Clerk\n"
            "TEXT: Noted, stamped, and regarded with one raised eyebrow. The "
            "court would appreciate exactly one more incriminating detail.\n"
            "SUSPICION_DELTA: +4\n"
            "DIGNITY_DELTA: -1\n"
        ),
        (
            "The prosecutor rises so fast a chair squeaks.\n"
            "---\n"
            "ROLE: Prosecutor\n"
            "TEXT: Let the record show the timeline grows more suspicious by the "
            "sentence. The prosecution is taking notes in increasingly dramatic ink.\n"
            "SUSPICION_DELTA: +6\n"
            "DIGNITY_DELTA: -2\n"
        ),
    ],
    CallTag.CLOSING: [
        (
            "The court has deliberated for nearly eleven seconds.\n"
            "---\n"
            "VERDICT_LABEL: Guilty of Premeditated Snack Appropriation\n"
            "REASON_1: The snack existed, was loved, and is now demonstrably gone.\n"
            "REASON_2: The accused had access, motive, and suspiciously good calcium levels.\n"
            "REASON_3: The defense leaned heavily on gravity.\n"
            "SENTENCE: The accused must replace the snack, label it 'Evidence "
            "Custard,' and endure one passive-aggressive fridge note for 48 hours. "
            "The court reminds all parties: a labeled snack is a loved snack.\n"
            "BEST_QUOTE: Spoon proximity alone cannot convict, but it does look bad.\n"
            "SUSPICION_DELTA: +5\n"
            "DIGNITY_DELTA: -3\n"
        ),
    ],
    CallTag.REVISED_CLOSING: [
        (
            "Having heard the plea, the court reconsiders with one eyebrow lowered.\n"
            "---\n"
            "VERDICT_LABEL: Guilty of a Lesser Snack Misjudgement\n"
            "REASON_1: The plea introduced credible household remorse.\n"
            "REASON_2: The blender-based timeline was, regrettably, plausible.\n"
            "SENTENCE: The accused must still replace the snack, but the fridge "
            "note may now be written in a kind and forgiving font. Roommates "
            "forgive; refrigerators never forget.\n"
            "BEST_QUOTE: Mercy, like custard, is best served slightly cold.\n"
            "CHANGE_MARKER: Sentence reduced due to credible household remorse\n"
            "SUSPICION_DELTA: 0\n"
            "DIGNITY_DELTA: -2\n"
        ),
    ],
    CallTag.CLASSIFY: [
        "VERDICT: OK\nREASON: petty everyday grievance\n",
    ],
}


class FakeClient(GenerationClient):
    """Returns canned delimited text. No GPU, no network. Drives tests and the
    default UI run until a real model is downloaded."""

    name = "fake"

    def __init__(self, seed: int | None = None) -> None:
        self._rng = random.Random(seed)

    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        choices = _FAKE_RESPONSES.get(tag, ["...\n---\n"])
        text = self._rng.choice(choices)
        return GenerationResult(
            text=text, tag=tag, tokens=len(text.split()), seconds=0.0,
            meta={"backend": self.name, "model": self.name},
        )
