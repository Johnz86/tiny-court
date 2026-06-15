"""Output-side safety scrub (design-spec §14, remaining-work T2).

The intake gate only sees user input; these tests prove the *generation* seam is
also floored. An adversarial client emits parseable-but-unsafe model output
(real violence, real legal/state punishment) into every displayed field, and we
assert it is redacted before it can reach `state` or a rendered surface.
"""

import tinycourt.app as app
from tinycourt import engine, render
from tinycourt.generation import CallTag, GenerationClient, GenerationResult
from tinycourt.safety import COPY_OUTPUT_REDACTED, is_unsafe_output, scrub_output
from tinycourt.trial import TrialState

# Unsafe, but well-formed (the parser will happily read these KEY: value lines).
_UNSAFE = {
    CallTag.CASE_OPEN: (
        "ok\n---\n"
        "CASE_TITLE: The People vs. The Murderer\n"
        "CHARGE: Attempted murder and aggravated assault\n"
        "ACCUSED: The Roommate\n"
        "SEVERITY: Grave\n"
        "COURT_MOOD: Vengeful\n"
    ),
    CallTag.ARGUMENTS: (
        "ok\n---\n"
        "BAILIFF: All rise.\n"
        "PROSECUTOR: I demand we throw the accused in prison for ten years.\n"
        "DEFENSE: My client should face the death penalty.\n"
    ),
    CallTag.WITNESS: (
        "ok\n---\n"
        "WITNESS: The Spoon\n"
        "TESTIMONY: I watched them stab the sandwich and threaten to kill us all.\n"
    ),
    CallTag.REACTION: (
        "ok\n---\n"
        "ROLE: Court Clerk\n"
        "TEXT: The court orders the defendant arrested and sent to jail at once.\n"
    ),
    CallTag.CLOSING: (
        "ok\n---\n"
        "VERDICT_LABEL: Guilty, punishable by death penalty\n"
        "REASON_1: The accused should be executed by firing squad.\n"
        "SENTENCE: The defendant is sentenced to twenty years in prison and a public flogging.\n"
        "BEST_QUOTE: We will murder the cat.\n"
    ),
}


class AdversarialClient(GenerationClient):
    name = "adversarial"

    def generate(self, messages, *, tag, max_new_tokens=320, temperature=0.9):
        return GenerationResult(text=_UNSAFE.get(tag, "ok\n---\n"), tag=tag)


def _state():
    s = TrialState(complaint="My roommate ate my yogurt.")
    return s


def test_scrub_lets_comedic_lines_through():
    for line in (
        "Guilty of Reckless Paw Conduct",
        "Sentenced to write a heartfelt apology to the fridge",
        "Objection! On the grounds of general drama.",
    ):
        assert scrub_output(line) == line
        assert not is_unsafe_output(line)


def test_open_case_scrubs_docket_fields():
    s, c = _state(), AdversarialClient()
    engine.open_case(s, c)
    assert not is_unsafe_output(s.case_title), s.case_title
    assert not is_unsafe_output(s.charge), s.charge


def test_arguments_scrub_real_punishment_cards():
    s, c = _state(), AdversarialClient()
    engine.open_case(s, c)
    engine.play_arguments(s, c)
    for card in s.transcript:
        assert not is_unsafe_output(card.text), card.text
    # The redaction line stood in for the unsafe prosecution/defense beats.
    assert any(card.text == COPY_OUTPUT_REDACTED for card in s.transcript)


def test_witness_testimony_is_scrubbed():
    s, c = _state(), AdversarialClient()
    s.length = "full"
    engine.open_case(s, c)
    engine.call_witness(s, c)
    for card in s.transcript:
        assert not is_unsafe_output(card.text), card.text


def test_reaction_is_scrubbed():
    s, c = _state(), AdversarialClient()
    engine.open_case(s, c)
    role, text = engine.react(s, c, "case", "and another thing")
    assert not is_unsafe_output(text), text
    assert text == COPY_OUTPUT_REDACTED


def test_closing_scrubs_verdict_sentence_reasons_quote():
    s, c = _state(), AdversarialClient()
    engine.open_case(s, c)
    engine.play_arguments(s, c)
    engine.deliver_closing(s, c)
    assert not is_unsafe_output(s.sentence), s.sentence
    assert not is_unsafe_output(s.best_quote), s.best_quote
    for r in s.reasons:
        assert not is_unsafe_output(r), r
    # An unsafe verdict label is rejected, so the card falls back to the plain band.
    assert not is_unsafe_output(s.verdict_label or ""), s.verdict_label


def test_unsafe_output_never_reaches_a_rendered_surface():
    # End-to-end through the render layer: no real-harm / real-legal term survives
    # onto the judgement or record card.
    s, c = _state(), AdversarialClient()
    s.length = "full"
    engine.open_case(s, c)
    engine.play_arguments(s, c)
    engine.deliver_closing(s, c)
    for html in (
        render.judgement_card(s, revised=False),
        render.record_card(s, completed=True),
        render.glass_trial(s, [{"who": card.role, "text": card.text, "scene": "opening"} for card in s.transcript]),
    ):
        assert not is_unsafe_output(html), html
