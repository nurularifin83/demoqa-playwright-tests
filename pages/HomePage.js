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
    await this.page.waitForLoadState("load", { timeout: 30000 });

    // Remove banners or ads that may cover UI
    await this.page.evaluate(() => {
      const selectors = [
        "#fixedban",
        ".Advertisement",
        "iframe",
        "#adplus-anchor",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      });
    });

    // Try to wait for the main visible card, but skip if not found to avoid CI flakiness
    try {
      const mainCard = this.page.locator(".card.mt-4.top-card").first();
      await mainCard.waitFor({ state: "visible", timeout: 30000 });
    } catch (e) {
      console.warn(
        "⚠️ Warning: Main card not visible within timeout — continuing anyway."
      );
    }

    // Ensure no loading overlay is blocking clicks
    await this.page.evaluate(() => {
      const overlay = document.querySelector(
        ".modal-backdrop, .loading, .spinner"
      );
      if (overlay) overlay.remove();
    });
  }
}
