// Verifies the under-message reply-chip flow: composer send posts a message and
// STAYS in the phase; the phase's actions render as chips under the last bubble;
// the primary chip advances the trial.
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");

const BASE = "http://127.0.0.1:7860/?__theme=light";
const OUT = path.resolve("tests/screenshots/gradio");

async function settle(page) {
  // Wait for any Gradio status-tracker spinner to clear so it can't intercept input.
  await page.waitForFunction(
    () => !document.querySelector('[data-testid="status-tracker"]'),
    { timeout: 8000 }
  ).catch(() => {});
}

async function send(page, text) {
  await settle(page);
  const ta = page.locator("#composerInput textarea");
  await ta.fill(text);
  await ta.press("Enter");
  await page.waitForTimeout(300);
  await settle(page);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  const page = await ctx.newPage();
  const log = (m) => console.log(m);

  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.getByText("Begin Court Session").click();
  await page.waitForSelector(".message-shell", { timeout: 8000 });
  await page.waitForTimeout(400);

  // No chips until the user has filed something.
  log("empty-case chips (expect 0): " + (await page.locator("#surface .reply-chip").count()));

  // Send TWO complaint messages — must stay in case, two user bubbles appear.
  await send(page, "My roommate ate my clearly labeled emergency lasagna.");
  // Chips should now be present under the message in the case phase.
  const chips0 = await page.locator("#surface .reply-chip").allInnerTexts();
  log("case chips: " + JSON.stringify(chips0));
  const primary0 = await page.locator("#surface .reply-chip.primary").innerText();
  log("case primary label: " + primary0);
  await send(page, "Then denied it with suspicious calcium confidence.");
  const stillCase = await page.locator(".complaint-surface").count();
  const userBubbles = await page.locator("#surface .court-message.user").count();
  log("still in case (complaint-surface count): " + stillCase + ", user bubbles: " + userBubbles);
  await page.screenshot({ path: path.join(OUT, "chips-case-multisend.png") });

  // Click the primary chip -> should advance to judgement (paper card).
  await page.locator("#surface .reply-chip.primary").click();
  await page.waitForSelector(".ruling-surface", { timeout: 8000 });
  await page.waitForTimeout(500);
  log("advanced to judgement via primary chip: " + (await page.locator(".ruling-surface").count() > 0));
  await page.screenshot({ path: path.join(OUT, "chips-judgement.png") });

  // Judgement is a PAPER phase: actions are the real #actionRow buttons (no chips).
  const judgeChips = await page.locator("#surface .reply-chip").count();
  const actionRowVisible = await page.locator("#actionRow button:visible").count();
  log("judgement: surface chips=" + judgeChips + " (expect 0), visible #actionRow buttons=" + actionRowVisible);

  // Secondary chip dispatch: go Innocent -> plea glass phase, chips under message.
  await page.locator("#actionRow button", { hasText: "Innocent" }).first().click();
  await page.waitForSelector(".plea-context", { timeout: 8000 });
  await page.waitForTimeout(400);
  const pleaChips = await page.locator("#surface .reply-chip").allInnerTexts();
  log("plea chips: " + JSON.stringify(pleaChips));
  await page.screenshot({ path: path.join(OUT, "chips-plea.png") });

  // Plea-draft chip should fill the composer (not advance).
  await page.locator("#surface .reply-chip", { hasText: "Admit Partial Guilt" }).first().click();
  await page.waitForTimeout(400);
  const composerVal = await page.locator("#composerInput textarea").inputValue();
  log("composer after draft chip: " + JSON.stringify(composerVal));
  // Send the plea, then submit via primary chip.
  await page.locator("#composerInput textarea").press("Enter");
  await page.waitForTimeout(600);
  await page.locator("#surface .reply-chip.primary").click();
  await page.waitForSelector(".revision-banner, .ruling-surface", { timeout: 8000 });
  await page.waitForTimeout(500);
  log("plea submitted -> revised/ruling shown");
  await page.screenshot({ path: path.join(OUT, "chips-revised.png") });

  // Mobile: case chips render and wrap.
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await mp.goto(BASE, { waitUntil: "domcontentloaded" });
  await mp.waitForTimeout(800);
  await mp.getByText("Begin Court Session").click();
  await mp.waitForSelector(".message-shell", { timeout: 8000 });
  await send(mp, "My cat knocked the coffee over and watched the puddle form.");
  await mp.waitForTimeout(400);
  await mp.screenshot({ path: path.join(OUT, "chips-case-mobile.png") });
  log("mobile case chips: " + JSON.stringify(await mp.locator("#surface .reply-chip").allInnerTexts()));

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
