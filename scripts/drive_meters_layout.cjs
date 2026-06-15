// Captures the layout at each phase to verify the meters-strip + vertical
// spacing redesign. Run the app first (port 7861), then:
//   node scripts/drive_meters_layout.cjs
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");
const fs = require("fs");

const BASE = "http://127.0.0.1:7861/?__theme=light";
const OUT = path.resolve("tests/screenshots/layout");
fs.mkdirSync(OUT, { recursive: true });

async function shoot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("shot", name);
}

async function metrics(page) {
  return page.evaluate(() => {
    const r = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height), w: Math.round(b.width) };
    };
    const meters = document.querySelector(".meters");
    let meterRows = null;
    if (meters) {
      const tops = [...meters.querySelectorAll(".meter")].map((m) => Math.round(m.getBoundingClientRect().top));
      meterRows = new Set(tops).size;
    }
    return {
      viewport: window.innerHeight,
      stepper: r("#courtView .stepper"),
      surface: r("#surface"),
      card: r(".ruling-surface"),
      meters: r(".meters"),
      meterRows,
      actionRow: r("#actionRow"),
      composer: r("#composerInput"),
    };
  });
}

async function run(width, height, tag) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.getByText("Begin Court Session").click();
  await page.waitForSelector(".message-shell", { timeout: 8000 });
  await shoot(page, `${tag}-1-case`);
  console.log(tag, "case", JSON.stringify(await metrics(page)));

  // File the complaint, go straight to judgement.
  await page.fill("#composerInput textarea", "My roommate keeps eating my yogurt and denying it with a straight face.");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(700);

  // Click the primary chip (fast judgement / ask the judge).
  const chip = await page.$('#surface .reply-chip.primary');
  if (chip) { await chip.click(); }
  await page.waitForSelector(".ruling-surface", { timeout: 15000 });
  await page.waitForTimeout(1100);
  await shoot(page, `${tag}-2-judgement`);
  console.log(tag, "judgement", JSON.stringify(await metrics(page)));

  await browser.close();
}

(async () => {
  await run(1536, 864, "desktop");
  await run(1280, 720, "laptop");
  await run(390, 844, "mobile");
})();
