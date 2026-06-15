"""Remote OpenAI-compatible backend for the Modal MiniCPM endpoint."""

from __future__ import annotations

import os
import time
from typing import Any

import requests

from .generation import CallTag, GenerationClient, GenerationResult, Message


class RemoteModalClient(GenerationClient):
    """Generation client for a Modal-hosted `/v1/chat/completions` endpoint."""

    name = "remote"

    def __init__(self) -> None:
        self.chat_url = os.environ.get("TINYCOURT_MODAL_CHAT_URL") or os.environ.get(
            "MODAL_CHAT_URL"
        )
        if not self.chat_url:
            raise RuntimeError("TINYCOURT_MODAL_CHAT_URL or MODAL_CHAT_URL must be set")
        self.model = os.environ.get("TINYCOURT_MODAL_MODEL", "MiniCPM-V-4.6")
        self.timeout = float(os.environ.get("TINYCOURT_MODAL_TIMEOUT", "300"))
        self.modal_key = os.environ.get("TINYCOURT_MODAL_KEY")
        self.modal_secret = os.environ.get("TINYCOURT_MODAL_SECRET")

    def _headers(self) -> dict[str, str] | None:
        if not self.modal_key and not self.modal_secret:
            return None
        if not self.modal_key or not self.modal_secret:
            raise RuntimeError(
                "TINYCOURT_MODAL_KEY and TINYCOURT_MODAL_SECRET must be set together"
            )
        return {
            "Modal-Key": self.modal_key,
            "Modal-Secret": self.modal_secret,
        }

    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "temperature": temperature,
            "max_tokens": max_new_tokens,
            "chat_template_kwargs": {"enable_thinking": False},
        }

        start = time.perf_counter()
        response = requests.post(
            self.chat_url,
            json=payload,
            headers=self._headers(),
            timeout=self.timeout,
        )
        seconds = time.perf_counter() - start
        response.raise_for_status()
        data = response.json()

        content = data["choices"][0]["message"].get("content", "")
        usage = data.get("usage") or {}
        return GenerationResult(
            text=content,
            tag=tag,
            tokens=int(usage.get("completion_tokens") or len(content.split())),
            seconds=seconds,
            meta={
                "backend": self.name,
                "model": data.get("model", self.model),
                "status_code": response.status_code,
            },
        )
