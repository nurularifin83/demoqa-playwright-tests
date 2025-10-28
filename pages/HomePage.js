import BasePage from "./BasePage.js";

export default class HomePage extends BasePage {
  constructor(page) {
    super(page); // 👈 this gives HomePage access to BasePage methods
  }

  async navigateToElements(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.safeClick("xpath=//h5[text()='Elements']");
    } else {
      await this.safeGoto("/elements");
    }
  }

  async navigateToForms(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.safeClick("xpath=//h5[text()='Forms']");
    } else {
      await this.safeGoto("/forms");
    }
  }

  async navigateToAlertsFrameWindows(force = false) {
    if (!force) {
      await this.safeGoto("/");
      await this.safeClick("xpath=//h5[text()='Alerts, Frame & Windows']");
    } else {
      await this.safeGoto("/alertsWindows");
    }
  }
}
