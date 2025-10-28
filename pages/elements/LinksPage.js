import BasePage from "../BasePage.js";

export default class LinksPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Action Methods
  async clickOnLinkMenu() {
    const selector = "//li[@id='item-5']//span[text()='Links']";
    await this.waitForElement(selector, "visible");

    await this.page.click(selector);
  }

  async clickOnHomeLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.locator("#simpleLink").click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async clickOnHome41TPoLink() {
    const selector = "#dynamicLink";
    const context = this.page.context();
    await this.waitForElement(selector, "visible");

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      this.page.locator(selector).click({ timeout: 15000 }),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async clickOnCreatedLink() {
    const selector = "//a[@id='created']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnNoContentLink() {
    const selector = "//a[@id='no-content']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnMovedLink() {
    const selector = "//a[@id='moved']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnBadRequestLink() {
    const selector = "//a[@id='bad-request']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnForbiddenLink() {
    const selector = "//a[@id='forbidden']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  async clickOnNotFoundLink() {
    const selector = "//a[@id='invalid-url']";
    await this.waitForElement(selector, "attached");
    await this.page.click(selector);
  }

  // Verification Methods
  // ✅ Replace textContent() with locator.textContent() wrapped in try-catch
  // Prevents crash when page reloads or DOM detached
  async getResponseText() {
    try {
      const selector = "//p[@id='linkResponse']";
      await this.page.waitForSelector(selector, {
        timeout: 8000,
      });
      return await this.page.locator(selector).textContent();
    } catch {
      return "";
    }
  }

  async isCratedLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes(
      "Link has responded with staus 201 and status text Created"
    );
  }

  async isNoContentLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes("No Content");
  }

  async isMovedLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes("Moved Permanently");
  }

  async isBadRequestLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes("Bad Request");
  }

  async isForbiddenLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes("Forbidden");
  }

  async isNotFoundLinkTextVisible() {
    const responseText = await this.getResponseText();
    return responseText.includes("Not Found");
  }

  async closeNewTabs() {
    const context = this.page.context();
    const pages = context.pages();

    for (let i = 1; i < pages.length; i++) {
      if (!pages[i].isClosed()) {
        await pages[i].close().catch(() => {});
      }
    }
  }
}
