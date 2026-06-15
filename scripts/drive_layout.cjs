// Verifies the chat-scroll / paper-fit / busy-state fixes against the live app.
// Run the app first (TINYCOURT_BACKEND=fake uv run python main.py), then:
//   node scripts/drive_layout.cjs
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");

const BASE = "http://127.0.0.1:7861/?__theme=light";
const OUT = path.resolve("tests/screenshots/gradio");

async function shoot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("shot", name);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.getByText("Begin Court Session").click();
  await page.waitForSelector(".message-shell", { timeout: 8000 });

  // 1) Long conversation: several sends; the shell must scroll, composer clear.
  const msgs = [
    "My daughter did not do the dishes, that she was order to yesterday. This was her duty.",
    "She added her own dishes and they are ceramic. After a day, all the dishes are dirty by the hardned sticky food.",
    "The sink is now a sculpture garden of neglect and the sponge has filed for hazard pay.",
    "I have photographic evidence of the spaghetti pot from three days ago.",
    "She claims the dishwasher is 'technically also furniture' and refuses jurisdiction.",
  ];
  for (const m of msgs) {
    await page.fill("#composerInput textarea", m);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
  }
  await shoot(page, "fix-conversation-scroll");

  // Busy-state capture: click the primary chip and screenshot immediately
  // (spinner + dimmed chips + typing bubble before the response repaints).
  const chip = await page.$('#surface .reply-chip.primary');
  if (chip) {
    await chip.click();
    await page.waitForTimeout(120);
    await shoot(page, "fix-busy-state");
  }

  // 2) Judgement paper card must fit the viewport (internal scroll if long).
  await page.waitForSelector(".ruling-surface", { timeout: 15000 });
  await page.waitForTimeout(700);
  await shoot(page, "fix-judgement-fit");

  // Metrics: shell vs composer overlap + card bounds.
  const m = await page.evaluate(() => {
    const r = (el) => el ? el.getBoundingClientRect() : null;
    const card = r(document.querySelector('.ruling-surface'));
    return {
      viewport: window.innerHeight,
      card: card ? { top: card.top, bottom: card.bottom } : null,
    };
  });
  console.log("judgement metrics:", JSON.stringify(m));

  await browser.close();
})();
