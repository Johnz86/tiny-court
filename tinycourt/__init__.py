"""Tiny Court of Everyday Crimes — a comedy courtroom Gradio app.

The trial's "truth" lives in Python (see docs/adr/0001): the model proposes
meter deltas and comedic prose, the app clamps/accumulates the meters and owns
the verdict. Generation goes through a single seam (docs/adr/0002) so trial
logic never imports a model directly.
"""

# Import config FIRST: it pins every Hugging Face cache env var to the
# repo-local ./models dir, and that only takes effect before huggingface_hub is
# imported. tinycourt.app imports gradio (which imports huggingface_hub), so
# without this line the app and scripts silently fall back to ~/.cache.
from . import config as _config  # noqa: F401  (import for side effect)

__all__ = ["__version__"]

__version__ = "0.1.0"
