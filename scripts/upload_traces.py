"""Publish captured Tiny Court agent traces to a Hugging Face Dataset.

This is the "Sharing is Caring" artifact: the redacted JSONL traces written by
``tinycourt.tracing`` (one event per model call, grouped by trial) pushed to a
public Dataset so the agent's reasoning is reproducible and inspectable.

Capture a few trials first, then publish:

    # 1. capture (any backend works; remote is the real thing)
    $env:TINYCOURT_TRACES_ENABLED='1'
    uv run python scripts/verify_e2e.py            # or drive a few real trials

    # 2. publish
    $env:TINYCOURT_TRACE_DATASET_ID='build-small-hackathon/tiny-court-traces'
    uv run python scripts/upload_traces.py

Auth uses ``HF_TOKEN`` (a write token). Nothing here prints token material, and
the traces themselves already exclude raw images, prompts, and identity.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

DATASET_CARD = """---
license: apache-2.0
language:
  - en
tags:
  - build-small-hackathon
  - agent-traces
  - gradio
pretty_name: Tiny Court — Agent Traces
configs:
  - config_name: default
    data_files: "traces/*.jsonl"
---

# Tiny Court — Agent Traces

Redacted JSONL traces from **Tiny Court of Everyday Crimes**, a comedy-courtroom
Gradio app. One line per model call (`event_type: "model_call"`), grouped per
trial by a non-identifying `trial_key`. Each event records the courtroom call
(`tag`), the backend/model, a redacted view of the request, response metadata,
and a snapshot of the deterministic verdict meters at that moment — so the trace
shows how the rule-owned verdict state evolved alongside the model's output.

## Privacy

Traces are conservative by construction: **no raw image bytes, no base64 image
URIs, no tokens, no user identity.** Prompt text (which carries the citizen's
verbatim complaint) is reduced to a length + SHA-256 unless capture was run with
`TINYCOURT_TRACE_INCLUDE_PROMPTS=1`.

See `tinycourt/tracing.py` in the app repository for the writer and the exact
event schema (`trace_format: tinycourt-jsonl-v1`).
"""


def _env_flag(name: str, default: bool = False) -> bool:
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "y", "on"}


def main() -> int:
    dataset_id = os.environ.get("TINYCOURT_TRACE_DATASET_ID")
    if not dataset_id:
        print("error: set TINYCOURT_TRACE_DATASET_ID (e.g. you/tiny-court-traces)")
        return 2

    trace_dir = Path(os.environ.get("TINYCOURT_TRACE_DIR", "traces"))
    files = sorted(trace_dir.glob("*.jsonl"))
    if not files:
        print(f"error: no .jsonl traces found in {trace_dir.resolve()}")
        print("hint: capture with TINYCOURT_TRACES_ENABLED=1 first")
        return 1

    token = os.environ.get("HF_TOKEN")
    private = _env_flag("TINYCOURT_TRACE_REPO_PRIVATE")

    try:
        from huggingface_hub import HfApi
    except Exception as exc:  # pragma: no cover - depends on optional dep
        print(f"error: huggingface_hub is required to upload ({exc})")
        print("hint: uv run --with huggingface_hub python scripts/upload_traces.py")
        return 1

    api = HfApi(token=token)
    api.create_repo(dataset_id, repo_type="dataset", exist_ok=True, private=private)

    # Dataset card (idempotent: overwrite is fine, content is static).
    api.upload_file(
        path_or_fileobj=DATASET_CARD.encode("utf-8"),
        path_in_repo="README.md",
        repo_id=dataset_id,
        repo_type="dataset",
        commit_message="Add/refresh Tiny Court trace dataset card",
    )

    for path in files:
        api.upload_file(
            path_or_fileobj=str(path),
            path_in_repo=f"traces/{path.name}",
            repo_id=dataset_id,
            repo_type="dataset",
            commit_message=f"Add trace {path.name}",
        )
        print(f"uploaded {path.name}")

    visibility = "private" if private else "public"
    print(f"\npublished {len(files)} trace file(s) to {visibility} dataset:")
    print(f"  https://huggingface.co/datasets/{dataset_id}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
