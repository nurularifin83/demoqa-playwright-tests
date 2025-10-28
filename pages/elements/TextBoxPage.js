import BasePage from "../BasePage.js";

export default class TextBoxPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnTextBoxMenu() {
    const selector = "//li[@id='item-0']//span[text()='Text Box']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async enterTextBox(name, email, currentAddress, permanentAddress) {
    await this.page.fill("xpath=//input[@id='userName']", name);
    await this.page.fill("xpath=//input[@id='userEmail']", email);
    await this.page.fill(
      "xpath=//textarea[@id='currentAddress']",
      currentAddress
    );
    await this.page.fill(
      "xpath=//textarea[@id='permanentAddress']",
      permanentAddress
    );
  }

  async clickOnSubmit() {
    const selector = "//button[@id='submit']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async verifyDisplayName(expectedText) {
    try {
      const selector = "//p[@id='name']";
      await this.waitForElement(selector, "visible");

      const text = await this.page.textContent(selector, expectedText);
      return text.includes(expectedText);
    } catch {
      return false;
    }
  }

  async verifyNoOutput() {
    const selector = "//div[@id='output']";
    await this.waitForElement(selector, "attached");
    const text = await this.page.textContent(selector);
    return !text || text.trim() === "";
  }

  async verifyErrorOnEmail() {
    const selector = "//input[@class='mr-sm-2 field-error form-control']";
    await this.waitForElement(selector, "visible");
    return await this.page.isVisible(selector);
  }
}
