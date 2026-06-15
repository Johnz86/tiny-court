"""Download the courtroom models into the repo-local cache (``./models``).

Importing ``tinycourt.config`` first pins every Hugging Face cache env var at
the repo-local folder, so ``snapshot_download`` writes into ``./models/hub``
rather than the user's global ``~/.cache``.

Usage:
    uv run python scripts/download_models.py            # download all registry models
    uv run python scripts/download_models.py small      # just the tiny model
    uv run python scripts/download_models.py main       # just the main model
"""

from __future__ import annotations

import sys

# IMPORTANT: import config before huggingface_hub so HF_HOME is set first.
from tinycourt.config import MODEL_REGISTRY, MODELS_DIR, ModelSpec

from huggingface_hub import snapshot_download
from huggingface_hub.utils import GatedRepoError, RepositoryNotFoundError

# A 4-bit (8B) model still needs the full weights locally; bitsandbytes
# quantizes them at load time. Skip only GGUF / raw checkpoint dirs we don't use.
_IGNORE = ["*.gguf", "original/*", "consolidated/*"]


def download(spec: ModelSpec) -> bool:
    print(f"\n=== {spec.key}: {spec.label} ({spec.repo_id}) ===")
    try:
        path = snapshot_download(
            repo_id=spec.repo_id,
            allow_patterns=None,
            ignore_patterns=_IGNORE,
        )
        print(f"  [ok] downloaded to {path}")
        return True
    except (RepositoryNotFoundError, GatedRepoError) as exc:
        print(f"  [x] {type(exc).__name__}: {spec.repo_id} not available.")
        print(f"      Override the repo id with TINYCOURT_MODEL_{spec.key.upper()}=<repo> and retry.")
        return False
    except Exception as exc:  # noqa: BLE001 — report and continue to next model
        print(f"  [x] failed: {exc}")
        return False


def main(argv: list[str]) -> int:
    keys = argv or list(MODEL_REGISTRY)
    unknown = [k for k in keys if k not in MODEL_REGISTRY]
    if unknown:
        print(f"Unknown model keys: {unknown}. Known: {list(MODEL_REGISTRY)}")
        return 2

    print(f"Cache target: {MODELS_DIR}")
    results = {k: download(MODEL_REGISTRY[k]) for k in keys}

    print("\nSummary:")
    for k, ok in results.items():
        print(f"  {k}: {'OK' if ok else 'FAILED'}")
    # Success if at least one model downloaded — the app only needs one.
    return 0 if any(results.values()) else 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
