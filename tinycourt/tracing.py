"""Redacted agent-trace capture for the generation seam (Sharing is Caring).

Every model call in a trial flows through :func:`engine.robust_call`; this module
records each one as one JSONL event so a full trial becomes a replayable agent
trace: which courtroom call was made, on which backend, how the deterministic
verdict meters stood at that moment, and whether the model's output parsed or
fell back. The traces are designed to be publishable to a Hugging Face Dataset
(see ``scripts/upload_traces.py``) without leaking anything sensitive.

Privacy posture (mirrors GigScan's ``trace_writer`` and the Modal integration
plan): **no raw image bytes, no Modal/HF tokens, no user identity**. Prompt text
(which carries the citizen's verbatim complaint) is redacted to a length + SHA-256
by default; inline ``data:image/...`` evidence is replaced with a hash + length.
Opt into richer local traces with ``TINYCOURT_TRACE_INCLUDE_PROMPTS=1`` /
``TINYCOURT_TRACE_INCLUDE_RESPONSES``.

Tracing is **off unless ``TINYCOURT_TRACES_ENABLED`` is set**, and a disabled
session makes :meth:`TraceSession.record_call` a cheap no-op, so the hot path is
unaffected in the default UI/test runs.
"""

from __future__ import annotations

import hashlib
import json
import os
import socket
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

TRACE_FORMAT = "tinycourt-jsonl-v1"

# Meters snapshotted alongside each call — the deterministic state the agent is
# reasoning against (docs/adr/0001). Read by attribute so this module never has
# to import the (frozen) verdict engine.
_METER_FIELDS = (
    "suspicion",
    "evidence_weight",
    "petty_severity",
    "courtroom_dignity",
    "mercy",
    "patience",
    "means",
    "motive",
    "opportunity",
)


def _env_flag(name: str, default: bool = False) -> bool:
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "y", "on"}


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def _json_safe(value: Any) -> Any:
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, Path):
        return str(value)
    if isinstance(value, dict):
        return {str(k): _json_safe(v) for k, v in value.items()}
    if isinstance(value, (list, tuple, set)):
        return [_json_safe(v) for v in value]
    return str(value)


def truncate_text(value: str | None, max_chars: int = 8_000) -> str | None:
    if value is None:
        return None
    if len(value) <= max_chars:
        return value
    return value[:max_chars] + "\n...[TRUNCATED]"


def sanitise_message(content: Any, *, include_text: bool) -> dict[str, Any]:
    """Reduce one message's content to redacted metadata.

    Text becomes a length + SHA-256 (the verbatim complaint never lands in a
    trace unless ``include_text``); inline image data URLs are replaced with a
    hash + length so repeated evidence is still identifiable for debugging.
    """
    images: list[dict[str, Any]] = []
    if isinstance(content, str):
        text = content
    else:
        texts: list[str] = []
        for part in content if isinstance(content, list) else []:
            ptype = part.get("type") if isinstance(part, dict) else None
            if ptype == "text":
                texts.append(str(part.get("text") or ""))
            elif ptype == "image_url":
                url = ""
                image_url = part.get("image_url")
                if isinstance(image_url, dict):
                    url = str(image_url.get("url") or "")
                images.append(
                    {
                        "redacted": True,
                        "redacted_sha256": _sha256_text(url),
                        "redacted_length": len(url),
                    }
                )
            else:
                images.append({"type": ptype or "unknown"})
        text = "\n".join(texts)

    out: dict[str, Any] = {
        "text_len": len(text),
        "text_sha256": _sha256_text(text),
    }
    if images:
        out["images"] = images
    if include_text:
        out["text"] = truncate_text(text)
    return out


