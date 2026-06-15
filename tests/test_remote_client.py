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


def test_remote_modal_client_preserves_multimodal_content(monkeypatch):
    captured = {}
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")

    def fake_post(*args, **kwargs):
        captured["kwargs"] = kwargs
        return _Response()

    monkeypatch.setattr("tinycourt.remote_client.requests.post", fake_post)

    content = [
        {"type": "text", "text": "Inspect this evidence."},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,AA=="}},
    ]
    RemoteModalClient().generate([Message("user", content)], tag=CallTag.EVIDENCE)

    assert captured["kwargs"]["json"]["messages"][0]["content"] == content


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
