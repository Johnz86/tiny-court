"""Backend configuration selection."""

from __future__ import annotations

import tinycourt.config as config


def test_default_backend_prefers_configured_modal_url(monkeypatch):
    monkeypatch.delenv("TINYCOURT_BACKEND", raising=False)
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")

    assert config._default_backend() == "remote"


def test_explicit_backend_still_wins(monkeypatch):
    monkeypatch.setenv("TINYCOURT_BACKEND", "local")
    monkeypatch.setenv("TINYCOURT_MODAL_CHAT_URL", "https://example.test/v1/chat/completions")

    assert (config.os.environ.get("TINYCOURT_BACKEND") or config._default_backend()) == "local"
