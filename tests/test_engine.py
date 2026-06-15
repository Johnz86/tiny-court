"""End-to-end Quick Trial orchestration with the FakeClient — no GPU.

Proves the loop runs and that the Object! interaction measurably moves the
verdict (design-spec §6, §8.5)."""

import random
from base64 import b64decode
from io import BytesIO

import pytest

from tinycourt.generation import CallTag, GenerationClient, GenerationResult, Message
from tinycourt.engine import (
    _image_data_url,
    add_twist,
    call_witness,
    cross_examine,
    deliver_closing,
    open_case,
    play_arguments,
    raise_objection,
    react,
    robust_call,
    submit_evidence,
    submit_plea,
)
from tinycourt.generation import FakeClient
from tinycourt.trial import TrialState


def _client():
    return FakeClient(seed=0)


def test_full_quick_trial_runs():
    state = TrialState(complaint="My roommate keeps eating my yogurt.")
    client = _client()
    open_case(state, client, rng=random.Random(0))
    assert state.case_title
    assert state.charge
    assert state.meters.suspicion > 0
    play_arguments(state, client)
    roles = {c.role for c in state.transcript}
    assert {"Bailiff", "Prosecutor", "Defense"} <= roles
    submit_evidence(state, client, "The yogurt lid was in their trash.")
    assert state.exhibits
    deliver_closing(state, client)
    assert state.sentence
    assert state.best_quote
    assert state.phase == "verdict"
    assert any(c.role == "Judge" for c in state.transcript)


def test_leniency_plea_raises_mercy_not_guilt():
    # A mercy plea must move the Mercy meter UP and leave guilt (Suspicion /
    # band) untouched — the sentence softens, the verdict stands.
    state = TrialState(complaint="My roommate keeps eating my yogurt.")
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    play_arguments(state, client)
    band_before = state.verdict.band
    suspicion_before = state.meters.suspicion
    mercy_before = state.meters.mercy

    submit_plea(state, client, "leniency", "I am deeply, theatrically sorry.")

    assert state.meters.mercy > mercy_before, "a leniency plea must raise Mercy"
    assert state.meters.suspicion == suspicion_before, "mercy must not touch guilt"
    assert state.verdict.band == band_before, "mercy must not move the verdict band"


def test_evidence_raises_evidence_weight():
    # Submit Evidence builds PROOF (Evidence Weight), the Config B axis — not just
    # Suspicion. An admitted exhibit must add proof to the record.
    state = TrialState(complaint="My roommate keeps eating my yogurt.")
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    play_arguments(state, client)
    before = state.meters.evidence_weight
    submit_evidence(state, client, "The empty cup was in their trash, lid licked clean.")
    assert state.meters.evidence_weight > before, "an admitted exhibit must add proof"


class RecordingClient(GenerationClient):
    name = "recording"

    def __init__(self):
        self.messages: list[Message] = []

    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        self.messages = messages
        return GenerationResult(
            text=(
                "---\n"
                "EXHIBIT: The Uploaded Photo\n"
                "DESCRIPTION: The court inspects the uploaded image.\n"
                "RELEVANCE: Highly suspicious\n"
                "RULING: admitted\n"
                "EVIDENCE_DELTA: +20\n"
                "SUSPICION_DELTA: +8\n"
            ),
            tag=tag,
        )


def test_evidence_can_attach_uploaded_image_content(tmp_path):
    image = tmp_path / "evidence.png"
    image.write_bytes(b"fake-png")
    state = TrialState(complaint="My roommate used the last clean mug.")
    client = RecordingClient()

    submit_evidence(state, client, "Photo evidence", image_paths=[str(image)])

    user_message = client.messages[-1]
    assert isinstance(user_message.content, list)
    assert user_message.content[0]["type"] == "image_url"
    assert user_message.content[0]["image_url"]["url"].startswith("data:image/png;base64,")
    assert user_message.content[1]["type"] == "text"


