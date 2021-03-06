/* tslint:disable:no-submodule-imports */
import test from "ava";
import { Builder, By } from "selenium-webdriver";
// tslint:disable-next-line:no-var-requires
const chrome = require("selenium-webdriver/chrome");

import "chromedriver";

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;
let browser: any;

test.before(async () => {
  browser = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  browser.get("https://e2e-boilerplate.github.io/sandbox/");
});

test.after(async () => {
  browser.quit();
});

test("Should be on Sandbox", async (t) => {
  t.timeout(20000);
  const title = await browser.getTitle();
  const header = await browser.findElement(By.css("h1"));

  t.is(title, "Sandbox");
  t.is(await header.getText(), "Sandbox");
});
