import BasePage from "../BasePage.js";

export default class CheckBoxPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnCheckBoxMenu() {
    const selector = "//li[@id='item-1']//span[text()='Check Box']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async clickOnCheckBox() {
    const selector = "span.rct-checkbox";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async verifyDisplayResult(expectedText) {
    try {
      const selector = "//div[@id='result']";
      await this.waitForElement(selector, "visible");

      const text = await this.page.textContent(selector);

      return text.includes(expectedText);
    } catch {
      return false;
    }
  }

  async isCheckedMarkNotDisplayed() {
    const isVisible = await this.page
      .isVisible("//div[@id='result']")
      .catch(() => false);
    return !isVisible;
  }

  async maximize() {
    const selector = "//button[@class='rct-option rct-option-expand-all']";
    await this.waitForElement(selector, "attached");
    await this.page.click(`xpath=${selector}`);
  }

  async isExcelFileVisible(expectedText) {
    try {
      const selector = "//span[text()='Excel File.doc']";
      await this.waitForElement(selector, "visible");
      const text = await this.page.textContent(selector);

      return text.includes(expectedText);
    } catch {
      return false;
    }
  }

  async collapse() {
    const selector = "//button[@class='rct-option rct-option-collapse-all']";
    await this.waitForElement(selector, "attached");

    await this.page.click(selector);
  }

  async isExcelFileNotVisible() {
    return await this.page.isVisible(
      "//li[@class='rct-node rct-node-parent rct-node-collapsed']"
    );
  }
}

module.exports = CheckBoxPage;
