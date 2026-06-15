"""End-to-end wizard flow through the REAL handlers (do_begin / do_send /
do_action_by_id) with the FakeClient — no GPU, no network.

Exercises the one-growing-transcript model (docs/full-trial-conversation-flow.md):
  * the glass `trial` surface GROWS across scenes — nothing is cleared,
  * optional scenes (evidence/witness/twist/objection) are MOVES that append and
    stay in glass; only the verdict leaves glass for paper,
  * Fast Judgement / Deliver the Verdict is reachable from the first moment,
  * the dynamic-timeline stepper only gains a pip once its scene happens,
  * the judgement carries LLM-supplied reasons + a sentence; the appeal revises
    it and the record completes,
  * no call fell back to canned text (FakeClient always parses),
  * genuinely serious chat input is redirected, never entered into the record.
"""

import tinycourt.app as app
from tinycourt.app import C, WizardState, do_action_by_id, do_begin, do_send
from tinycourt.generation import FakeClient
from tinycourt.safety import COPY_TOO_SERIOUS
from tinycourt.trial import COURT_VOICES

# Build once: populates the module-level component registry C that render() uses.
DEMO = app.build_demo()


def _fresh_wiz(length="quick"):
    app._CLIENT = FakeClient(seed=7)
    out = do_begin(WizardState(), length)
    return out[C["st"]]


def _send(wiz, text):
    out = do_send(wiz, {"text": text, "files": []})
    return out[C["st"]], out


def _act(wiz, action_id, text=""):
    out = do_action_by_id(wiz, action_id, text)
    return out[C["st"]], out


# --- The material model -----------------------------------------------------


def test_begin_opens_the_one_glass_trial():
    wiz = _fresh_wiz()
    assert wiz.wiz_phase == "trial"
    assert wiz.focus == "case"
    # The case-scene framing line is seeded into the conversation as a real
    # message, not a header — it is the first event in the record.
    assert wiz.events and wiz.events[0]["scene"] == "case"


def test_case_send_gets_court_reply():
    wiz = _fresh_wiz()
    wiz, out = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    case_events = [e for e in wiz.events if e.get("scene") == "case"]
    whos = [e["who"] for e in case_events]
    assert "Complaint" in whos, "user message must enter the chat"
    assert any(w in COURT_VOICES for w in whos), "the court must talk back"
    surface = out[C["surface"]]
    assert "yogurt" in surface
    assert surface.count("court-message") >= 2


def test_fast_judgement_reachable_from_message_one():
    # The terminal verdict is available straight after the complaint, without
    # touching evidence/witness/twist (the bored-user escape hatch, flow doc §3).
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    # No intervening moves — ask for the ruling immediately.
    wiz, out = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement"
    assert wiz.trial.sentence and wiz.trial.best_quote
    assert wiz.trial.fallbacks == []
    assert "The court finds" in out[C["surface"]]


def test_only_the_verdict_leaves_glass_for_paper():
    # Every optional move keeps the user in the glass `trial`; only Ask the Judge
    # goes to paper.
    wiz = _fresh_wiz("full")
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    for move in ("submit_evidence", "call_witness", "cross_examine", "object", "add_twist"):
        wiz, _ = _act(wiz, move)
        assert wiz.wiz_phase == "trial", f"{move} must stay in glass, not go to paper"
    wiz, _ = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement", "only the verdict leaves glass"


# --- One continuous transcript ----------------------------------------------


def test_transcript_is_continuous_across_evidence_witness_twist():
    # Walking evidence → witness → twist must NEVER clear earlier messages: the
    # complaint and every scene stay in the one record (flow doc §1, §2).
    wiz = _fresh_wiz("full")
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")

    wiz, _ = _act(wiz, "submit_evidence")
    wiz, _ = _send(wiz, "The empty cup was in their trash, lid licked clean.")
    wiz, _ = _act(wiz, "call_witness")
    wiz, _ = _act(wiz, "add_twist")

    scenes = {e.get("scene") for e in wiz.events}
    assert {"case", "evidence", "witness", "twist"} <= scenes, "every scene must remain in the record"

    # The earliest messages are still present in the one rendered transcript.
    glass = app.view.glass_trial(wiz.trial, wiz.events, focus="twist")
    assert "yogurt" in glass, "the original complaint must still be in the transcript"
    assert "trash" in glass, "the evidence detail must still be in the transcript"
    # Scene dividers appear for the optional scenes that happened.
    assert "Evidence" in glass and "Twist!" in glass


