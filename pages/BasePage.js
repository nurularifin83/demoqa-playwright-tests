export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  // ------------------------------
  // 🪵 Logger system
  // ------------------------------
  log(message, type = "info") {
    const timestamp = new Date().toISOString();
    const prefix =
      type === "warn"
        ? "⚠️"
        : type === "error"
        ? "❌"
        : type === "success"
        ? "✅"
        : "ℹ️";

    const finalMessage = `${prefix} [${timestamp}] ${message}`;
    console.log(finalMessage);
  }

  // ------------------------------
  // 🧩 Wait for element helper
  // ------------------------------
  async waitForElement(selector, state, timeout = 10000) {
    try {
      await this.page.waitForSelector(selector, { state, timeout });
      return true;
    } catch {
      this.log(`Element not found: ${selector} (${state})`, "warn");
      await this.captureErrorScreenshot("waitForElement_failed");
      return false;
    }
  }

  async safeGoto(url, waitUntil = "domcontentloaded") {
    try {
      if (this.page.isClosed()) {
        console.warn(
          "⚠️ Page was closed, reopening a new one via browser context..."
        );
        // Attempt to reopen using the same browser context
        const context = this.page.context();
        this.page = await context.newPage();
      }

      await this.page.goto(url, {
        waitUntil,
        timeout: 60000,
      });
    } catch (error) {
      console.error(`❌ Failed to navigate to ${url}: ${error.message}`);
      throw error;
    }
  }

  // ------------------------------
  // 🖱️ Safe Click (improved for CI/CD)
  // ------------------------------
  async safeClick(selector) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (this.page.isClosed()) {
          console.warn("⚠️ Page closed before click, reopening...");
          const context = this.page.context();
          this.page = await context.newPage();
          await this.page.goto("/", { waitUntil: "domcontentloaded" });
        }

        // Wait for page to be ready and ads removed
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(800); // small buffer for animations

        // 🧹 Remove ad overlays (DemoQA issue)
        await this.page.evaluate(() => {
          const ads = ["#fixedban", "iframe", ".advertisement"];
          ads.forEach((sel) => {
            const el = document.querySelector(sel);
            if (el) el.style.display = "none";
          });
        });

        // Wait until element is visible and clickable
        await this.page.waitForSelector(selector, {
          state: "visible",
          timeout: 20000, // ⏳ increased for CI stability
        });

        await this.page
          .waitForSelector(".modal.show", { state: "hidden", timeout: 2000 })
          .catch(() => {});

        await this.page.click(selector);
        this.log(`✅ Clicked: ${selector}`);
        return; // ✅ success
      } catch (error) {
        const msg = error.message || "";
        if (
          msg.includes("Target page") ||
          msg.includes("has been closed") ||
          msg.includes("intercepts pointer events") ||
          msg.includes("Timeout")
        ) {
          console.warn(`⚠️ Retry click attempt ${attempt} due to: ${msg}`);
          await this.page.waitForTimeout(1000);
        } else {
          throw error;
        }
      }
    }

    throw new Error(`❌ Failed to click on ${selector} after 3 retries.`);
  }

  async safeFill(selector, text) {
    if (this.page.isClosed()) {
      console.warn("⚠️ Page closed before fill, reopening...");
      const context = this.page.context();
      this.page = await context.newPage();
    }

    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: 15000,
    });
    await this.page.fill(selector, text);
  }
}
