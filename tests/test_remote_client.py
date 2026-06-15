"""Remote Modal client request construction."""

from __future__ import annotations

import pytest

from tinycourt.generation import CallTag, Message
from tinycourt.remote_client import RemoteModalClient


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


def test_remote_modal_client_requires_proxy_auth_pair(monkeypatch):
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")
    monkeypatch.setenv("TINYCOURT_MODAL_KEY", "key-id")
    monkeypatch.delenv("TINYCOURT_MODAL_SECRET", raising=False)

    client = RemoteModalClient()
    with pytest.raises(RuntimeError, match="must be set together"):
        client.generate([Message("user", "hello")], tag=CallTag.REACTION)
