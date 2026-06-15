# Deploying a Gradio app to Hugging Face Spaces — field guide

A practical runbook distilled from actually shipping this app to
`build-small-hackathon/tiny-court`. It covers the `hf` CLI commands, the exact
code/config changes, and the non-obvious gotchas (each cost real debugging time).
It complements [`deployment.md`](deployment.md) (this project's specifics) with the
general, reusable knowledge.

> The app is live at <https://huggingface.co/spaces/build-small-hackathon/tiny-court>.
> Direct app URL: `https://<namespace>-<name>.hf.space` (namespace/name joined by a
> dash, dots/underscores → dashes).

---

## 0. TL;DR checklist

1. Get a **Write** HF token (not Read; fine-grained personal-namespace tokens can't
   create org Spaces) — §1.
2. `hf repos create <ns>/<name> --type space --space-sdk gradio --flavor <hw> --env … --public` — §2.
3. README frontmatter: `sdk_version`, `app_file`, `python_version`, `license`, `tags`,
   `short_description` (≤60 chars) — §3.
4. `requirements.txt`: **do not pin** `gradio` / `huggingface_hub` / `spaces` — §4.
5. App entry: expose a **module-level `demo`**, config via `launch()`, `ssr_mode=False` — §5.
6. Custom component → **prebuilt wheel from the Space's resolve URL** (not `-e ./path`) — §6.
7. `git push` with **Git LFS** for any binary — §7.
8. Pick hardware: `cpu-basic` (free) vs `zero-a10g` (ZeroGPU, needs a registered
   `@spaces.GPU` handler + a PRO creator) — §8.
9. Verify with logs + curl; force UTF-8 so `hf spaces logs` doesn't crash — §9.
10. If the app is viewport-locked, handle the **iframe height runaway** — §10.

---

## 1. Authentication & token gotchas

ZeroGPU/org Space creation needs a **Write** token. Three traps we hit:

- **Read vs Write.** A *Read* token lets `hf auth whoami` succeed but every write
  (create Space, push) returns `403`. Create a **classic Write** token at
  <https://huggingface.co/settings/tokens>.
- **Fine-grained tokens are scoped.** A fine-grained token scoped to *"all repos
  under your personal namespace"* **cannot** create a repo in an **org**
  (`403 … rights to create a space under the namespace "<org>"`). To create in an
  org as a `contributor`, use a **classic Write** token (it acts with your full
  membership rights). Fine-grained org access usually needs an org admin to enable it.
- **`HF_TOKEN` env var shadows everything.** Token resolution order is:
  `HF_TOKEN` env var → `hf auth login` stored token. A stale `HF_TOKEN` in the
  environment overrides a fresh `hf auth login`. Worse, a **Process-scope** env var
  shadows a **User-scope** one. On Windows we read the User-scope value explicitly:

  ```powershell
  $t = [Environment]::GetEnvironmentVariable("HF_TOKEN","User")
  ```

Verify the **role** before doing anything (don't just trust `whoami`):

```bash
curl -s https://huggingface.co/api/whoami-v2 -H "Authorization: Bearer $(hf auth token)" \
  | python -c "import sys,json;print(json.load(sys.stdin)['auth']['accessToken']['role'])"
# -> "write"  (if "read", you have the wrong token)
```

`hf auth token` prints the currently active token (useful to feed `git push`).

---

## 2. Create the Space (`hf` commands)

```bash
SPACE=<namespace>/<name>           # e.g. build-small-hackathon/tiny-court

hf repos create "$SPACE" --type space --space-sdk gradio \
    --flavor zero-a10g \            # ZeroGPU; or cpu-basic (free), or a paid flavor
    --env TINYCOURT_BACKEND=fake \  # non-secret config, visible to visitors
    --public \                      # or --private / --protected
    --exist-ok
```

- `--space-sdk` is required (`gradio` | `docker` | `static`).
- `--flavor` sets hardware. **Hardware is NOT set in README frontmatter** (silently
  ignored) — only via `--flavor` at create, or `hf spaces settings <id> --hardware <hw>`.
- `--env KEY=val` → visible env var. `--secrets KEY=val` → hidden (API keys, `HF_TOKEN`).
- `hf spaces hardware` lists flavors + pricing.

Change things later:

```bash
hf spaces settings  "$SPACE" --hardware cpu-basic       # switch hardware
hf spaces variables add "$SPACE" --env GRADIO_SSR_MODE=false
hf spaces secrets   add "$SPACE" --secrets HF_TOKEN=hf_xxx
hf repos  settings  "$SPACE" --type space --public      # change visibility
hf spaces restart   "$SPACE" --factory-reboot
```

---

## 3. README frontmatter

The `README.md` YAML header **is** the Space config. Minimum:

```yaml
---
title: Tiny Court of Everyday Crimes
emoji: ⚖️
colorFrom: yellow            # red|yellow|green|blue|indigo|purple|pink|gray only
colorTo: red
sdk: gradio                  # gradio | docker | static
sdk_version: 6.16.0          # the platform installs THIS gradio (don't also pin it in requirements)
app_file: main.py            # entry file (default app.py); overriding to main.py is fine
python_version: "3.12"       # ZeroGPU supports 3.10.13 and 3.12.12
pinned: true
license: apache-2.0
short_description: ...        # ≤ 60 chars or the server rejects it
startup_duration_timeout: 30m # bump to 1h for big model downloads
tags:                        # e.g. hackathon track / sponsor / achievement tags
  - gradio
models:                      # optional: renders a model carousel
  - openbmb/MiniCPM-V-4_6
---
```

Everything below the `---` is the rendered Space card (Markdown).

---

## 4. `requirements.txt` rules

**Do NOT list these** — they are preinstalled and platform-managed; pinning them
causes resolution failures or silently breaks the (Zero)GPU runtime:

- `gradio` (its version comes from `sdk_version`)
- `huggingface_hub`
- `spaces`

**Do list** everything else you import (`transformers`, `accelerate`, `pillow`, …),
plus `torchvision`/`torchaudio` if used. Leave **`torch` unpinned** (the runtime
preinstalls a matching CUDA build; ZeroGPU only accepts specific torch versions).

> Lightweight Space pattern: if the on-Space model is optional and lazily imported,
> omit `torch`/`transformers` entirely for a tiny, fast build (this app runs the
> deterministic "fake" backend on the Space and only pulls the heavy deps for the
> local model path, which is imported lazily).

---

## 5. The app entry point (code changes that matter)

HF runs the `app_file` and Gradio's launcher looks for a **module-level Blocks
named `demo`**. Hide it inside `main()` and you get
`GRADIO_HOT_RELOAD: Launching demo not found in __main__` and a crash. Structure:

```python
# main.py  (app_file)
from myapp import build_demo, launch_kwargs, warm_backend

warm_backend()           # any startup work
demo = build_demo()      # MODULE-LEVEL Blocks named `demo`

if __name__ == "__main__":
    demo.launch(**launch_kwargs())
```

`launch_kwargs()` (single source of truth):

```python
def launch_kwargs() -> dict:
    return dict(
        server_name="0.0.0.0",     # so the Space proxy can reach it
        server_port=7860,          # HF expects 7860
        ssr_mode=False,            # Gradio 6 SSR Node proxy starts then dies on Spaces → RUNTIME_ERROR
        theme=gr.themes.Base(),
        css_paths=[str(CSS_PATH)], # Gradio 6 IGNORES theme/css/head on the Blocks constructor —
        head=HEAD_HTML,            # they MUST be passed to launch()
    )
```

Key facts:

- **Gradio 6 moved `theme`/`css`/`head` to `launch()`.** Passing them to
  `gr.Blocks(...)` is silently dropped (with a deprecation warning) — the app renders
  unstyled. Put them in `launch()` / `launch_kwargs()`.
- **Disable SSR** (`ssr_mode=False`) and/or set Space var `GRADIO_SSR_MODE=false`.
  Gradio 6 defaults to an SSR Node proxy (`Node proxy -> Python :7861`) that, on a
  Space, prints `Stopping Node.js server…` and exits → `RUNTIME_ERROR`.
- `launch()` blocks locally; if a Space env makes it non-blocking the container exits.
  The module-level `demo` + the explicit `launch()` under `__main__` is the robust shape.

---

## 6. Custom Gradio components

HF installs `requirements.txt` in an **early build layer where the app code isn't
copied yet**, so a local editable install fails:

```
ERROR: ./custom_components/MyComp is not a valid editable requirement
```

Don't use `-e ./custom_components/...`. Instead **build a wheel and install it from
the Space's own `resolve` URL** (a network download, available during the
requirements layer). The component must be public for this.

```bash
# 1) build the wheel (hatchling packages the committed templates/ — no Node needed)
uv build --wheel custom_components/MyComp --out-dir wheels
# 2) commit it under wheels/ (LFS — it's a binary)
# 3) requirements.txt:
```

```
mycomp @ https://huggingface.co/spaces/<ns>/<name>/resolve/main/wheels/mycomp-0.0.1-py3-none-any.whl
```

Alternatives: publish the component to **PyPI** (`gradio cc publish`) and pin it, or
`mycomp @ git+https://huggingface.co/spaces/<ns>/<name>#subdirectory=custom_components/MyComp`
(pip clones the repo at build — slower, circular).

---

## 7. Pushing code (git + LFS)

A Space is a git repo. Push the **committed tree** (cleaner than `hf upload`, which
ignores `.gitignore`):

```bash
git remote add hf "https://huggingface.co/spaces/$SPACE"
TOKEN=$(... read User-scope HF_TOKEN ...)
GIT_TERMINAL_PROMPT=0 git -c http.version=HTTP/1.1 -c http.postBuffer=524288000 \
  push --force "https://<user>:${TOKEN}@huggingface.co/spaces/$SPACE" master:main
```

**Binaries MUST be Git LFS** or the push is rejected:

```
remote: Your push was rejected because it contains binary files.
  - assets/foo.webp …
```

Set up LFS and convert the whole history (HF checks every commit, not just the tip):

```bash
git lfs install --local
# add patterns to .gitattributes (woff2, webp, mp4, whl, png, …) then:
git lfs migrate import --include="*.woff2,*.webp,*.mp4,*.whl,*.png" --everything
# or, for a single clean commit, orphan-commit the working tree after `git lfs track`.
```

Notes: `http.version=HTTP/1.1` + a large `http.postBuffer` avoid
`fatal: the remote end hung up unexpectedly` on big packs. LFS objects upload over
the same tokenized URL.

---

## 8. Hardware: cpu-basic vs ZeroGPU

| | `cpu-basic` | `zero-a10g` (ZeroGPU) |
|---|---|---|
| Cost | free | free for creator; needs creator on **PRO/Team/Enterprise** |
| GPU | none | per-request, dynamic |
| Use | UI demo, API-proxy, small CPU model | PyTorch model on-Space |

**ZeroGPU has a hard startup requirement:** at least one **`@spaces.GPU`-decorated
function must be a *registered* Gradio event handler** (bound to `.click`/`.submit`/
`.load`). Otherwise the Space dies with:

```
RuntimeError: No @spaces.GPU function detected during startup
```

> This bit us: our `@spaces.GPU` lives deep inside the generation client (an inner
> helper), not on a registered handler, so ZeroGPU refused to boot. The startup scan
> only walks Gradio's registered handlers. To run on ZeroGPU you must decorate the
> handler Gradio binds (or a thin wrapper it calls that is itself registered).

Other ZeroGPU rules: `import spaces` **before** torch; load the model at module scope
and `.to("cuda")` eagerly (CUDA only touched inside `@spaces.GPU`). If on-Space GPU
doesn't fit your architecture, mirror the lightweight-frontend pattern (a `cpu-basic`
Space calling a remote endpoint — e.g. Modal or an Inference Provider).