def test_image_data_url_resizes_valid_images(tmp_path, monkeypatch):
    pil_image = pytest.importorskip("PIL.Image")
    monkeypatch.setenv("TINYCOURT_IMAGE_MAX_SIZE", "64")

    image_path = tmp_path / "large.png"
    pil_image.new("RGBA", (512, 128), (200, 10, 20, 255)).save(image_path)

    data_url = _image_data_url(str(image_path))
    prefix, payload = data_url.split(",", 1)
    decoded = b64decode(payload)
    resized = pil_image.open(BytesIO(decoded))

    assert prefix == "data:image/jpeg;base64"
    assert max(resized.size) <= 64


def test_objection_moves_evidence_weight_with_its_ruling():
    # Objections now act on the PROOF (Evidence Weight), not Suspicion alone
    # (Config B): a SUSTAINED objection discredits proof (down), an OVERRULED one
    # lets it stand (up). The direction guard must follow the ruling whichever
    # canned objection is drawn.
    state = TrialState(complaint="My cat knocked over my coffee.")
    client = FakeClient(seed=1)
    open_case(state, client, rng=random.Random(1))
    play_arguments(state, client)
    before = state.meters.evidence_weight
    raise_objection(state, client)
    assert state.objection_used
    last_judge = [c.text for c in state.transcript if c.role == "Judge"][-1].lower()
    if "sustain" in last_judge:
        assert state.meters.evidence_weight < before, "a sustained objection must discredit proof"
    else:
        assert state.meters.evidence_weight > before, "an overruled objection lets proof stand"


def test_chat_reaction_depletes_patience():
    # Each glass-phase chat send wears down the court's patience (Config D).
    state = TrialState(complaint="My cat knocked over my coffee.")
    client = FakeClient(seed=0)
    before = state.meters.patience
    react(state, client, "case", "It was, I submit, premeditated.")
    assert state.meters.patience < before, "chatter must cost the court patience"


def test_full_trial_composes_suspicion_from_the_case_file():
    # In a Full Trial (Config C), interactions fill the Case File legs and
    # Suspicion is recomposed as their mean — the headline bar is the sum of parts.
    state = TrialState(complaint="My roommate keeps eating my yogurt.", length="full")
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    m = state.meters
    assert m.means > 0 and m.motive > 0 and m.opportunity > 0, "Full Trial fills the Case File"
    assert m.suspicion == round((m.means + m.motive + m.opportunity) / 3), "Suspicion = mean of legs"


def test_quick_trial_leaves_the_case_file_empty():
    # The dense decomposition must never bleed into the default Quick Trial.
    state = TrialState(complaint="My roommate keeps eating my yogurt.")  # length defaults to quick
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    m = state.meters
    assert (m.means, m.motive, m.opportunity) == (0, 0, 0), "Quick Trial keeps the Case File empty"
    assert m.suspicion > 0, "Quick Trial moves Suspicion directly"


def test_witness_lights_motive_and_opportunity_distinctly():
    # A Full Trial witness is the first interaction that moves the Case File legs
    # SEPARATELY (not the spread fallback): Motive and Opportunity both rise, and
    # Suspicion stays the mean of the three legs.
    state = TrialState(complaint="My roommate keeps eating my yogurt.", length="full")
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    m = state.meters
    means_before, motive_before, opp_before = m.means, m.motive, m.opportunity

    call_witness(state, client)

    assert m.motive > motive_before, "the witness must establish Motive"
    assert m.opportunity > opp_before, "the witness must establish Opportunity"
    assert m.means == means_before, "the witness speaks to Motive/Opportunity, not Means"
    assert m.suspicion == round((m.means + m.motive + m.opportunity) / 3), (
        "Suspicion stays the mean of the legs"
    )
    assert any(c.role == "Witness" for c in state.transcript), "testimony enters the transcript"