def test_optional_scene_dividers_only_appear_when_the_scene_happens():
    # A session with no twist must show no Twist! divider (flow doc §3).
    wiz = _fresh_wiz("full")
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt.")
    wiz, _ = _act(wiz, "submit_evidence")
    wiz, _ = _send(wiz, "The cup was in their trash.")
    glass = app.view.glass_trial(wiz.trial, wiz.events, focus="evidence")
    assert "Evidence" in glass
    assert "Twist!" not in glass, "no twist happened — no Twist! divider"
    assert "The Witness" not in glass, "no witness was called — no Witness divider"


def test_stepper_only_gains_a_pip_once_the_scene_occurs():
    # The dynamic timeline (design B) inserts an optional pip only when its scene
    # has happened; a quick complaint-only session shows no Witness/Twist pip.
    wiz = _fresh_wiz("full")
    wiz, out = _send(wiz, "My roommate keeps eating my yogurt.")
    stepper = out[C["stepper"]]
    assert "Witness" not in stepper and "Twist" not in stepper
    assert "Verdict" in stepper, "the terminal Verdict anchor is always shown"

    wiz, _ = _act(wiz, "call_witness")
    wiz, out = _act(wiz, "add_twist")
    stepper = out[C["stepper"]]
    assert "Witness" in stepper, "the Witness pip appears once a witness is called"
    assert "Twist" in stepper, "the Twist pip appears once a twist happens"


# --- Object! is inline ------------------------------------------------------


def test_object_stays_in_glass_and_appends_inline():
    # Object! must append the Defense/Judge exchange to the flow and STAY in glass
    # — not jump to the plea screen (today's surprising behaviour, flow doc §6).
    wiz = _fresh_wiz("full")
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    wiz, _ = _act(wiz, "call_witness")  # puts a Prosecutor/Witness statement on record
    wiz, out = _act(wiz, "object")
    assert wiz.wiz_phase == "trial", "Object! must stay in the glass trial"
    obj_events = [e for e in wiz.events if e.get("scene") == "objection"]
    assert any(e["who"] == "Judge" for e in obj_events), "the judge must rule on the objection inline"
    assert "Objection!" in out[C["surface"]], "the objection scene divider must render"


# --- Full Trial moves -------------------------------------------------------


def test_full_trial_witness_then_cross_then_verdict():
    wiz = _fresh_wiz("full")
    assert wiz.trial.is_full
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    assert any(a["id"] == "call_witness" for a in app._actions_for(wiz)), (
        "Full Trial must offer Call Witness while no witness stands"
    )

    wiz, out = _act(wiz, "call_witness")
    assert wiz.focus == "witness"
    assert any(c.role == "Witness" for c in wiz.trial.transcript), "a witness is summoned"
    assert any(e["who"] == "Witness" and e.get("scene") == "witness" for e in wiz.events)
    assert "Witness" in out[C["stepper"]]
    # Once a witness stands, the move becomes Cross-examine, not Call Witness.
    assert any(a["id"] == "cross_examine" for a in app._actions_for(wiz))

    legs_before = (wiz.trial.meters.motive, wiz.trial.meters.opportunity)
    wiz, _ = _act(wiz, "cross_examine")
    assert wiz.wiz_phase == "trial", "cross-examination stays in glass"
    assert (wiz.trial.meters.motive, wiz.trial.meters.opportunity) != legs_before

    wiz, _ = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement"
    assert wiz.trial.sentence
    assert wiz.trial.fallbacks == []


def test_twist_is_once_per_trial():
    wiz = _fresh_wiz("full")
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    assert any(a["id"] == "add_twist" for a in app._actions_for(wiz))

    legs_before = (wiz.trial.meters.means, wiz.trial.meters.opportunity)
    wiz, out = _act(wiz, "add_twist")
    assert wiz.trial.twist_used
    assert (wiz.trial.meters.means, wiz.trial.meters.opportunity) != legs_before
    assert "Twist" in out[C["stepper"]]
    # The twist is no longer offered.
    assert not any(a["id"] == "add_twist" for a in app._actions_for(wiz))
    # A second attempt is gently refused.
    _, out2 = _act(wiz, "add_twist")
    assert "one twist" in out2.get(C["toast"], "")