---

## 9. Verifying & debugging

```bash
hf spaces info "$SPACE" --format json          # stage: BUILDING|APP_STARTING|RUNNING|RUNTIME_ERROR
hf spaces logs "$SPACE" --build                # build logs (find the FIRST error)
hf spaces logs "$SPACE"                         # run logs (the app's stdout/stderr + traceback)
```

Gotchas:

- **`hf spaces logs` crashes on emoji** under a non-UTF-8 console
  (`UnicodeEncodeError: 'charmap' codec can't encode '⚡'`), truncating the log at
  the first emoji. Force UTF-8 first:
  ```powershell
  $env:PYTHONUTF8 = "1"; [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
  ```
- **Don't trust `RUNNING`.** Curl the real URL — a `503 "Your space is in error"`
  means the process exited even if logs looked fine:
  ```bash
  curl -sIL "https://<ns>-<name>.hf.space/" | grep -i "^HTTP"
  ```
- `RUNTIME_ERROR` right after `APP_STARTING` with sparse logs = boot exceeded
  `startup_duration_timeout` (bump it) and/or the SSR health-check issue
  (`GRADIO_SSR_MODE=false`).

---

## 10. The iframe height runaway (viewport-locked apps)

**Symptom.** On the Space page the app's iframe grows without bound
(`style="height: 209995px"`); the content scrolls out of view. The composer/bottom is
cut off; a fixed height fixes the runaway but doesn't fit the available area.

