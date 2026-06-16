"""Remote OpenAI-compatible backend for the Modal MiniCPM endpoint."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import time
from collections.abc import Sequence
from pathlib import Path
from typing import Any

import requests

from .generation import CallTag, GenerationClient, GenerationResult, Message


class RemoteModalClient(GenerationClient):
    """Generation client for a Modal-hosted `/v1/chat/completions` endpoint."""

    name = "remote"

    def __init__(self) -> None:
        # The judge endpoint (text). Required — every text call routes here.
        self.chat_url = os.environ.get("TINYCOURT_MODAL_CHAT_URL") or os.environ.get(
            "MODAL_CHAT_URL"
        )
        if not self.chat_url:
            raise RuntimeError("TINYCOURT_MODAL_CHAT_URL or MODAL_CHAT_URL must be set")
        self.model = os.environ.get("TINYCOURT_MODAL_MODEL", "NVIDIA-Nemotron-3-Nano-4B")
        # The vision endpoint (image evidence). Optional: when unset, image calls
        # fall back to the judge endpoint (docs/modal-serving-decision.md). A weak
        # text model can't see images, but this preserves single-endpoint setups.
        self.vision_url = os.environ.get("TINYCOURT_MODAL_VISION_CHAT_URL") or self.chat_url
        self.vision_model = os.environ.get("TINYCOURT_MODAL_VISION_MODEL", "MiniCPM-V-4.6")
        # The formatter endpoint (schema repair). Optional: when unset, `repair`
        # is a no-op and a bad parse falls straight through to a canned card.
        self.formatter_url = os.environ.get("TINYCOURT_MODAL_FORMATTER_CHAT_URL")
        self.formatter_model = os.environ.get(
            "TINYCOURT_MODAL_FORMATTER_MODEL", "Mellum2-12B-A2.5B-Instruct"
        )
        # The ASR endpoint (audio evidence). Optional: when unset, `transcribe`
        # is a no-op and an audio attachment stays label-only.
        self.asr_url = os.environ.get("TINYCOURT_MODAL_ASR_URL")
        self.timeout = float(os.environ.get("TINYCOURT_MODAL_TIMEOUT", "300"))
        self.modal_key = os.environ.get("TINYCOURT_MODAL_KEY")
        self.modal_secret = os.environ.get("TINYCOURT_MODAL_SECRET")
        # Reasoning-model guardrails for the judge: Nemotron-class GGUFs ramble
        # into open chain-of-thought at high temperature and never reach the
        # delimited block within a small token budget (verified: 0/6 clean at
        # 0.9/160 vs 6/6 at 0.6/400). Cap temperature and floor the token budget
        # on the judge call so it emits clean KEY: value output.
        self.temp_cap = float(os.environ.get("TINYCOURT_REMOTE_TEMP_CAP", "0.6"))
        self.min_tokens = int(os.environ.get("TINYCOURT_REMOTE_MIN_TOKENS", "400"))

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
        model: str | None = None,
    ) -> dict[str, Any]:
        return {
            "model": model or self.model,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "temperature": temperature,
            "max_tokens": max_new_tokens,
            "chat_template_kwargs": {"enable_thinking": False},
        }

    def _chat(
        self,
        messages: list[Message],
        *,
        url: str,
        model: str,
        max_new_tokens: int,
        temperature: float,
    ) -> dict[str, Any]:
        """One OpenAI chat-completions POST to a specific endpoint+model."""
        payload = self._payload(
            messages, max_new_tokens=max_new_tokens, temperature=temperature, model=model
        )
        self._log_payload(payload)
        response = requests.post(
            url, json=payload, headers=self._headers(), timeout=self.timeout
        )
        if self._debug_enabled():
            print(
                f"[tinycourt] remote post url={url} model={model} "
                f"status={response.status_code}"
            )
        response.raise_for_status()
        return response.json()

    def _describe_images(self, messages: list[Message], temperature: float) -> str:
        """Vision step: ask the vision model for a plain factual caption of the
        uploaded evidence image(s). Its text is *only* used as context for the
        judge — the vision model never writes courtroom fields."""
        images = _collect_images(messages)
        vision_messages = [Message("user", [*images, {"type": "text", "text": VISION_DESCRIBE_PROMPT}])]
        data = self._chat(
            vision_messages,
            url=self.vision_url,
            model=self.vision_model,
            max_new_tokens=192,
            temperature=min(temperature, 0.3),
        )
        caption = data["choices"][0]["message"].get("content", "")
        return _strip_thinking(caption)

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
        # Orchestration: an image is perceived by the vision model first, then its
        # caption is folded into the prompt so the *judge* writes the fields from
        # text only. The judge never receives image bytes; the vision model never
        # owns courtroom fields (docs/modal-serving-decision.md).
        vision_model = None
        if _has_image(messages):
            caption = self._describe_images(messages, temperature)
            messages = _fold_caption(messages, caption)
            vision_model = self.vision_model

        data = self._chat(
            messages,
            url=self.chat_url,
            model=self.model,
            max_new_tokens=max(max_new_tokens, self.min_tokens),
            temperature=min(temperature, self.temp_cap),
        )
        seconds = time.perf_counter() - start

        # Judge GGUFs may emit a reasoning preamble (optionally <think>-wrapped)
        # even with thinking disabled; keep only the answer (matches local_client).
        content = _strip_thinking(data["choices"][0]["message"].get("content", ""))
        usage = data.get("usage") or {}
        meta = {
            "backend": self.name,
            "model": data.get("model", self.model),
            "judge_model": self.model,
        }
        if vision_model:
            meta["vision_model"] = vision_model
        return GenerationResult(
            text=content,
            tag=tag,
            tokens=int(usage.get("completion_tokens") or len(content.split())),
            seconds=seconds,
            meta=meta,
        )

    def repair(
        self,
        raw_text: str,
        *,
        required_keys: Sequence[str],
        tag: CallTag,
    ) -> GenerationResult | None:
        """Schema-repair pass: ask the formatter model to coerce a malformed
        judge draft into the delimited ``KEY: value`` contract. No-op (returns
        ``None``) unless ``TINYCOURT_MODAL_FORMATTER_CHAT_URL`` is configured."""
        if not self.formatter_url or not (raw_text or "").strip():
            return None
        keys = ", ".join(required_keys) if required_keys else "the labelled fields"
        system = (
            "You are a strict output formatter for a comedy courtroom app. Rewrite "
            "the draft below into the exact line-delimited format the parser needs: "
            "first a single line containing only ---, then one 'KEY: value' line for "
            f"each of these required fields: {keys}. Use the UPPERCASE keys exactly "
            "as given. Keep the draft's wording and tone; do not invent facts, "
            "charges, or rulings; output only the formatted block."
        )
        messages = [Message("system", system), Message("user", raw_text)]
        data = self._chat(
            messages,
            url=self.formatter_url,
            model=self.formatter_model,
            max_new_tokens=320,
            temperature=0.0,
        )
        content = _strip_thinking(data["choices"][0]["message"].get("content", ""))
        usage = data.get("usage") or {}
        return GenerationResult(
            text=content,
            tag=tag,
            tokens=int(usage.get("completion_tokens") or len(content.split())),
            meta={
                "backend": self.name,
                "formatter_model": self.formatter_model,
                "repaired": True,
            },
        )

    def transcribe(self, audio_path: str) -> str | None:
        """Send an uploaded audio file to the ASR endpoint and return the
        transcript. No-op (``None``) unless ``TINYCOURT_MODAL_ASR_URL`` is set,
        or the file is missing/unreadable."""
        if not self.asr_url:
            return None
        candidate = Path(audio_path)
        if not candidate.is_file():
            return None
        audio_b64 = base64.b64encode(candidate.read_bytes()).decode("ascii")
        body = {"audio_base64": audio_b64, "format": candidate.suffix.lstrip(".") or "wav"}
        if self._debug_enabled():
            print(
                f"[tinycourt] asr post url={self.asr_url} "
                f"b64_len={len(audio_b64)} format={body['format']}"
            )
        response = requests.post(
            self.asr_url, json=body, headers=self._headers(), timeout=self.timeout
        )
        response.raise_for_status()
        text = (response.json().get("text") or "").strip()
        return text or None


VISION_DESCRIBE_PROMPT = (
    "You are examining a photo submitted as physical evidence in a comedy "
    "courtroom. Describe only what is actually visible — objects, colours, any "
    "legible text, and the state of things (empty, broken, messy, etc.) — in one "
    "to three plain sentences. Do not invent details, and do not issue charges, "
    "rulings, or a verdict."
)


def _has_image(messages: list[Message]) -> bool:
    """True when any message carries an OpenAI-style image part."""
    for m in messages:
        content = m.content
        if isinstance(content, list):
            for part in content:
                if isinstance(part, dict) and part.get("type") == "image_url":
                    return True
    return False


def _collect_images(messages: list[Message]) -> list[dict[str, Any]]:
    """Every image part across the messages (for the vision describe call)."""
    parts: list[dict[str, Any]] = []
    for m in messages:
        if isinstance(m.content, list):
            for part in m.content:
                if isinstance(part, dict) and part.get("type") == "image_url":
                    parts.append(part)
    return parts


def _fold_caption(messages: list[Message], caption: str) -> list[Message]:
    """Return messages with image parts replaced by a text note carrying the
    vision caption — so the judge call is pure text. The note is inserted once
    (at the first image-bearing message); any existing text parts are kept."""
    note = {"type": "text", "text": f"[Photographic evidence] {caption}".strip()}
    out: list[Message] = []
    inserted = False
    for m in messages:
        content = m.content
        has_image = isinstance(content, list) and any(
            isinstance(p, dict) and p.get("type") == "image_url" for p in content
        )
        if not has_image:
            out.append(m)
            continue
        texts = [p for p in content if isinstance(p, dict) and p.get("type") == "text"]
        new_content = ([] if inserted else [note]) + texts
        inserted = True
        out.append(Message(m.role, new_content or [{"type": "text", "text": ""}]))
    return out


def _strip_thinking(text: str) -> str:
    """Drop a model's chain-of-thought preamble.

    Some judge GGUFs emit reasoning (sometimes ``<think>…</think>``-wrapped)
    before the answer even with thinking disabled. Keep only what follows the
    final ``</think>``; otherwise return the text unchanged."""
    if not text:
        return ""
    if "</think>" in text:
        text = text.rsplit("</think>", 1)[1]
    return text.strip()


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
