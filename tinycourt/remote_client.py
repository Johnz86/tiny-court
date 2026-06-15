"""Remote OpenAI-compatible backend for the Modal MiniCPM endpoint."""

from __future__ import annotations

import hashlib
import json
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

    def _payload(
        self,
        messages: list[Message],
        *,
        max_new_tokens: int,
        temperature: float,
    ) -> dict[str, Any]:
        return {
            "model": self.model,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "temperature": temperature,
            "max_tokens": max_new_tokens,
            "chat_template_kwargs": {"enable_thinking": False},
        }

    def _debug_enabled(self) -> bool:
        return os.environ.get("TINYCOURT_REMOTE_DEBUG", "").lower() in {
            "1",
            "true",
            "yes",
            "y",
        }

    def _log_payload(self, payload: dict[str, Any]) -> None:
        if not self._debug_enabled():
            return
        safe_payload = redact_payload_for_log(payload)
        print("[tinycourt] remote request payload:")
        print(json.dumps(safe_payload, indent=2, sort_keys=True))

    def health_check(self) -> bool:
        """True when the configured remote endpoint can answer a tiny chat call."""
        timeout = float(
            os.environ.get(
                "TINYCOURT_REMOTE_HEALTH_TIMEOUT",
                str(min(self.timeout, 60.0)),
            )
        )
        messages = [
            Message("system", "Reply with exactly: OK"),
            Message("user", "OK?"),
        ]
        try:
            response = requests.post(
                self.chat_url,
                json=self._payload(messages, max_new_tokens=8, temperature=0.0),
                headers=self._headers(),
                timeout=timeout,
            )
            response.raise_for_status()
            data = response.json()
            return bool(data.get("choices"))
        except Exception:
            return False

    def generate(
        self,
        messages: list[Message],
        *,
        tag: CallTag,
        max_new_tokens: int = 320,
        temperature: float = 0.9,
    ) -> GenerationResult:
        start = time.perf_counter()
        payload = self._payload(
            messages,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
        )
        self._log_payload(payload)
        response = requests.post(
            self.chat_url,
            json=payload,
            headers=self._headers(),
            timeout=self.timeout,
        )
        seconds = time.perf_counter() - start
        if self._debug_enabled():
            print(
                f"[tinycourt] remote response status={response.status_code} "
                f"seconds={seconds:.2f}"
            )
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


def redact_payload_for_log(payload: dict[str, Any]) -> dict[str, Any]:
    """Return a JSON-safe payload copy with inline image data removed."""
    try:
        clean = json.loads(json.dumps(payload))
    except Exception:
        return {"unserialisable_payload_type": type(payload).__name__}
    return _redact_images(clean)


def _redact_images(value: Any) -> Any:
    if isinstance(value, dict):
        image_url = value.get("image_url")
        if isinstance(image_url, dict):
            url = image_url.get("url")
            if isinstance(url, str) and url.startswith("data:image/"):
                image_url["url"] = _redacted_data_url(url)
                image_url["redacted_sha256"] = hashlib.sha256(
                    url.encode("utf-8")
                ).hexdigest()
                image_url["redacted_length"] = len(url)
        for nested in value.values():
            _redact_images(nested)
    elif isinstance(value, list):
        for item in value:
            _redact_images(item)
    return value


def _redacted_data_url(url: str) -> str:
    prefix = url.split(",", 1)[0]
    if not prefix.startswith("data:image/"):
        prefix = "data:image/*;base64"
    return f"{prefix},[REDACTED]"
