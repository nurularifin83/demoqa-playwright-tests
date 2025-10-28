import BasePage from "../BasePage.js";

export default class RadioButtonPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnRadioButtonMenu() {
    const selector = "//li[@id='item-2']//span[text()='Radio Button']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async clickOnImpressiveRadio() {
    const selector = "//label[text()='Impressive']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnYesRadio() {
    const selector = "//label[text()='Yes']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async verifyImpressiveText(expectedText) {
    try {
      const selector = "//span[text()='Impressive']";
      await this.waitForElement(selector, "visible");

      const text = await this.page.textContent(selector, expectedText);
      return text.includes(expectedText);
    } catch {
      return false;
    }
  }

  async verifyYesText(expectedText) {
    try {
      const selector = "//span[text()='Yes']";
      await this.waitForElement(selector, "visible");

      const text = await this.page.textContent(selector, expectedText);
      return text.includes(expectedText);
    } catch {
      return false;
    }
  }
}
