"""Entry point for the Tiny Court of Everyday Crimes Gradio app.

Run locally with:  uv run python main.py

On Hugging Face Spaces this file is the ``app_file``. We expose a module-level
``demo`` (Gradio's launcher looks for it) and launch unconditionally so the app
starts whether the Space runs the file or imports it. Theme/CSS/head are applied
via ``launch()`` (Gradio 6 ignores them on the Blocks constructor).

Backend selection (docs/adr/0002) is via env var:
    TINYCOURT_BACKEND=fake   (default) canned text, no GPU — great for the UI demo
    TINYCOURT_BACKEND=local  load a downloaded model (Qwen3 via @spaces.GPU)
    TINYCOURT_BACKEND=remote use Modal llama.cpp; auto-selected when
                             TINYCOURT_MODAL_CHAT_URL is set
"""

from tinycourt.app import build_demo, launch_kwargs, warm_backend

warm_backend()
demo = build_demo()

# Launch unconditionally (not under an `if __name__` guard) so it runs even when
# the Space imports this module. launch() normally blocks; on some Space setups
# it returns instead, so hold the main thread afterwards — the server it started
# keeps serving and the container stays alive.
demo.launch(**launch_kwargs())
print("[tinycourt] launch() returned — holding main thread", flush=True)
demo.block_thread()
