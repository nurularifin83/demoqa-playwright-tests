import BasePage from "../BasePage.js";

export default class PracticeFormPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickOnPracticeFormMenu() {
    const selector = "//li[@id='item-0']//span[text()='Practice Form']";
    await this.waitForElement(selector, "visible");
    await this.safeClick(selector);
  }

  async enterPracticeForm(firstName, lastName, email, mobile, currentAddress) {
    // Autocomplete field for Subjects
    await this.inputSubjects("Arts");
    await this.safeFill("xpath=//input[@id='firstName']", firstName);
    await this.safeFill("xpath=//input[@id='lastName']", lastName);
    await this.safeFill("xpath=//input[@id='userEmail']", email);
    await this.safeClick(
      "xpath=//label[@class='custom-control-label' and text()='Female']"
    );
    await this.safeFill("xpath=//input[@id='userNumber']", mobile);
    await this.selectDateOfBirth("08 Oct 1993");
    await this.selectHobby("1");
    await this.selectHobby("2");
    await this.selectHobby("3");
    await this.uploadPicture();
    await this.safeFill(
      "xpath=//textarea[@id='currentAddress']",
      currentAddress
    );
    await this.selectState("Haryana");
    await this.selectCity("Panipat");
  }

  async selectHobby(hobbyName) {
    const selector = `//label[@for='hobbies-checkbox-${hobbyName}']`;
    await this.waitForElement(selector, "attached");
    await this.safeClick(selector);
  }

  async inputSubjects(subject) {
    await this.safeFill("xpath=//input[@id='subjectsInput']", subject);
    await this.page.keyboard.press("Enter");
  }

  async selectState(stateName) {
    await this.safeClick("xpath=//div[@id='state']");
    await this.safeFill("#react-select-3-input", stateName);
    await this.page.keyboard.press("Enter");
    await this.page.waitForSelector(
      `xpath=//div[contains(@class, 'singleValue') and text()='${stateName}']`
    );
  }

  async selectCity(cityName) {
    await this.safeClick("xpath=//div[@id='city']");
    await this.safeFill("#react-select-4-input", cityName);
    await this.page.keyboard.press("Enter");
    await this.page.waitForSelector(
      `xpath=//div[contains(@class, 'singleValue') and text()='${cityName}']`
    );
  }

  async selectDateOfBirth(dateValue) {
    const dateInput = this.page.locator("#dateOfBirthInput");
    await dateInput.click({ clickCount: 3 });
    await dateInput.fill(dateValue);
    await dateInput.press("Enter");
  }

  async uploadPicture() {
    // File located inside /resources folder
    await this.page.setInputFiles(
      "#uploadPicture",
      "tests/resources/profile-pic.png"
    );
  }

  async clickOnSubmitButton() {
    const selector = "//button[@id='submit']";
    await this.waitForElement(selector, "attached");
    await this.safeClick(selector);
  }

  async clickOnCloseFormButton() {
    const closeBtn = this.page.locator("//button[@id='closeLargeModal']");
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      this.log("⚠️  Modal already closed, skipping click", "warn");
    }
  }

  async verifyDisplayFormTitle(expectedText) {
    const text = await this.page.textContent(
      "xpath=//div[@class='modal-title h4']",
      expectedText
    );
    return text.includes(expectedText);
  }

  async verifyEmptyFields() {
    // Get input values
    const firstName = await this.page.inputValue("#firstName");
    const lastName = await this.page.inputValue("#lastName");
    const phone = await this.page.inputValue("#userNumber");

    // Check if inputs are empty
    const isFirstNameEmpty = firstName.trim() === "";
    const isLastNameEmpty = lastName.trim() === "";
    const isPhoneEmpty = phone.trim() === "";

    // Check radio buttons (gender)
    const isMaleSelected = await this.page.isChecked("#gender-radio-1");
    const isFemaleSelected = await this.page.isChecked("#gender-radio-2");
    const isOtherSelected = await this.page.isChecked("#gender-radio-3");

    // Return true if all text fields empty and no radio selected
    return (
      isFirstNameEmpty &&
      isLastNameEmpty &&
      isPhoneEmpty &&
      !isMaleSelected &&
      !isFemaleSelected &&
      !isOtherSelected
    );
  }

  async isEmailInvalid() {
    return await this.page.$eval("#userEmail:invalid", (el) => !!el);
  }

  async isMobileNumberInvalid() {
    // Check if the input field is invalid using the ":invalid" pseudo-class
    return await this.page.$eval("#userNumber:invalid", (el) => !!el);
  }
}
