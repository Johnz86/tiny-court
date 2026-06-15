# tests/screenshots

Diagnostic / QA screenshots and the promotional walkthrough video for **Tiny
Court of Everyday Crimes**. The captured `*.png` / `*.webm` artifacts are
**git-ignored** (regenerate them on demand); only this README and the folder
layout are tracked.

Every driver below launches the **real Gradio app** with Playwright/Chromium and
screenshots the live UI — there is no static mock. Start the app first, then run
the matching driver.

## Layout

| Folder        | Produced by                          | What it captures |
| ------------- | ------------------------------------ | ---------------- |
| `gradio/`     | `drive.cjs`, `drive_chips.cjs`, `drive_composer.cjs`, `drive_layout.cjs` | Core flow, reply chips, composer states, layout (desktop + mobile). |
| `full-trial/` | `drive_full_trial.cjs`               | The Full-Trial power path: evidence → witness → cross-examine → twist → judgement (Case File). |
| `layout/`     | `drive_meters_layout.cjs`            | Case-File meters / judgement / record spacing across viewports. |
| `diagnostics/`| ad-hoc captures during a `/diagnose` session | One-off bug-repro frames. |
| `promo/`      | `drive_promo.cjs`                    | The hero walkthrough **video** (`promo-walkthrough.webm`) + ordered frames, for the hackathon promo. The committed `assets/` copies are an **animated WebP** (`promo-walkthrough.webp`) — the only motion format GitHub renders inline in a README, since its page CSP blocks repo-hosted `<video>` — plus an MP4 download. Build both: `ffmpeg -i promo-walkthrough.webm -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an assets/promo-walkthrough.mp4`, then frames→`img2webp` (1.7× speed, 10fps, 860px, q68) for `assets/promo-walkthrough.webp`. |

## How to run

```bash
# 1. Start the app (fake backend is deterministic; use any backend you like).
#    Most drivers expect port 7860 or 7861 — see each script's BASE constant.
uv run python main.py                      # serves http://127.0.0.1:7860
TINYCOURT_BACKEND=fake uv run python main.py

# 2. In another terminal, run a driver (writes PNGs/WebM under this folder):
node scripts/drive_full_trial.cjs          # → full-trial/
node scripts/drive_promo.cjs               # → promo/  (records the walkthrough video)
npm run screenshots:promo                  # same, via package.json
```

The existing headless e2e (`scripts/verify_e2e.py`) drives the wizard handlers
directly and does **not** produce screenshots — it's the flow/safety gate. These
drivers are the visual companion to it.
