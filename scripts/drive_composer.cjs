// Drives the composer through its key states for visual verification.
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");

const BASE = "http://127.0.0.1:7860/?__theme=light";
const OUT = path.resolve("tests/screenshots/gradio");
const TF = path.resolve("scripts/_composer_testfiles");
const files = {
  img: path.join(TF, "evidence_photo.png"),
  pdf: path.join(TF, "court_contract.pdf"),
  wav: path.join(TF, "defensive_meow.wav"),
  csv: path.join(TF, "snack_inventory.csv"),
};

async function enterCase(page) {
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.getByText("Begin Court Session").click();
  await page.waitForSelector("#composerInput textarea", { timeout: 8000 });
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 } });
  const page = await ctx.newPage();

  await enterCase(page);
  await page.screenshot({ path: path.join(OUT, "composer-empty.png") });
  console.log("shot composer-empty");

  // single line
  await page.locator("#composerInput textarea").fill("My roommate ate the emergency lasagna.");
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "composer-single.png") });
  console.log("shot composer-single");

  // multiline
  await page.locator("#composerInput textarea").fill(
    "My roommate ate the emergency lasagna.\nThey denied it with suspicious calcium confidence.\nThe container was found, empty, in their bag.\nI demand dramatic justice and a replacement."
  );
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, "composer-multiline.png") });
  console.log("shot composer-multiline");

  // attachments: upload image + pdf + wav + csv via hidden file input
  await page.locator("#composerInput textarea").fill("Use all of these as evidence.");
  const fileInput = page.locator('#composerInput input[type="file"]').first();
  await fileInput.setInputFiles([files.img, files.pdf, files.wav, files.csv]);
  await page.waitForTimeout(2500);
  await page.screenshot({ path: path.join(OUT, "composer-attachments.png") });
  console.log("shot composer-attachments");

  // mobile empty + attachments
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await enterCase(mp);
  await mp.screenshot({ path: path.join(OUT, "composer-mobile-empty.png") });
  console.log("shot composer-mobile-empty");
  await mp.locator("#composerInput textarea").fill("Cat knocked the coffee over.");
  await mp.locator('#composerInput input[type="file"]').first().setInputFiles([files.img, files.wav]);
  await mp.waitForTimeout(2200);
  await mp.screenshot({ path: path.join(OUT, "composer-mobile-attachments.png") });
  console.log("shot composer-mobile-attachments");

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
