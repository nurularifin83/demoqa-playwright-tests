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
    // Wait for full network load
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000); // slight delay for UI animations

    // Remove annoying ads that can block clicks
    await this.page.evaluate(() => {
      const ads = ["#fixedban", "iframe", ".advertisement"];
      ads.forEach((sel) => {
        const el = document.querySelector(sel);
        if (el) el.style.display = "none";
      });
    });

    // Scroll the main content into view just in case
    const cards = this.page.locator(".card.mt-4.top-card");
    if (await cards.first().isVisible()) {
      await cards.first().scrollIntoViewIfNeeded();
    }
  }
}
