"""Deploy ONLY the runtime tree to the Hugging Face Space.

The Space is a *different, clean* artifact from the dev git repo: it carries just
the Gradio app and what it needs to run. Everything else — docs, tests,
`modal_minicpm/` (the separately-deployed Modal server), `scripts/`, the dev
`pyproject.toml`, the cloned reference app — stays in git and is never uploaded.

This mirrors the simplicity of a lean Space (see `gigscan_via_modal/`: just
`app.py` + a package + `requirements.txt` + `README.md`). Here the runtime tree is:

    main.py              # Space entry (app_file in the README frontmatter)
    tinycourt/           # the app package (code + static/)
    wheels/*.whl         # the custom MultimodalComposer wheel (resolve URL)
    requirements.txt     # Space deps (lean; no torch/modal/test tooling)
    README.md            # HF Space card + frontmatter
    .gitattributes       # LFS patterns

Usage:
    uv run python scripts/deploy_space.py            # dry run: print the clean tree
    uv run python scripts/deploy_space.py --push      # upload + sync the Space

`--push` uses `upload_folder(..., delete_patterns=["*"])`, so the Space ends up
holding **exactly** the runtime tree — any leftover dev files from earlier pushes
are removed. Auth via `HF_TOKEN` (a write token). Run locally with
`uv run python main.py` — local launch uses `pyproject.toml`, not this set.
"""

from __future__ import annotations

import argparse
import fnmatch
import os
import sys
from pathlib import Path

SPACE_ID = os.environ.get("TINYCOURT_SPACE_ID", "build-small-hackathon/tiny-court")

# The only files the running Space needs.
ALLOW_PATTERNS = [
    "main.py",
    "requirements.txt",
    "README.md",
    ".gitattributes",
    "tinycourt/*.py",
    "tinycourt/static/**",
    "wheels/*.whl",
    "assets/promo-walkthrough.webp",  # inline demo on the Space card
    "assets/promo-walkthrough.mp4",   # full-quality download link
]
IGNORE_PATTERNS = ["**/__pycache__/**", "**/*.pyc", "**/*.map"]


def _ignored(rel: str) -> bool:
    return any(fnmatch.fnmatch(rel, pat) for pat in IGNORE_PATTERNS) or "__pycache__" in rel


def runtime_files() -> list[str]:
    """The exact relative paths that would be uploaded (allow minus ignore)."""
    root = Path(".")
    found: set[str] = set()
    for pattern in ALLOW_PATTERNS:
        for path in root.glob(pattern):
            if path.is_file():
                rel = path.as_posix()
                if not _ignored(rel):
                    found.add(rel)
    return sorted(found)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--push", action="store_true", help="upload + sync the Space")
    args = ap.parse_args()

    files = runtime_files()
    total = sum(Path(f).stat().st_size for f in files)
    print(f"Space: {SPACE_ID}")
    print(f"Clean runtime tree ({len(files)} files, {total / 1e6:.2f} MB):")
    for f in files:
        print(f"  {f}")

    missing = [p for p in ("main.py", "requirements.txt", "README.md") if not Path(p).is_file()]
    if missing:
        print(f"\nerror: missing required file(s): {', '.join(missing)}")
        return 1
    if not any(f.startswith("wheels/") and f.endswith(".whl") for f in files):
        print("\nwarning: no composer wheel under wheels/ — requirements.txt resolve URL will 404")

    if not args.push:
        print("\n(dry run — pass --push to upload and sync the Space)")
        return 0

    try:
        from huggingface_hub import HfApi
    except Exception as exc:  # pragma: no cover
        print(f"error: huggingface_hub required ({exc})")
        return 1

    api = HfApi(token=os.environ.get("HF_TOKEN"))
    print(f"\nuploading + syncing {SPACE_ID} …")
    api.upload_folder(
        folder_path=".",
        repo_id=SPACE_ID,
        repo_type="space",
        allow_patterns=ALLOW_PATTERNS,
        ignore_patterns=IGNORE_PATTERNS,
        delete_patterns=["*"],  # remove anything on the Space not in the tree above
        commit_message="Deploy clean runtime tree",
    )
    print(f"done: https://huggingface.co/spaces/{SPACE_ID}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
