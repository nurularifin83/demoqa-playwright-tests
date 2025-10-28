import BasePage from "../BasePage.js";

export default class WebTablesPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnWebTablesMenu() {
    const selector = '//li[@id="item-3"]//span[text()="Web Tables"]';
    await this.page.waitForSelector(selector, { state: "visible" });
    await this.page.click(selector);
  }

  async clickOnAddButton() {
    const selector = "#addNewRecordButton";
    await this.page.waitForSelector(selector, { state: "attached" });
    await this.page.click(selector);
  }

  async entertextField(firstName, lastName, email, age, salary, department) {
    await this.safeFill("#firstName", firstName);
    await this.safeFill("#lastName", lastName);
    await this.safeFill("#userEmail", email);
    await this.safeFill("#age", age);
    await this.safeFill("#salary", salary);
    await this.safeFill("#department", department);
  }

  async clickOnSubmitButton() {
    const selector = "#submit";
    await this.page.waitForSelector(selector, { state: "attached" });
    await this.page.click(selector);
  }

  async isInputEmpty(selector) {
    const value = await this.page.locator(selector).inputValue();
    return value === "";
  }

  async isEmailValueInvalid() {
    const emailValue = await this.page.getAttribute(
      "//input[@id='userEmail']",
      "value"
    );
    return emailValue === "nurularifingmail.com";
  }

  async isAgeAndSalaryInvalid() {
    const ageInvalidValue = await this.page.getAttribute(
      "//input[@id='age']",
      "value"
    );

    const salaryInvalidValue = await this.page.getAttribute(
      "//input[@id='salary']",
      "value"
    );
    return ageInvalidValue === "ab" && salaryInvalidValue === "def";
  }

  async clickOnEditButtonByRow() {
    const selector = "xpath=//span[@id='edit-record-2']";
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
}
