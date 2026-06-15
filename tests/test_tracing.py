"""Redacted agent-trace capture (Sharing is Caring)."""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from tinycourt import engine
from tinycourt.generation import CallTag, FakeClient, GenerationResult, Message
from tinycourt.tracing import (
    get_trace_session,
    reset_trace_session,
    sanitise_message,
    truncate_text,
)
from tinycourt.trial import TrialState


@pytest.fixture(autouse=True)
def _isolate_session():
    """Each test starts and ends with a fresh process session."""
    reset_trace_session()
    yield
    reset_trace_session()


def _enable(monkeypatch, tmp_path: Path, **flags: str) -> None:
    monkeypatch.setenv("TINYCOURT_TRACES_ENABLED", "1")
    monkeypatch.setenv("TINYCOURT_TRACE_DIR", str(tmp_path))
    for key, value in flags.items():
        monkeypatch.setenv(key, value)
    reset_trace_session()


def _events(tmp_path: Path) -> list[dict]:
    files = list(tmp_path.glob("*.jsonl"))
    assert len(files) == 1, f"expected one trace file, found {files}"
    return [json.loads(line) for line in files[0].read_text(encoding="utf-8").splitlines()]


def _result() -> GenerationResult:
    return GenerationResult(
        text="prose\n---\nCHARGE: Snack Theft\n",
        tag=CallTag.CASE_OPEN,
        tokens=7,
        seconds=1.25,
        meta={"backend": "remote", "model": "MiniCPM-V-4.6"},
    )


def test_truncate_text():
    assert truncate_text(None) is None
    assert truncate_text("short") == "short"
    long = "x" * 10
    assert truncate_text(long, max_chars=4) == "xxxx\n...[TRUNCATED]"


def test_sanitise_message_redacts_prompt_and_image_by_default():
    content = [
        {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,AAAA"}},
        {"type": "text", "text": "the citizen's secret complaint"},
    ]
    out = sanitise_message(content, include_text=False)
    assert "text" not in out
    assert out["text_len"] == len("the citizen's secret complaint")
    assert len(out["text_sha256"]) == 64
    image = out["images"][0]
    assert image["redacted"] is True
    assert image["redacted_length"] == len("data:image/jpeg;base64,AAAA")
    assert "AAAA" not in json.dumps(out)


def test_sanitise_message_includes_text_when_opted_in():
    out = sanitise_message("hello court", include_text=True)
    assert out["text"] == "hello court"


def test_disabled_session_writes_nothing(monkeypatch, tmp_path):
    monkeypatch.delenv("TINYCOURT_TRACES_ENABLED", raising=False)
    monkeypatch.setenv("TINYCOURT_TRACE_DIR", str(tmp_path))
    reset_trace_session()
    session = get_trace_session()
    assert session.enabled is False
    session.record_call(
        tag=CallTag.CASE_OPEN, state=TrialState(complaint="x"), attempt=0,
        messages=[Message("user", "x")], max_new_tokens=10, temperature=0.5,
        result=_result(), parsed_ok=True,
    )
    assert list(tmp_path.glob("*.jsonl")) == []


def test_enabled_session_records_redacted_call(monkeypatch, tmp_path):
    _enable(monkeypatch, tmp_path)
    state = TrialState(complaint="my roommate ate my labelled yogurt", case_title="The Yogurt Affair")
    state.meters.suspicion = 42.0
    messages = [
        Message("system", "You are a judge."),
        Message("user", [
            {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,SECRET"}},
            {"type": "text", "text": "exhibit A"},
        ]),
    ]
    get_trace_session().record_call(
        tag=CallTag.EVIDENCE, state=state, attempt=0, messages=messages,
        max_new_tokens=320, temperature=0.9, result=_result(), parsed_ok=True,
    )

    events = _events(tmp_path)
    assert events[0]["event_type"] == "session_start"
    call = events[1]
    assert call["event_type"] == "model_call"
    data = call["data"]
    assert data["tag"] == "evidence"
    assert data["backend"] == "remote"
    assert data["model"] == "MiniCPM-V-4.6"
    assert data["meters"]["suspicion"] == 42.0
    assert data["verdict"]["band"]  # a band string is always resolvable
    assert data["response"]["parsed_ok"] is True
    # redaction: neither the secret image nor the prompt text leak
    serialised = json.dumps(call)
    assert "SECRET" not in serialised
    assert "exhibit A" not in serialised
    assert data["request"]["messages"][1]["images"][0]["redacted"] is True


def test_trial_key_groups_same_complaint_and_separates_others(monkeypatch, tmp_path):
    _enable(monkeypatch, tmp_path)
    session = get_trace_session()
    a1 = TrialState(complaint="same complaint")
    a2 = TrialState(complaint="same complaint")
    b = TrialState(complaint="different complaint")
    for state in (a1, a2, b):
        session.record_call(
            tag=CallTag.REACTION, state=state, attempt=0,
            messages=[Message("user", "hi")], max_new_tokens=10, temperature=0.5,
            result=_result(), parsed_ok=True,
        )
    calls = [e for e in _events(tmp_path) if e["event_type"] == "model_call"]
    keys = [c["data"]["trial_key"] for c in calls]
    assert keys[0] == keys[1] != keys[2]


def test_response_text_included_when_opted_in(monkeypatch, tmp_path):
    _enable(monkeypatch, tmp_path, TINYCOURT_TRACE_INCLUDE_RESPONSES="1")
    get_trace_session().record_call(
        tag=CallTag.CASE_OPEN, state=TrialState(complaint="x"), attempt=0,
        messages=[Message("user", "x")], max_new_tokens=10, temperature=0.5,
        result=_result(), parsed_ok=True,
    )
    call = [e for e in _events(tmp_path) if e["event_type"] == "model_call"][0]
    assert "CHARGE: Snack Theft" in call["data"]["response"]["text"]


def test_error_attempt_is_recorded(monkeypatch, tmp_path):
    _enable(monkeypatch, tmp_path)
    get_trace_session().record_call(
        tag=CallTag.CLOSING, state=TrialState(complaint="x"), attempt=1,
        messages=[Message("user", "x")], max_new_tokens=10, temperature=0.5,
        result=None, parsed_ok=False, error=RuntimeError("model down"),
    )
    call = [e for e in _events(tmp_path) if e["event_type"] == "model_call"][0]
    assert call["data"]["response"] is None
    assert "model down" in call["data"]["error"]


def test_engine_robust_call_emits_trace_through_the_seam(monkeypatch, tmp_path):
    """The real hook: a fake trial step writes model_call events."""
    _enable(monkeypatch, tmp_path)
    state = TrialState(complaint="the cat knocked the plant over")
    engine.open_case(state, FakeClient(seed=0))

    calls = [e for e in _events(tmp_path) if e["event_type"] == "model_call"]
    assert calls, "expected at least one traced model call"
    assert calls[0]["data"]["tag"] == "case_open"
    assert calls[0]["data"]["backend"] == "fake"