class TraceSession:
    """JSONL trace writer for one process. Disabled sessions are no-ops.

    Conservative by construction: no image bytes, no raw base64 URI, no tokens,
    no environment dump, no user identity.
    """

    def __init__(self) -> None:
        self.enabled = _env_flag("TINYCOURT_TRACES_ENABLED")
        self.include_prompts = _env_flag("TINYCOURT_TRACE_INCLUDE_PROMPTS")
        self.include_responses = _env_flag("TINYCOURT_TRACE_INCLUDE_RESPONSES", True)
        self.session_id = uuid.uuid4().hex
        self.created_at = _utc_now_iso()
        self.path: Path | None = None
        self._events_written = 0

        if not self.enabled:
            return

        trace_dir = Path(os.environ.get("TINYCOURT_TRACE_DIR", "traces"))
        trace_dir.mkdir(parents=True, exist_ok=True)
        safe_time = self.created_at.replace(":", "-")
        self.path = trace_dir / f"{safe_time}_{self.session_id}.jsonl"
        self.write(
            "session_start",
            {
                "session_id": self.session_id,
                "created_at": self.created_at,
                "hostname": socket.gethostname(),
                "trace_format": TRACE_FORMAT,
                "include_prompts": self.include_prompts,
                "include_responses": self.include_responses,
            },
        )

    # --- low-level append ---------------------------------------------------

    def write(self, event_type: str, data: dict[str, Any] | None = None) -> None:
        if not self.enabled or self.path is None:
            return
        record = {
            "timestamp": _utc_now_iso(),
            "session_id": self.session_id,
            "event_type": event_type,
            "data": _json_safe(data or {}),
        }
        try:
            with self.path.open("a", encoding="utf-8") as fh:
                fh.write(json.dumps(record, ensure_ascii=False) + "\n")
            self._events_written += 1
        except Exception as exc:  # tracing must never break a trial
            print(f"[tinycourt] trace write failed: {exc}")

    # --- the seam hook ------------------------------------------------------

    def record_call(
        self,
        *,
        tag: Any,
        state: Any,
        attempt: int,
        messages: Any,
        max_new_tokens: int,
        temperature: float,
        result: Any = None,
        parsed_ok: bool = False,
        error: BaseException | None = None,
    ) -> None:
        """Record one generation attempt. No-op when tracing is disabled."""
        if not self.enabled:
            return

        tag_value = getattr(tag, "value", str(tag))
        request = {
            "messages": [
                sanitise_message(m.content, include_text=self.include_prompts)
                for m in messages
            ],
            "max_new_tokens": max_new_tokens,
            "temperature": temperature,
        }

        response: dict[str, Any] | None = None
        if result is not None:
            text = getattr(result, "text", "") or ""
            response = {
                "parsed_ok": parsed_ok,
                "tokens": getattr(result, "tokens", 0),
                "seconds": round(float(getattr(result, "seconds", 0.0)), 3),
                "text_len": len(text),
                "text_sha256": _sha256_text(text),
                "meta": _json_safe(getattr(result, "meta", {}) or {}),
            }
            if self.include_responses:
                response["text"] = truncate_text(text)

        self.write(
            "model_call",
            {
                "trial_key": self._trial_key(state),
                "case_title": getattr(state, "case_title", "") or "",
                "trial_length": getattr(state, "length", "") or "",
                "tag": tag_value,
                "attempt": attempt,
                "backend": _result_backend(result),
                "model": _result_model(result),
                "request": request,
                "response": response,
                "error": None if error is None else f"{type(error).__name__}: {error}",
                "meters": _meters_snapshot(state),
                "verdict": _verdict_snapshot(state),
                "fallbacks_so_far": list(getattr(state, "fallbacks", []) or []),
            },
        )

    @staticmethod
    def _trial_key(state: Any) -> str:
        """A stable, non-identifying key grouping all calls of one trial."""
        complaint = getattr(state, "complaint", "") or ""
        return _sha256_text(complaint)[:16]


def _result_backend(result: Any) -> str:
    meta = getattr(result, "meta", None) or {}
    return str(meta.get("backend") or "")


def _result_model(result: Any) -> str:
    meta = getattr(result, "meta", None) or {}
    return str(meta.get("model") or "")


def _meters_snapshot(state: Any) -> dict[str, float]:
    meters = getattr(state, "meters", None)
    if meters is None:
        return {}
    snapshot: dict[str, float] = {}
    for name in _METER_FIELDS:
        value = getattr(meters, name, None)
        if value is not None:
            snapshot[name] = round(float(value), 2)
    return snapshot


def _verdict_snapshot(state: Any) -> dict[str, Any]:
    try:
        verdict = state.verdict
    except Exception:
        return {}
    return {
        "band": getattr(verdict, "band", ""),
        "confidence": getattr(verdict, "confidence", 0),
        "guilt_score": round(float(getattr(verdict, "guilt_score", 0.0)), 2),
    }


# --- process-wide singleton ------------------------------------------------

_SESSION: TraceSession | None = None


def get_trace_session() -> TraceSession:
    """Return the process trace session, building it from the env on first use."""
    global _SESSION
    if _SESSION is None:
        _SESSION = TraceSession()
    return _SESSION


def reset_trace_session() -> None:
    """Drop the cached session so the next call re-reads the environment.

    Used by tests that toggle ``TINYCOURT_TRACES_ENABLED`` between cases.
    """
    global _SESSION
    _SESSION = None
