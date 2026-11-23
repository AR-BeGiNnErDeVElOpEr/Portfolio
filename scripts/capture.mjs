import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const shots = [
  ["carhive", "https://carhive-bf048.web.app/"],
  ["omnifood", "https://omnifood-by-ammar.netlify.app/"],
  ["swipe", "https://swipebyar.netlify.app/"],
];

for (const [name, url] of shots) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(name === "carhive" ? 10000 : 2500);
  await page.screenshot({ path: `public/images/projects/${name}.png`, fullPage: false });
  await page.close();
}

await browser.close();
