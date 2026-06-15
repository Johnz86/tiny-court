// Drives the live Tiny Court Gradio app with Playwright for verification
// screenshots. Uses wall-clock waits (the app routes via an on-load server
// round-trip + click handlers, which --virtual-time-budget races).
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");

const BASE = "http://127.0.0.1:7860/?__theme=light";
const OUT = path.resolve("tests/screenshots/gradio");

async function shoot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("shot", name);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  const page = await ctx.newPage();

  // 1) Landing -> click Begin -> case glass shell
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await shoot(page, "flow-landing");
  await page.getByText("Begin Court Session").click();
  await page.waitForSelector(".message-shell", { timeout: 8000 });
  await page.waitForTimeout(600);
  await shoot(page, "flow-case");

  // 2) Type a complaint, click Fast Judgement -> ruling paper card
  await page.locator("#composerInput textarea").fill(
    "My roommate keeps eating my yogurt and lied about it with suspicious calcium confidence."
  );
  await page.waitForTimeout(300);
  await shoot(page, "flow-case-typed");
  await page.getByRole("button", { name: "Fast Judgement" }).first().click();
  await page.waitForSelector(".ruling-surface", { timeout: 8000 });
  await page.waitForTimeout(700);
  await shoot(page, "flow-judgement");

  // 3) Plead Innocent -> plea glass -> submit -> revised
  await page.getByRole("button", { name: "Innocent" }).first().click();
  await page.waitForSelector(".plea-context", { timeout: 8000 });
  await page.waitForTimeout(500);
  await shoot(page, "flow-plea");
  await page.locator("#composerInput textarea").fill(
    "I was nowhere near the fridge, your honor; I have a blender-based alibi."
  );
  await page.getByRole("button", { name: "Submit Plea" }).first().click();
  await page.waitForSelector(".revision-banner, .ruling-surface", { timeout: 8000 });
  await page.waitForTimeout(700);
  await shoot(page, "flow-revised");

  // 4) Finalize -> court record
  await page.getByRole("button", { name: "Finalize" }).first().click();
  await page.waitForTimeout(900);
  await shoot(page, "flow-sentence");

  // 5) Mobile judgement via the same flow
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await mp.goto(BASE, { waitUntil: "domcontentloaded" });
  await mp.waitForTimeout(700);
  await mp.getByText("Begin Court Session").click();
  await mp.waitForSelector(".message-shell", { timeout: 8000 });
  await mp.locator("#composerInput textarea").fill("My cat knocked the coffee over and watched.");
  await mp.getByRole("button", { name: "Fast Judgement" }).first().click();
  await mp.waitForSelector(".ruling-surface", { timeout: 8000 });
  await mp.waitForTimeout(700);
  await mp.screenshot({ path: path.join(OUT, "flow-judgement-mobile.png") });
  console.log("shot flow-judgement-mobile");

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