def test_quick_trial_never_offers_witness_or_twist():
    wiz = _fresh_wiz("quick")
    assert not wiz.trial.is_full
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt.")
    ids = {a["id"] for a in app._actions_for(wiz)}
    assert "call_witness" not in ids and "add_twist" not in ids
    # The Quick minimal path is Complaint → Verdict → Sentence.
    wiz, _ = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement"
    wiz, _ = _act(wiz, "accept")
    assert wiz.wiz_phase == "sentence"
    assert not any(c.role == "Witness" for c in wiz.trial.transcript)


def test_evidence_send_creates_exhibit_and_clerk_ruling():
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt.")
    wiz, _ = _act(wiz, "submit_evidence")
    assert wiz.focus == "evidence"

    wiz, out = _send(wiz, "The empty cup was in their trash, lid licked clean.")
    assert wiz.trial.exhibits, "evidence send must create an exhibit"
    ev_events = [e for e in wiz.events if e.get("scene") == "evidence"]
    assert any(e["who"] == "Court Clerk" and "Exhibit" in e["text"] for e in ev_events), (
        "the clerk's exhibit ruling must appear in the chat"
    )
    assert "Exhibit" in out[C["surface"]]

    wiz, out = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement"
    assert wiz.trial.sentence
    # The evidence moved the needle since charges were filed — the FIRST
    # judgement must show that movement (review follow-up).
    assert any(abs(v) >= 1 for v in wiz.meter_deltas.values())
    assert "meter-delta" in out[C["surface"]]


# --- Appeal: one post-paper return to glass ---------------------------------


def test_appeal_revises_the_verdict_and_appends_continuously():
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    wiz, _ = _act(wiz, "ask_judge")
    assert wiz.wiz_phase == "judgement"

    # Appeal from the paper ruling returns to the SAME glass transcript under an
    # Appeal scene (flow doc §8).
    wiz, _ = _act(wiz, "request_leniency")
    assert wiz.wiz_phase == "trial" and wiz.focus == "plea"
    assert any(e.get("scene") == "appeal" for e in wiz.events), "the appeal opens with a Judge prompt"

    wiz, out = _send(wiz, "I admit partial guilt, but the yogurt was emotionally available.")
    appeal_events = [e for e in wiz.events if e.get("scene") == "appeal"]
    assert any(e["who"] in COURT_VOICES for e in appeal_events), "the judge reacts to the plea"

    wiz, out = _act(wiz, "submit_plea")
    assert wiz.wiz_phase == "revisedJudgement"
    assert wiz.plea_rounds == 1
    assert wiz.revision_marker
    assert wiz.trial.fallbacks == []
    assert "Appeal" in out[C["stepper"]], "the Appeal pip appears once an appeal happens"

    wiz, out = _act(wiz, "finalize")
    assert wiz.wiz_phase == "sentence"
    surface = out[C["surface"]]
    assert "Court Record" in surface
    assert "Tiny Court Certified" in surface


def test_leniency_plea_shows_a_mercy_delta_on_the_revised_card():
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    wiz, _ = _act(wiz, "ask_judge")
    wiz, _ = _act(wiz, "request_leniency")
    wiz, _ = _send(wiz, "I am sorry, the yogurt was simply too emotionally available.")
    wiz, out = _act(wiz, "submit_plea")

    assert wiz.wiz_phase == "revisedJudgement"
    assert wiz.meter_deltas.get("mercy", 0) > 0, "the plea must raise Mercy"
    assert "meter-delta" in out[C["surface"]]


def test_fairer_rewrites_sentence_via_model():
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    wiz, _ = _act(wiz, "ask_judge")
    sentence_before = wiz.trial.sentence

    wiz, out = _act(wiz, "fairer")
    assert wiz.wiz_phase == "revisedJudgement"
    assert wiz.revision_marker
    assert wiz.trial.sentence and wiz.trial.sentence != sentence_before
    assert wiz.trial.fallbacks == []


# --- Safety + meters + composer plumbing ------------------------------------


def test_serious_chat_message_is_redirected():
    wiz = _fresh_wiz()
    wiz, out = _send(wiz, "My roommate keeps threatening to sue me over the dishes.")
    assert wiz.trial.complaint == "", "blocked text must never enter the complaint"
    case_events = [e for e in wiz.events if e.get("scene") == "case"]
    assert case_events and case_events[-1]["text"] == COPY_TOO_SERIOUS
    assert case_events[-1]["who"] == "Court Clerk"