def test_cross_examination_moves_the_case_file_legs():
    # Cross-examination shakes the legs the witness established and costs patience.
    state = TrialState(complaint="My roommate keeps eating my yogurt.", length="full")
    client = FakeClient(seed=1)
    open_case(state, client, rng=random.Random(1))
    call_witness(state, client)
    legs_before = (state.meters.means, state.meters.motive, state.meters.opportunity)
    patience_before = state.meters.patience

    cross_examine(state, client, "But were you even in the kitchen?")

    legs_after = (state.meters.means, state.meters.motive, state.meters.opportunity)
    assert legs_after != legs_before, "cross-examination must move the Case File legs"
    assert state.meters.patience < patience_before, "cross-examination wears the court's patience"


def test_twist_swings_the_case_file_and_is_once_per_trial():
    # A Full Trial twist swings the Case File (any leg, any direction) and reshapes
    # Severity; it is a once-per-trial complication (twist_used gates it).
    state = TrialState(complaint="My roommate keeps eating my yogurt.", length="full")
    client = FakeClient(seed=0)
    open_case(state, client, rng=random.Random(0))
    legs_before = (state.meters.means, state.meters.motive, state.meters.opportunity)
    severity_before = state.meters.petty_severity

    add_twist(state, client)

    assert state.twist_used, "the twist must be marked used"
    legs_after = (state.meters.means, state.meters.motive, state.meters.opportunity)
    assert legs_after != legs_before, "a twist must swing the Case File"
    assert state.meters.petty_severity != severity_before, "a twist reshapes Petty Severity"
    assert any("twist" in c.text.lower() or c.role == "Court Clerk" for c in state.transcript)


def test_objection_moves_suspicion():
    state = TrialState(complaint="My cat knocked over my coffee.")
    # Force a sustained-objection canned response for determinism.
    client = FakeClient(seed=1)
    open_case(state, client, rng=random.Random(1))
    play_arguments(state, client)
    before = state.meters.suspicion
    # Retry until we draw the SUSTAINED canned objection (lowers suspicion).
    raise_objection(state, client)
    assert state.objection_used
    # Suspicion changed measurably in one direction or the other.
    assert state.meters.suspicion != before


# --- Formatter repair pass (docs/modal-serving-decision.md) -----------------


class _StubClient(GenerationClient):
    """Generates a fixed draft and optionally 'repairs' it into the contract."""

    name = "stub"

    def __init__(self, draft: str, repair_text: str | None = None) -> None:
        self.draft = draft
        self.repair_text = repair_text
        self.repair_calls = 0

    def generate(self, messages, *, tag, max_new_tokens=320, temperature=0.9):
        return GenerationResult(text=self.draft, tag=tag)

    def repair(self, raw_text, *, required_keys, tag):
        self.repair_calls += 1
        if self.repair_text is None:
            return None
        return GenerationResult(text=self.repair_text, tag=tag)


def test_robust_call_uses_formatter_repair_on_bad_parse():
    state = TrialState(complaint="x")
    client = _StubClient(draft="rambling with no fields at all",
                         repair_text="---\nCHARGE: Unauthorized Oat Milk Consumption\n")
    parsed = robust_call(client, [Message("user", "x")], CallTag.CASE_OPEN,
                         required_keys=("CHARGE",), state=state)
    assert client.repair_calls == 1
    assert parsed.get("CHARGE") == "Unauthorized Oat Milk Consumption"
    assert state.fallbacks == []  # repaired, so no canned fallback


def test_robust_call_falls_back_when_no_formatter():
    state = TrialState(complaint="x")
    client = _StubClient(draft="rambling with no fields", repair_text=None)
    parsed = robust_call(client, [Message("user", "x")], CallTag.CASE_OPEN,
                         required_keys=("CHARGE",), state=state)
    assert client.repair_calls == 1  # repair was attempted...
    assert not parsed.get("CHARGE")  # ...but returned None
    assert state.fallbacks == ["case_open"]


def test_robust_call_skips_repair_when_parse_succeeds():
    state = TrialState(complaint="x")
    client = _StubClient(draft="prose\n---\nCHARGE: Snack Theft\n", repair_text="should not be used")
    parsed = robust_call(client, [Message("user", "x")], CallTag.CASE_OPEN,
                         required_keys=("CHARGE",), state=state)
    assert client.repair_calls == 0
    assert parsed.get("CHARGE") == "Snack Theft"
