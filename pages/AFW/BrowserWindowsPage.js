import BasePage from "../BasePage.js";

export default class BrowserWindowsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnBrowserWindowsMenu() {
    const selector = "//li[@id='item-0']//span[text()='Browser Windows']";
    await this.waitForElement(selector, "visible");
    await this.page.click(selector);
  }

  async clickOnNewWindowMessage() {
    try {
      const selector = "xpath=//button[@id='messageWindowButton']";
      await this.waitForElement(selector, "attached");
      await this.page.click(selector);
      return true;
    } catch {
      this.log("❌ Failed to click New Window Message:", "error");
      return false;
    }
  }

  async switchToNewWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.click("xpath=//button[@id='windowButton']"),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async switchToNewTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.locator("//button[@id='tabButton']").click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }
}
