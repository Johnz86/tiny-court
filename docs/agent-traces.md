# Agent traces (Sharing is Caring)

Tiny Court can capture every model call in a trial as a redacted JSONL **agent
trace** and publish the collection to a Hugging Face Dataset. This is the
artifact for the **Sharing is Caring** badge (`achievement:sharing`).

The trace is written at the single generation choke point —
`engine.robust_call` — so it covers **every backend** (remote Modal, local, fake)
and both the first attempt and the parse-failure retry. Capture is **off by
default**; a disabled session makes the hook a no-op, so the normal UI/test path
is unaffected.

## What a trace records

One JSONL line per event. `session_start` opens the file; each model call emits a
`model_call` event:

```json
{
  "timestamp": "2026-06-15T16:46:25Z",
  "session_id": "1d78b991…",
  "event_type": "model_call",
  "data": {
    "trial_key": "e6c7dab3d3557915",
    "case_title": "The Sticky-Note Standoff",
    "trial_length": "quick",
    "tag": "evidence",
    "attempt": 0,
    "backend": "remote",
    "model": "MiniCPM-V-4.6",
    "request": {
      "messages": [{"text_len": 1177, "text_sha256": "…",
                    "images": [{"redacted": true, "redacted_sha256": "…", "redacted_length": 31021}]}],
      "max_new_tokens": 320, "temperature": 0.9
    },
    "response": {"parsed_ok": false, "tokens": 88, "seconds": 1.9,
                 "text_len": 240, "text_sha256": "…", "meta": {…}},
    "error": null,
    "meters": {"suspicion": 42.0, "evidence_weight": 40.0, …},
    "verdict": {"band": "Not Guilty", "confidence": 18, "guilt_score": 31.2},
    "fallbacks_so_far": []
  }
}
```

The `meters` / `verdict` snapshot is the interesting part: it shows the
**deterministic** verdict state (docs/adr/0001) as it evolves alongside the
model's output, so a trace is a replayable record of the whole reasoning loop —
including where the model's formatting drifted and the trial fell back to a
canned card (`parsed_ok: false`).

## Privacy posture

Conservative by construction, matching GigScan's `trace_writer` and the
[Modal integration plan](modal-remote-integration-plan.md): **no raw image
bytes, no base64 image URIs, no tokens, no user identity.** The citizen's
verbatim complaint lives in the prompt, so prompt text is reduced to a length +
SHA-256 by default; inline `data:image/…` evidence is replaced with a hash +
length.

## Configuration

| Env var | Default | Effect |
|---|---|---|
| `TINYCOURT_TRACES_ENABLED` | off | Master switch. Off = no file, hook is a no-op. |
| `TINYCOURT_TRACE_DIR` | `traces/` | Where JSONL files are written (gitignored). |
| `TINYCOURT_TRACE_INCLUDE_PROMPTS` | off | Include full prompt text (carries the complaint — local debugging only). |
| `TINYCOURT_TRACE_INCLUDE_RESPONSES` | on | Include the model's (pre-scrub) output text, truncated. |
| `TINYCOURT_TRACE_DATASET_ID` | — | Target HF Dataset for `scripts/upload_traces.py`. |
| `TINYCOURT_TRACE_REPO_PRIVATE` | off | Create the dataset private. |

## Capture → publish workflow

```powershell
# 1. capture a few trials (any backend; remote is the real thing)
$env:TINYCOURT_TRACES_ENABLED='1'
$env:TINYCOURT_BACKEND='remote'        # or omit for the fake/local path
uv run python scripts/verify_e2e.py    # or drive real trials through the app

# 2. publish the redacted JSONL to a Dataset (needs a write HF_TOKEN)
$env:TINYCOURT_TRACE_DATASET_ID='build-small-hackathon/tiny-court-traces'
uv run python scripts/upload_traces.py
```

The publish script creates the dataset if missing, writes a dataset card, and
uploads each `traces/*.jsonl` under `traces/` in the repo. It prints the public
dataset URL. Only claim `achievement:sharing` / add `datasets:` frontmatter once
that dataset exists.

## Implementation

- `tinycourt/tracing.py` — `TraceSession`, redaction helpers, process singleton
  (`get_trace_session` / `reset_trace_session`), `trace_format: tinycourt-jsonl-v1`.
- `tinycourt/engine.py` — `robust_call` records each attempt through the seam.
- `scripts/upload_traces.py` — publish to a Hugging Face Dataset.
- `tests/test_tracing.py` — redaction, grouping, disabled no-op, and a live
  through-the-seam check.