**Why.** HF embeds the Space in an **auto-resizing iframe** (iframe-resizer). A
viewport-locked layout (`min-height: 100svh`, `height: 100%`, `fill_height=True`)
makes the reported content height depend on the iframe's own height → positive
feedback. The specific trigger: **Gradio's `fill_height=True` writes an inline
`min-height: <viewport>px` on its `div.main.fillable` wrapper** (a known Gradio 6
regression, [#12510]); inside the iframe that "viewport" is the iframe height, so the
wrapper overflows the clipped container and is exactly what the resizer measures.

This is a recognized Gradio bug ([#10826], partially fixed in [PR #11749] / 5.45.0,
which then regressed). The common community fix is to **replace `calc(100vh - X)` with
fixed `px`** ([example commit]) — it bounds the runaway but doesn't adapt to window size.

**Why CSS alone can't fully fix it.** Inside a **cross-origin** iframe, `100%` / `vh`
/ `svh` / container queries all resolve to the **iframe's own height** (the feedback
variable), and CSS cannot read the parent window's height. `calc(100% - 50px)` doesn't
help: `100%` is still the iframe height, and the HF header lives in the *parent*
document, outside the iframe. The only CSS-knowable bounded value is a fixed `px`,
which can't match the available area.

**Our solution (fits + responsive, ~15 lines JS).** Read the parent geometry via
iframe-resizer's content API (`getPageInfo`) — its values are independent of the
iframe's own height — and publish a fixed px as a CSS variable; let CSS consume it.

`courtroom.js` (runs in `<head>`, before render):

```js
// Tag <html> when embedded (cross-origin access to window.top throws → also embedded).
try { if (window.self !== window.top) document.documentElement.classList.add("tc-embed"); }
catch (e) { document.documentElement.classList.add("tc-embed"); }

// Compute the available height from the PARENT (windowHeight - the iframe's offset).
(function fitEmbedHeight() {
  if (window.self === window.top) return;
  function apply(info) {
    var h = Math.max(360, Math.round(info.windowHeight - info.offsetTop + (info.scrollTop || 0)));
    document.documentElement.style.setProperty("--embed-h", h + "px");
  }
  var n = 0, iv = setInterval(function () {
    var pi = window.parentIFrame;                 // iframe-resizer content API
    if (pi && typeof pi.getPageInfo === "function") {
      clearInterval(iv);
      try { pi.getPageInfo(apply); } catch (e) {} // re-fires on parent resize/scroll
    } else if (++n > 200) clearInterval(iv);
  }, 100);
})();
```

`courtroom.css` (embed-only; standalone keeps the viewport-lock):

```css
/* Pin the shell to the computed available height (fallback 820px until JS resolves). */
html.tc-embed, html.tc-embed body, html.tc-embed gradio-app,
html.tc-embed .gradio-container, html.tc-embed #tc-app {
  height: var(--embed-h, 820px) !important;
  min-height: 0 !important;
  max-height: var(--embed-h, 820px) !important;
  overflow: hidden !important;
}
/* Neutralise Gradio fill_height's inflating min-height + cap the wrapper chain. */
html.tc-embed .gradio-container .fillable,
html.tc-embed .gradio-container .wrap,
html.tc-embed .gradio-container .contain,
html.tc-embed .gradio-container > .main,
html.tc-embed #landingView, html.tc-embed #courtView {
  min-height: 0 !important;
  max-height: var(--embed-h, 820px) !important;
}
```

**Do / don't:**

- **Don't** drive `parentIFrame.size()` from your JS — it *feeds* the loop.
- **Don't** use `vh`/`svh`/`100%` for the embed height — all circular.
- **Do** scope it to an embed-only class so the standalone (direct-URL) view keeps its
  viewport-locked layout untouched.
- Alternative root cause cleanup: since `fill_height=True` is the buggy source and is
  regressed in Gradio 6, you can **drop `fill_height` and use `flex-grow: 1` CSS**
  (the maintainers' [#12510] workaround) — fewer feedback sources, though `svh` rules
  still need the embed handling.

Verify the fix with Playwright against the **wrapper page** (not the app URL), measuring
the iframe twice to confirm it's **stable** (not oscillating) and that the composer's
`getBoundingClientRect().bottom <= window.innerHeight`.

---

## 11. Known non-issues (don't chase these)

- Console: `Unrecognized feature: 'ambient-light-sensor' / 'battery' / 'vr' / 'wake-lock' …`
  — emitted by HF's wrapper page from the **`allow="…"` attribute it puts on the Space
  iframe**; the browser just doesn't recognize some Permissions-Policy tokens. Not your app.
- `GET /api/spaces/by-subdomain/<…> 400` — HF's own page calling its own API. Not your app.

---

## References

- [gradio-app/gradio #10826 — Tackle iframe resizer issues][#10826]
- [gradio-app/gradio #12510 — fill_height=True broken in Gradio 6][#12510]
- [gradio-app/gradio PR #11749 — official (later regressed) iframe fix][PR #11749]
- [polats/ZeroGPU-LLM-Inference — fixed-px CSS fix commit][example commit]
- Hugging Face Spaces docs: <https://huggingface.co/docs/hub/spaces-overview>
- `hf` CLI: `hf --help`, and the `hf-cli` / `huggingface-spaces` Claude Code skills.

[#10826]: https://github.com/gradio-app/gradio/issues/10826
[#12510]: https://github.com/gradio-app/gradio/issues/12510
[PR #11749]: https://github.com/gradio-app/gradio/pull/11749
[example commit]: https://huggingface.co/spaces/polats/ZeroGPU-LLM-Inference/commit/936637d78692e58e06529ce0f8dd90b607d5bfde
