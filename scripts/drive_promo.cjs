// Promotional walkthrough for the hackathon video.
//
// Records ONE polished hero trial end-to-end as a video, and drops an ordered
// set of still frames alongside it — storyboard material for editing the promo.
// Unlike the other drive_*.cjs (which grab isolated states), this drives the
// full emotional arc at a watchable pace:
//
//   landing -> Full Trial -> file complaint -> evidence -> witness ->
//   cross-examine -> twist -> judgement -> leniency appeal -> revised ruling ->
//   sentence -> save the shareable court record.
//
// Run the app first (any backend; fake is deterministic and reads great), then:
//   GRADIO_SERVER_PORT=7861 TINYCOURT_BACKEND=fake uv run python main.py
//   node scripts/drive_promo.cjs
//
// Output (git-ignored): tests/screenshots/promo/
//   promo-walkthrough.webm   the recorded run
//   00-*.png … 10-*.png      ordered storyboard frames
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");
const fs = require("fs");

const BASE = "http://127.0.0.1:7861/?__theme=light";
const OUT = path.resolve("tests/screenshots/promo");
fs.mkdirSync(OUT, { recursive: true });

// A crisp desktop stage for the recording.
const SIZE = { width: 1536, height: 864 };

// A case that lands the comedy and exercises every move.
const COMPLAINT =
  "My cat unplugged the router during my big work meeting and then looked extremely smug about it.";
const EVIDENCE =
  "There were fresh paw prints on the power strip and a suspicious, theatrical lack of remorse.";
const PLEA =
  "The defendant is but a small animal of large opinions. We beg the court for warmth, not iron.";

// Beat pacing (ms). Long enough to read on screen, short enough to stay punchy.
const BEAT = 1500;
const SETTLE = 900;

let frame = 0;
async function shoot(page, name) {
  const file = `${String(frame++).padStart(2, "0")}-${name}.png`;
  await page.screenshot({ path: path.join(OUT, file) });
  console.log("frame", file);
}

// Click an in-shell reply chip by its data-tc-action id, then wait for the turn.
async function chip(page, id, waitFor) {
  const sel = `#surface .reply-chip[data-tc-action="${id}"]`;
  await page.waitForSelector(sel, { timeout: 12000 });
  await page.waitForTimeout(BEAT);
  await page.click(sel);
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 15000 });
  await page.waitForTimeout(SETTLE);
}

// Click a paper-phase action button (#actionRow gr.Button) by its visible label.
async function paperBtn(page, label, waitFor) {
  const btn = page.locator("#actionRow button", { hasText: label }).first();
  await btn.waitFor({ state: "visible", timeout: 12000 });
  await page.waitForTimeout(BEAT);
  await btn.click();
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 15000 });
  await page.waitForTimeout(SETTLE);
}

// Type into the composer at a human pace (reads better on camera), then send.
async function compose(page, text, { send = true } = {}) {
  const ta = "#composerInput textarea";
  await page.waitForSelector(ta, { timeout: 10000 });
  await page.click(ta);
  await page.fill(ta, "");
  await page.type(ta, text, { delay: 18 });
  await page.waitForTimeout(SETTLE);
  if (send) {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(BEAT);
  }
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: SIZE,
    recordVideo: { dir: OUT, size: SIZE },
  });
  const page = await ctx.newPage();

  // ── Landing: let the rotating hero docket breathe before we begin ──────────
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  await shoot(page, "landing");

  // Take the Full Trial path (the power-user arc with every move available).
  await page.click("#beginFullBtn");
  await page.waitForSelector(".message-shell", { timeout: 8000 });
  await page.waitForTimeout(SETTLE);

  // ── Case: file the complaint ───────────────────────────────────────────────
  await compose(page, COMPLAINT);
  await shoot(page, "complaint-filed");

  // ── Evidence ────────────────────────────────────────────────────────────────
  await chip(page, "submit_evidence");
  await shoot(page, "evidence-prompt");
  await compose(page, EVIDENCE);

  // ── Witness → cross-examination ─────────────────────────────────────────────
  await chip(page, "call_witness");
  await shoot(page, "witness");
  await chip(page, "cross_examine");
  await shoot(page, "cross-examine");

  // ── The once-per-trial twist ────────────────────────────────────────────────
  await chip(page, "add_twist");
  await shoot(page, "twist");

  // ── Judgement (paper) ───────────────────────────────────────────────────────
  await chip(page, "ask_judge", ".ruling-surface");
  await page.waitForTimeout(BEAT);
  await shoot(page, "judgement");

  // ── Appeal for leniency → a revised ruling that moves the needle ───────────
  await paperBtn(page, "Appeal: Leniency", '#surface .reply-chip[data-tc-action="submit_plea"]');
  await shoot(page, "appeal");
  await compose(page, PLEA);
  await chip(page, "submit_plea", ".ruling-surface");
  await page.waitForTimeout(BEAT);
  await shoot(page, "revised-ruling");

  // ── Sentence + the shareable court record ──────────────────────────────────
  await paperBtn(page, "Finalize", '#actionRow button:has-text("Save Image")');
  await page.waitForTimeout(BEAT);
  await shoot(page, "sentence");
  await paperBtn(page, "Save Image");
  await page.waitForTimeout(BEAT);
  await shoot(page, "record-export");

  // Hold on the final record so the video ends on the payoff.
  await page.waitForTimeout(2000);

  // Flush + name the recording.
  const video = page.video();
  await ctx.close();
  if (video) {
    const src = await video.path();
    const dest = path.join(OUT, "promo-walkthrough.webm");
    try { fs.rmSync(dest, { force: true }); } catch {}
    fs.renameSync(src, dest);
    console.log("video", path.relative(process.cwd(), dest));
  }
  await browser.close();
})();
