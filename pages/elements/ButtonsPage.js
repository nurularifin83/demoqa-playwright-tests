import BasePage from "../BasePage.js";

export default class ButtonsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnButtonsMenu() {
    const selector = "//li[@id='item-4']//span[text()='Buttons']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async clickOnClickMeButton() {
    const selector = "//button[text()='Click Me']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async clickOnRightClickMeButton() {
    const selector = "//button[@id='rightClickBtn']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector, {
      button: "right",
    });
  }

  async clickOnDoubleClickMeButton() {
    const selector = "//button[@id='doubleClickBtn']";
    await this.waitForElement(selector, "attached");
    await this.page.dblclick(selector);
  }
}
