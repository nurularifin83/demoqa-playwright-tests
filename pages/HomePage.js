import BasePage from "./BasePage.js";

export default class HomePage extends BasePage {
  constructor(page) {
    super(page); // 👈 this gives HomePage access to BasePage methods
  }

  async navigateToElements(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.ensurePageReady();
      await this.safeClick("xpath=//h5[text()='Elements']");
    } else {
      await this.safeGoto("/elements");
    }
  }

  async navigateToForms(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.ensurePageReady();
      await this.safeClick("xpath=//h5[text()='Forms']");
    } else {
      await this.safeGoto("/forms");
    }
  }

  async navigateToAlertsFrameWindows(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.ensurePageReady();
      await this.safeClick("xpath=//h5[text()='Alerts, Frame & Windows']");
    } else {
      await this.safeGoto("/alertsWindows");
    }
  }

  /**
   * 🧩 Utility: make sure homepage is stable and ads removed before clicking
   */
  async ensurePageReady() {
    // Wait for the page to start loading
    await this.page.waitForLoadState("domcontentloaded");

    // Optional small delay for UI animations
    await this.page.waitForTimeout(1000);

    // Wait for at least one main card or section to be visible
    const mainCard = this.page.locator(".card.mt-4.top-card").first();
    await mainCard.waitFor({ state: "visible", timeout: 10000 });

    // Remove annoying ads or banners if present
    await this.page.evaluate(() => {
      document
        .querySelectorAll("#fixedban, iframe, .advertisement")
        .forEach((el) => el.remove());
    });
  }
}
