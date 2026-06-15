A good **custom multimodal textbox** should behave like a chat input first, and an attachment composer second. The text input should remain stable while media previews appear around it.

Gradio’s built-in `MultimodalTextbox` is fundamentally a textarea plus multimedia upload support, and it passes a value shaped like `{ "text": ..., "files": ... }` into the backend. That is the behavior your custom component should preserve even if the layout is custom. ([Gradio][1])

## 1. Empty / idle state

Default layout:

```text
┌─────────────────────────────────────────────┐
│ +  Type a message...                 🎤  ↑  │
└─────────────────────────────────────────────┘
```

Recommended behavior:

* Height is compact, usually one line.
* Upload button sits on the left or inside the input.
* Send button sits on the right.
* Placeholder is visible.
* No attachment area is shown yet.
* The component should feel like a normal chat textbox.

## 2. Single-line text input

When the user types a short message:

```text
┌─────────────────────────────────────────────┐
│ +  What is in this image?            🎤  ↑  │
└─────────────────────────────────────────────┘
```

Behavior:

* Stay at the minimum height.
* Do not grow vertically for a single line.
* Keep action buttons vertically centered.
* Pressing `Enter` should usually submit.
* `Shift + Enter` should insert a newline.

The text area should not jump or resize while the user types a normal short prompt.

## 3. Multiline text input

When text wraps or the user inserts line breaks:

```text
┌─────────────────────────────────────────────┐
│ +  Summarize this file and compare it       │
│    with the screenshot below.               │
│                                             │
│                                      🎤  ↑  │
└─────────────────────────────────────────────┘
```

Behavior:

* The textbox grows vertically up to a max height.
* After the max height, the text area scrolls internally.
* The whole page should not jump aggressively.
* Send/upload buttons should stay pinned to the bottom row or vertically aligned with the last line.
* The input should preserve the user’s cursor position while resizing.

Recommended sizing:

```text
min-height: 44–56px
max-height: 160–240px
overflow-y: auto after max height
```

## 4. Attachments added: general behavior

Once files are added, show an attachment tray **above the text field**, not inside the text cursor area.

```text
┌─────────────────────────────────────────────┐
│ [ image.png  ✕ ] [ report.pdf  ✕ ]          │
│                                             │
│ +  Please analyze these.             🎤  ↑  │
└─────────────────────────────────────────────┘
```

Why above the text field? It keeps typing predictable and avoids the textarea becoming a complicated mixed-content editor.

Behavior:

* Attachment previews appear in a horizontal row or wrapping grid.
* Each item has remove `✕`.
* Upload progress appears on the chip/card.
* Failed uploads should show an error state.
* The text area remains usable.
* The submitted value remains:

```python
{
    "text": "Please analyze these.",
    "files": [...]
}
```

Gradio’s current multimodal input model expects text and files together as a dictionary, so the UI can be visually rich while keeping the backend value simple. ([Gradio][2])

## 5. Screenshot / image attachments

Screenshots and images should use thumbnail cards.

```text
┌─────────────────────────────────────────────┐
│ ┌─────────┐ ┌─────────┐                     │
│ │ image   │ │ screen  │                     │
│ │ preview │ │ preview │                     │
│ └─────────┘ └─────────┘                     │
│                                             │
│ +  What changed between these?        ↑     │
└─────────────────────────────────────────────┘
```

Behavior:

* Show square or 4:3 thumbnails.
* Use object-fit cover or contain depending on the goal.
* Display filename on hover or below the thumbnail.
* Allow removal.
* Optionally allow click-to-preview larger.
* Multiple screenshots should form a row that wraps.

Recommended layout:

```text
thumbnail size: 72–120px
max tray height: around 160–220px
overflow: horizontal scroll or wrapped grid
```

Screenshots are visual, so a plain filename chip is usually not enough.

## 6. Audio attachments

Audio should appear as a compact audio card.

```text
┌─────────────────────────────────────────────┐
│ [ ▶  recording.wav  0:12        ✕ ]         │
│                                             │
│ +  Transcribe this.                  🎤  ↑  │
└─────────────────────────────────────────────┘
```

Behavior:

* Show filename, duration if available, and a play button.
* Do not show a huge waveform unless audio editing is central.
* Recording state should be visibly different from uploaded state.
* While recording, the input should show a live state:

```text
┌─────────────────────────────────────────────┐
│ ● Recording... 00:08          Stop  Cancel  │
│                                             │
│ +  Add context...                    ↑      │
└─────────────────────────────────────────────┘
```

For audio sources, Gradio commonly distinguishes upload and microphone-style input in its audio-related components; a multimodal textbox can follow the same mental model by supporting file upload and optional recording controls. ([Gradio][3])

## 7. Video attachments

Video should use a larger preview card than images, but still not dominate the composer.

```text
┌─────────────────────────────────────────────┐
│ ┌─────────────────────┐                     │
│ │ ▶ video.mp4          │                     │
│ │ 00:34                │                     │
│ └─────────────────────┘                     │
│                                             │
│ +  Describe the key moments.          ↑     │
└─────────────────────────────────────────────┘
```

Behavior:

* Show poster frame if available.
* Show play icon, filename, duration, and size.
* Avoid autoplay.
* Keep the preview compact.
* Allow click-to-expand into a modal or larger preview.
* For multiple videos, use cards in a scrollable tray.

Recommended behavior:

```text
single video: medium preview card
multiple videos: compact cards
very large video: show upload/progress/status clearly
```

