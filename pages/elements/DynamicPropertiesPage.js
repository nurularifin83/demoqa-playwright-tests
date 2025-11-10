import { expect } from "@playwright/test";
import BasePage from "../BasePage.js";

export default class DynamicPropertiesPage extends BasePage {
  constructor(page) {
    super(page);

    // ⬇️ Define locators here — this is where "enableAfterButton" comes from
    this.enableAfterButton = page.locator("#enableAfter"); // first button
    this.colorChangeButton = page.locator("#colorChange"); // second button
    this.visibleAfterButton = page.locator("#visibleAfter"); // third button
  }

  async clickOnDynamicProperties() {
    await this.safeClick("(//li[@id='item-8'])[1]");
  }

  async waitForEnableAfterButton() {
    await expect(this.enableAfterButton).toBeEnabled({ timeout: 6000 });
  }

  async isEnableAfterButtonDisabled() {
    return await this.enableAfterButton.isDisabled();
  }

  async getColorChangeButtonColor() {
    return await this.colorChangeButton.evaluate(
      (el) => getComputedStyle(el).color
    );
  }

  async waitForVisibleAfterButton() {
    await this.page.waitForSelector("#visibleAfter", {
      state: "visible",
      timeout: 6000,
    });
  }
}
