"""Remote Modal client request construction."""

from __future__ import annotations

import pytest

from tinycourt.generation import CallTag, Message
from tinycourt.remote_client import RemoteModalClient, redact_payload_for_log


class _Response:
    status_code = 200

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict:
        return {
            "model": "MiniCPM-V-4.6",
            "choices": [{"message": {"content": "ok"}}],
            "usage": {"completion_tokens": 1},
        }


def test_remote_modal_client_sends_proxy_auth_headers(monkeypatch):
    captured = {}
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_KEY", "key-id")
    monkeypatch.setenv("TINYCOURT_MODAL_SECRET", "secret-value")

    def fake_post(*args, **kwargs):
        captured["args"] = args
        captured["kwargs"] = kwargs
        return _Response()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)

    client = RemoteModalClient()
    client.generate([Message("user", "hello")], tag=CallTag.REACTION)

    assert captured["kwargs"]["headers"] == {
        "Modal-Key": "key-id",
        "Modal-Secret": "secret-value",
    }


def _capture_posts(monkeypatch):
    """Record every (url, model, content) the client POSTs, in order."""
    posts = []

    def fake_post(url, **kwargs):
        body = kwargs["json"]
        posts.append((url, body["model"], body["messages"][-1]["content"]))
        return _Response()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)
    return posts


def _has_image_part(content):
    return isinstance(content, list) and any(
        isinstance(p, dict) and p.get("type") == "image_url" for p in content
    )


def test_image_goes_to_vision_then_judge_gets_text_only(monkeypatch):
    """Two-step orchestration: vision perceives the image, the judge then writes
    fields from a text-only prompt. Image bytes never reach the judge."""
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_MODEL", "NVIDIA-Nemotron-3-Nano-4B")
    monkeypatch.setenv("TINYCOURT_MODAL_VISION_CHAT_URL", "https://vision.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_VISION_MODEL", "MiniCPM-V-4.6")
    posts = _capture_posts(monkeypatch)

    content = [
        {"type": "text", "text": "Inspect this evidence."},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,AA=="}},
    ]
    RemoteModalClient().generate([Message("user", content)], tag=CallTag.EVIDENCE)

    assert len(posts) == 2
    # 1) vision describe call carries the image, on the vision endpoint/model
    v_url, v_model, v_content = posts[0]
    assert v_url == "https://vision.test/v1/chat/completions"
    assert v_model == "MiniCPM-V-4.6"
    assert _has_image_part(v_content)
    # 2) judge call is text-only, on the judge endpoint/model
    j_url, j_model, j_content = posts[1]
    assert j_url == "https://judge.test/v1/chat/completions"
    assert j_model == "NVIDIA-Nemotron-3-Nano-4B"
    assert not _has_image_part(j_content)
    assert "data:image" not in str(j_content)


