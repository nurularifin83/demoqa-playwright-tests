import BasePage from "../BasePage.js";
import { request } from "@playwright/test";

export default class BrokenLinkPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnBrokenLinksMenu() {
    const selector = "(//li[@id='item-6'])[1]";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  // ✅ Check if image actually loads (not just status 200)
  async isImageLoaded(selector) {
    const image = this.page.locator(selector);
    await image.waitFor({ state: "visible" });
    const naturalWidth = await image.evaluate((img) => img.naturalWidth);
    return naturalWidth > 0;
  }

  async clickOnValidLink() {
    await this.safeClick("//a[text()='Click Here for Valid Link']");
  }

  async verifyLinkNavigation(expectedUrl) {
    // Wait for navigation to complete
    await this.page.waitForLoadState("load");
    const actualUrl = this.page.url();
    this.log(`Navigated to: ${actualUrl}`);
    return actualUrl === expectedUrl;
  }

  async clickOnBrokenLink() {
    await this.safeClick("//a[text()='Click Here for Broken Link']");
  }
}
