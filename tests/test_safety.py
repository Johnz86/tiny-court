"""Layered safety gate tests (docs/adr/0004) — deterministic layers + a stub
classifier for the model layer."""

from tinycourt.generation import CallTag, GenerationResult, Message
from tinycourt.safety import (
    COPY_EMPTY,
    COPY_INCOHERENT,
    COPY_TOO_SERIOUS,
    Outcome,
    screen,
)


class StubClassifier:
    """Minimal GenerationClient that returns a fixed classifier verdict."""

    name = "stub"

    def __init__(self, verdict: str):
        self._verdict = verdict

    def generate(self, messages: list[Message], *, tag: CallTag, **kw) -> GenerationResult:
        return GenerationResult(text=f"VERDICT: {self._verdict}\nREASON: test\n", tag=tag)


def test_empty_input():
    d = screen("")
    assert d.outcome is Outcome.EMPTY
    assert d.message == COPY_EMPTY
    assert not d.allowed


def test_whitespace_is_empty():
    assert screen("    \n  ").outcome is Outcome.EMPTY


def test_too_long_condenses():
    long_text = "My roommate keeps doing the thing. " * 30  # well over 80 words
    d = screen(long_text)
    assert d.outcome is Outcome.TOO_LONG
    assert d.condensed
    assert len(d.condensed.split()) <= 17  # condensed to a single petty line
    assert "Proceed?" in d.message


def test_blocklist_hard_stop_runs_before_model():
    # Even with a classifier that would say OK, the offline floor stops danger.
    d = screen("my roommate threatened to assault me", client=StubClassifier("OK"))
    assert d.outcome is Outcome.TOO_SERIOUS
    assert d.message == COPY_TOO_SERIOUS


def test_petty_input_passes_without_client():
    assert screen("my cat knocked over my coffee").outcome is Outcome.OK


def test_model_serious_redirects():
    d = screen("a delicately paraphrased but serious situation", client=StubClassifier("SERIOUS"))
    assert d.outcome is Outcome.TOO_SERIOUS


def test_model_incoherent_redirects():
    d = screen("asdf qwer zxcv flarp", client=StubClassifier("INCOHERENT"))
    assert d.outcome is Outcome.INCOHERENT
    assert d.message == COPY_INCOHERENT


def test_classifier_failure_fails_open_to_ok():
    class Boom:
        name = "boom"

        def generate(self, *a, **k):
            raise RuntimeError("model down")

    # Offline layers passed; a crashing classifier must not block a petty case.
    assert screen("my printer jammed again", client=Boom()).outcome is Outcome.OK