def test_text_call_is_a_single_judge_post(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_MODEL", "NVIDIA-Nemotron-3-Nano-4B")
    monkeypatch.setenv("TINYCOURT_MODAL_VISION_CHAT_URL", "https://vision.test/v1/chat/completions")
    posts = _capture_posts(monkeypatch)

    RemoteModalClient().generate([Message("user", "just text")], tag=CallTag.REACTION)

    assert len(posts) == 1
    assert posts[0][0] == "https://judge.test/v1/chat/completions"
    assert posts[0][1] == "NVIDIA-Nemotron-3-Nano-4B"


def test_vision_describe_uses_default_endpoint_when_unset(monkeypatch):
    """With no separate vision URL, the describe step still runs (against the
    judge URL with the vision model alias) — the judge call stays text-only."""
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://one.test/v1/chat/completions")
    monkeypatch.delenv("TINYCOURT_MODAL_VISION_CHAT_URL", raising=False)
    posts = _capture_posts(monkeypatch)

    RemoteModalClient().generate(
        [Message("user", [{"type": "image_url", "image_url": {"url": "data:image/png;base64,AA=="}}])],
        tag=CallTag.EVIDENCE,
    )

    assert len(posts) == 2
    assert posts[0][1] == "MiniCPM-V-4.6" and _has_image_part(posts[0][2])  # vision describe
    assert posts[1][1] != "MiniCPM-V-4.6" and not _has_image_part(posts[1][2])  # judge, text-only


def test_repair_is_noop_without_formatter_url(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.delenv("TINYCOURT_MODAL_FORMATTER_CHAT_URL", raising=False)
    posts = _capture_posts(monkeypatch)

    out = RemoteModalClient().repair("rambling draft", required_keys=("CHARGE",), tag=CallTag.CASE_OPEN)

    assert out is None
    assert posts == []  # never touched the network


def test_repair_posts_draft_to_formatter(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_FORMATTER_CHAT_URL", "https://fmt.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_FORMATTER_MODEL", "Mellum2-12B-A2.5B-Instruct")
    posts = _capture_posts(monkeypatch)

    out = RemoteModalClient().repair("EXHIBIT cold lid suspicious",
                                     required_keys=("EXHIBIT", "RELEVANCE"), tag=CallTag.EVIDENCE)

    assert out is not None and out.meta["repaired"] is True
    assert len(posts) == 1
    url, model, _ = posts[0]
    assert url == "https://fmt.test/v1/chat/completions"
    assert model == "Mellum2-12B-A2.5B-Instruct"


def test_transcribe_is_noop_without_asr_url(monkeypatch, tmp_path):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.delenv("TINYCOURT_MODAL_ASR_URL", raising=False)
    audio = tmp_path / "a.wav"
    audio.write_bytes(b"RIFFfake")
    called = []
    monkeypatch.setattr("tinycourt.remote_client.requests.post", lambda *a, **k: called.append(1))

    assert RemoteModalClient().transcribe(str(audio)) is None
    assert called == []


def test_transcribe_posts_audio_and_returns_text(monkeypatch, tmp_path):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_ASR_URL", "https://asr.test/transcribe")
    audio = tmp_path / "note.m4a"
    audio.write_bytes(b"\x00\x01audio-bytes")
    captured = {}

    class _ASRResp:
        def raise_for_status(self):
            return None

        def json(self):
            return {"text": "they took my parking spot", "language": "en"}

    def fake_post(url, **kwargs):
        captured["url"] = url
        captured["json"] = kwargs["json"]
        return _ASRResp()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)
    out = RemoteModalClient().transcribe(str(audio))

    assert out == "they took my parking spot"
    assert captured["url"] == "https://asr.test/transcribe"
    assert captured["json"]["format"] == "m4a"
    assert "audio_base64" in captured["json"]


def test_transcribe_missing_file_returns_none(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_ASR_URL", "https://asr.test/transcribe")
    assert RemoteModalClient().transcribe("/no/such/file.wav") is None


def test_strips_thinking_preamble(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://judge.test/v1/chat/completions")

    class _Thinking(_Response):
        def json(self):
            return {
                "model": "NVIDIA-Nemotron-3-Nano-4B",
                "choices": [{"message": {"content":
                    "We must answer.\n</think>\nCHARGE: Unauthorized oat milk consumption."}}],
                "usage": {"completion_tokens": 5},
            }

    monkeypatch.setattr("tinycourt.remote_client.requests.post", lambda url, **kw: _Thinking())
    result = RemoteModalClient().generate([Message("user", "x")], tag=CallTag.CASE_OPEN)

    assert result.text == "CHARGE: Unauthorized oat milk consumption."


def test_remote_modal_client_redacts_image_data_for_log(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")
    data_url = "data:image/png;base64,AA=="
    payload = RemoteModalClient()._payload(
        [
            Message(
                "user",
                [
                    {"type": "text", "text": "Inspect this evidence."},
                    {"type": "image_url", "image_url": {"url": data_url}},
                ],
            )
        ],
        max_new_tokens=32,
        temperature=0.0,
    )

    redacted = redact_payload_for_log(payload)
    image_url = redacted["messages"][0]["content"][1]["image_url"]

    assert data_url not in str(redacted)
    assert image_url["url"] == "data:image/png;base64,[REDACTED]"
    assert image_url["redacted_length"] == len(data_url)
    assert len(image_url["redacted_sha256"]) == 64


def test_remote_modal_client_debug_logging_redacts_image_data(monkeypatch, capsys):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_REMOTE_DEBUG", "1")

    def fake_post(*args, **kwargs):
        return _Response()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)
    RemoteModalClient().generate(
        [
            Message(
                "user",
                [
                    {"type": "text", "text": "Inspect this evidence."},
                    {
                        "type": "image_url",
                        "image_url": {"url": "data:image/png;base64,AA=="},
                    },
                ],
            )
        ],
        tag=CallTag.EVIDENCE,
    )

    output = capsys.readouterr().out
    assert "data:image/png;base64,AA==" not in output
    assert "data:image/png;base64,[REDACTED]" in output


def test_remote_modal_client_health_check(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")

    def fake_post(*args, **kwargs):
        return _Response()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)

    assert RemoteModalClient().health_check()


def test_remote_modal_client_requires_proxy_auth_pair(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_KEY", "key-id")
    monkeypatch.delenv("TINYCOURT_MODAL_SECRET", raising=False)

    client = RemoteModalClient()
    with pytest.raises(RuntimeError, match="must be set together"):
        client.generate([Message("user", "hello")], tag=CallTag.REACTION)


def test_make_client_uses_remote_when_health_check_passes(monkeypatch):
    import tinycourt.engine as engine
    import tinycourt.remote_client as remote_client

    class HealthyRemote:
        name = "remote"

        def health_check(self):
            return True

    monkeypatch.setattr(engine, "BACKEND", "remote")
    monkeypatch.setattr(remote_client, "RemoteModalClient", HealthyRemote)

    assert engine.make_client().name == "remote"


def test_make_client_falls_back_when_remote_health_check_fails(monkeypatch):
    import tinycourt.engine as engine
    import tinycourt.remote_client as remote_client
    from tinycourt.generation import FakeClient

    class DownRemote:
        def health_check(self):
            return False

    monkeypatch.setattr(engine, "BACKEND", "remote")
    monkeypatch.setattr(remote_client, "RemoteModalClient", DownRemote)
    monkeypatch.setattr(engine, "_local_client_or_fake", lambda: FakeClient(seed=0))

    assert engine.make_client().name == "fake"
