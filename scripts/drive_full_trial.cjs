// Captures the Full Trial power-user phases (Witness, cross-examination, Twist)
// and the Case File on the judgement card. Run the app first (port 7861, Full
// Trial works on any backend; fake is deterministic), then:
//   node scripts/drive_full_trial.cjs
const PW = "C:/Users/jan.jakubcik/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright";
const { chromium } = require(PW);
const path = require("path");
const fs = require("fs");

const BASE = "http://127.0.0.1:7861/?__theme=light";
const OUT = path.resolve("tests/screenshots/full-trial");
fs.mkdirSync(OUT, { recursive: true });

const COMPLAINT = "My cat unplugged the router during my big work meeting and then looked extremely smug about it.";
const EVIDENCE = "There were fresh paw prints on the power strip and a suspicious lack of remorse.";

async function shoot(page, name) {
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("shot", name);
}

// Click a reply chip by its data-tc-action id and wait for the server turn.
async function chip(page, id, waitFor) {
  await page.waitForSelector(`#surface .reply-chip[data-tc-action="${id}"]`, { timeout: 10000 });
  await page.click(`#surface .reply-chip[data-tc-action="${id}"]`);
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 15000 });
  await page.waitForTimeout(900);
}

async function send(page, text) {
  await page.fill("#composerInput textarea", text);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
}

async function run(width, height, tag) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  await page.click("#beginFullBtn");
  await page.waitForSelector(".message-shell", { timeout: 8000 });

  // case -> file the complaint, then focus the evidence scene (stays in glass)
  await send(page, COMPLAINT);
  await chip(page, "submit_evidence");
  await shoot(page, `${tag}-1-evidence`);

  // evidence -> submit an exhibit, then call the witness (Full Trial move)
  await send(page, EVIDENCE);
  await chip(page, "call_witness");
  await shoot(page, `${tag}-2-witness`);

  // witness -> cross-examine on the court's initiative
  await chip(page, "cross_examine");
  await shoot(page, `${tag}-3-cross-examine`);

  // witness -> spring the one-shot twist
  await chip(page, "add_twist");
  await shoot(page, `${tag}-4-twist`);

  // twist -> ask the judge to rule; the judgement card carries the Case File strip
  await chip(page, "ask_judge", ".ruling-surface");
  await page.waitForTimeout(1100);
  await shoot(page, `${tag}-5-judgement`);

  // capture whether the Case File strip rendered + the verdict-title box size
  const info = await page.evaluate(() => {
    const cf = document.querySelector(".case-file");
    const title = document.querySelector(".verdict-title");
    const card = document.querySelector(".ruling-surface");
    const rect = (el) => (el ? { h: Math.round(el.getBoundingClientRect().height) } : null);
    return {
      caseFile: !!cf,
      caseFileLegs: cf ? cf.querySelectorAll(".meter").length : 0,
      verdictTitle: title ? title.textContent.trim() : null,
      titleH: rect(title),
      cardH: rect(card),
    };
  });
  console.log(tag, "judgement", JSON.stringify(info));

  await browser.close();
}

(async () => {
  await run(1536, 864, "desktop");
  await run(390, 844, "mobile");
})();
