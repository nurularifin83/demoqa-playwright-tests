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
    // Use 'domcontentloaded' instead of 'load' to prevent long hangs in Jenkins
    await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });

    // Wait extra for network to settle — but don't block forever
    try {
      await this.page.waitForLoadState("networkidle", { timeout: 10000 });
    } catch {
      console.warn("⚠️ Network idle not reached — continuing anyway");
    }

    // Remove banners, iframes, or ads that block clicks
    await this.page.evaluate(() => {
      const selectors = [
        "#fixedban",
        ".Advertisement",
        "iframe",
        "#adplus-anchor",
        "#google_ads_iframe_",
        ".modal-backdrop",
        ".loading",
        ".spinner",
      ];
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      });
    });

    // Verify the page body is visible (not blank)
    const bodyVisible = await this.page.locator("body").isVisible();
    if (!bodyVisible) throw new Error("❌ Page body not visible after load");

    // Try to wait for one of the main cards (skip if not visible)
    try {
      const mainCard = this.page.locator(".card.mt-4.top-card").first();
      await mainCard.waitFor({ state: "visible", timeout: 15000 });
    } catch {
      console.warn("⚠️ Main card not visible — continuing");
    }
  }
}