## 8. Generic files: PDFs, docs, CSVs, ZIPs

Generic files should appear as file chips or cards, not previews unless you explicitly support previewing.

```text
┌─────────────────────────────────────────────┐
│ [ 📄 contract.pdf  2.4 MB  ✕ ]              │
│ [ 📊 data.csv      840 KB  ✕ ]              │
│                                             │
│ +  Summarize both files.             ↑      │
└─────────────────────────────────────────────┘
```

Behavior:

* Show icon based on file type.
* Show filename.
* Show size.
* Show upload status.
* Allow removal.
* Optionally allow preview for PDF/image/text files.
* Do not allocate image-style thumbnail space for unknown files.

Gradio’s generic `File` component is designed around uploading one or more files, and `MultimodalTextbox` similarly carries files as part of its combined message payload. ([Gradio][4])

## 9. Mixed content layout

For mixed media, use a unified attachment tray:

```text
┌─────────────────────────────────────────────┐
│ [ 🖼 screenshot.png ✕ ] [ ▶ demo.mp4 ✕ ]     │
│ [ 📄 report.pdf ✕ ]    [ 🎧 audio.wav ✕ ]    │
│                                             │
│ +  Use all of these as context.       ↑     │
└─────────────────────────────────────────────┘
```

Behavior:

* All attachments live in the same tray.
* Visual media gets thumbnails.
* Audio/video gets playable cards.
* Generic files get compact cards.
* The text input remains below the tray.
* The send button submits all text and attachments together.

Do **not** interleave media inside the editable text unless you are intentionally building a rich-text editor. For a chat-style multimodal textbox, separate `text` and `files` is simpler, more robust, and closer to Gradio’s backend model.

## 10. Recommended component state model

Your frontend state can be simple:

```ts
type MultimodalValue = {
  text: string;
  files: UploadedFile[];
};

type UploadedFile = {
  path?: string;
  url?: string;
  name: string;
  size?: number;
  mime_type?: string;
  type?: "image" | "audio" | "video" | "file";
  upload_status?: "uploading" | "done" | "error";
};
```

The layout should derive from the files:

```text
no files       → compact textbox
image files    → thumbnail cards
audio files    → audio cards
video files    → video preview cards
other files    → document/file chips
many files     → scrollable or wrapping attachment tray
```

## 11. Final layout rule

The best behavior is:

```text
Attachment tray appears above.
Textbox grows below it.
Controls stay pinned.
Submit sends { text, files }.
```

That gives you a predictable chat input, supports single-line and multiline text, and handles screenshots, audio, video, and generic files without turning the textbox into an unstable mixed-media editor.

[1]: https://www.gradio.app/docs/gradio/multimodaltextbox?utm_source=chatgpt.com "MultimodalTextbox"
[2]: https://www.gradio.app/4.44.1/docs/gradio/multimodaltextbox?utm_source=chatgpt.com "Gradio MultimodalTextbox Docs"
[3]: https://www.gradio.app/docs/gradio/audio?utm_source=chatgpt.com "Audio - Gradio Docs"
[4]: https://www.gradio.app/4.44.1/docs/gradio/file?utm_source=chatgpt.com "Gradio File Docs"

---

# Building the component (rebuild recipe)

The above is the **behaviour/design** of the composer. The component itself lives
at `custom_components/MultimodalComposer` (a `gradio cc` package based on the
MultimodalTextbox template; value contract `{text, files}`). Its compiled frontend
in `backend/gradio_multimodalcomposer/templates/` is **committed**, so a normal
`uv sync` / deploy never rebuilds it (see `docs/deployment.md` → "Custom
component"). You only need this recipe after **editing the component's frontend**.

## Three Windows gotchas (all solved)

1. **Force UTF-8** or `gradio cc build` crashes printing its `📦` emoji to cp1252:
   prefix `PYTHONUTF8=1 PYTHONIOENCODING=utf-8`.
2. **Pass `--python-path`** to the repo venv python, else it shells out to the
   WindowsApps `python3` stub:
   `--python-path "D:/GIT/python/tiny-court/.venv/Scripts/python.exe"`. Also
   requires `build` installed in that venv
   (`uv pip install --python <venv-python> build`).
3. **`@gradio/preview` has a Windows path bug** — it imports `gradio.config.js`
   via `join("file://"+dir, ...)`, which `path.join` mangles. Patch
   `frontend/node_modules/@gradio/preview/dist/index.js` (2 spots) to
   `"file://" + join(dir,"gradio.config.js").split(String.fromCharCode(92)).join("/")`.
   **Re-running `npm install` wipes this patch** — reapply if so.

## Full recipe (from repo root)

```bash
cd custom_components/MultimodalComposer
PYTHONUTF8=1 PYTHONIOENCODING=utf-8 "D:/GIT/python/tiny-court/.venv/Scripts/gradio.exe" \
  cc build --no-generate-docs \
  --python-path "D:/GIT/python/tiny-court/.venv/Scripts/python.exe"
```

Outputs:
- `backend/gradio_multimodalcomposer/templates/` — needed for the local run via the
  editable install (and committed for deployment).
- `dist/*.whl` — for a wheel-based deployment.

Editable-installed with `uv pip install -e custom_components/MultimodalComposer`.

Also fixed template imports while building:
- `Index.svelte`: `WaveformOptions` ← `@gradio/audio`
- `MultimodalTextbox.svelte`: `I18nFormatter` ← `@gradio/utils`

App-side composer CSS overrides are hand-edited directly in
`tinycourt/static/courtroom.css`.