def test_composer_send_does_not_reset_value():
    wiz = _fresh_wiz()
    out = do_send(wiz, {"text": "My roommate hid the remote in the freezer.", "files": []})
    composer_update = out[C["composer"]]
    assert "value" not in composer_update, "do_send must not overwrite the composer"

    wiz = out[C["st"]]
    out = do_action_by_id(wiz, "submit_evidence", "")
    assert out[C["composer"]].get("value") == {"text": "", "files": []}


def test_stash_and_clear_round_trip():
    from tinycourt.app import stash_and_clear

    mm = {"text": "hello court", "files": ["a.png"]}
    stashed, cleared = stash_and_clear(mm)
    assert stashed == mm
    assert cleared == {"text": "", "files": []}


def test_image_only_evidence_submit_creates_exhibit(tmp_path):
    image = tmp_path / "mug.png"
    image.write_bytes(b"fake-png")
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate used the last clean mug.")
    wiz, _ = _act(wiz, "submit_evidence")

    out = do_send(wiz, {"text": "", "files": [str(image)]})
    wiz = out[C["st"]]

    assert wiz.trial.exhibits
    assert any(a["label"] == "mug.png" and a["kind"] == "image" for a in wiz.attachments)


def test_verdict_label_must_agree_with_band():
    from tinycourt.engine import _safe_verdict_label
    from tinycourt.trial import GUILTY, NOT_GUILTY

    assert _safe_verdict_label("Guilty of Reckless Paw Conduct", GUILTY)
    assert _safe_verdict_label("Acquitted of All Dairy Charges", NOT_GUILTY)
    assert _safe_verdict_label("Not Guilty of Anything", GUILTY) == ""
    assert _safe_verdict_label("Guilty of Vibes", NOT_GUILTY) == ""


def test_reactions_move_the_meters():
    wiz = _fresh_wiz()
    before = wiz.trial.meters.suspicion
    wiz, _ = _send(wiz, "The fridge was locked and only they had the key.")
    assert wiz.trial.meters.suspicion != before, "chat reactions must move the case"


def test_judgement_renders_the_meters_strip():
    wiz = _fresh_wiz()
    wiz, _ = _send(wiz, "My roommate keeps eating my yogurt and denying it.")
    wiz, out = _act(wiz, "ask_judge")
    surface = out[C["surface"]]
    assert 'class="meters"' in surface
    for label in ("Suspicion", "Evidence", "Severity", "Dignity", "Mercy", "Patience"):
        assert label in surface, f"meter '{label}' must be shown"


def test_exhausted_patience_declines_further_chatter():
    wiz = _fresh_wiz()
    wiz.trial.meters.patience = 0
    wiz, _ = _send(wiz, "and ANOTHER thing about the yogurt situation...")
    case_events = [e for e in wiz.events if e.get("scene") == "case"]
    assert case_events
    last = case_events[-1]
    assert last["who"] == "Judge"
    assert "enough" in last["text"].lower() or "ruling" in last["text"].lower()
    assert "ANOTHER thing" not in (wiz.trial.complaint or "")


# --- ASR boundary perception (_fold_voice) — audio works in every phase ------


def _audio_records(path):
    return [{"kind": "audio", "label": "voice", "path": str(path)}]


def test_fold_voice_transcribes_audio_into_text(tmp_path):
    audio = tmp_path / "note.wav"
    audio.write_bytes(b"fake-audio")

    class _Voice:
        def transcribe(self, p):
            return "objection your honour the milk was mine"

    out = app._fold_voice(_Voice(), "here is my point", _audio_records(audio))
    assert "here is my point" in out
    assert "objection your honour the milk was mine" in out
    assert out.startswith("here is my point")


def test_fold_voice_is_noop_without_audio_or_asr(tmp_path):
    class _NoAsr:
        def transcribe(self, p):
            return None  # base-client behaviour: no ASR endpoint

    audio = tmp_path / "note.wav"
    audio.write_bytes(b"x")
    # No audio attachment -> unchanged regardless of client.
    assert app._fold_voice(_NoAsr(), "typed", []) == "typed"
    # Audio present but backend can't transcribe -> unchanged.
    assert app._fold_voice(_NoAsr(), "typed", _audio_records(audio)) == "typed"


def test_fold_voice_supports_voice_only_message(tmp_path):
    audio = tmp_path / "note.wav"
    audio.write_bytes(b"x")

    class _Voice:
        def transcribe(self, p):
            return "the cat did it"

    out = app._fold_voice(_Voice(), "", _audio_records(audio))
    assert out == "[Voice note] the cat did it"
