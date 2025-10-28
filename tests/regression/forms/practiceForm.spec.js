import { test, expect } from "@playwright/test";
import PracticeFormPage from "../../../pages/forms/PracticeFormPage.js";
import HomePage from "../../../pages/HomePage.js";
import {
  generateRandomEmail,
  generateRandomPhoneNumber,
} from "../../../utils/helper.js";

test.describe("DEMOQA Practice Form Module", () => {
  let practiceFormPage, homePage;
  const email = generateRandomEmail();
  const mobile = generateRandomPhoneNumber();

  test.beforeEach(async ({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
    homePage = new HomePage(page);
    await homePage.navigateToForms();
    await practiceFormPage.clickOnPracticeFormMenu();
  });

  test("@regression Verify add valid data successfully", async () => {
    await practiceFormPage.enterPracticeForm(
      "Nurul",
      "Arifin",
      email,
      mobile,
      "Jl. Merdeka No. 123, Jakarta"
    );
    await practiceFormPage.clickOnSubmitButton();

    const isCorrect = await practiceFormPage.verifyDisplayFormTitle(
      "Thanks for submitting the form"
    );
    expect(isCorrect).toBeTruthy;
    await practiceFormPage.clickOnCloseFormButton();
  });

  test("@regression Verify add new data with empty textfields", async () => {
    await practiceFormPage.clickOnSubmitButton();
    const result = await practiceFormPage.verifyEmptyFields();
    expect(result).toBeTruthy;
  });

  test("@regression Verify add new data with invalid email format", async () => {
    await practiceFormPage.enterPracticeForm(
      "Nurul",
      "Arifin",
      "nurularifingmail.com",
      mobile,
      "Jl. Merdeka No. 123, Jakarta"
    );
    await practiceFormPage.clickOnSubmitButton();
    const invalid = await practiceFormPage.isEmailInvalid();
    expect(invalid).toBeTruthy;
  });

  test("@regression Verify add new data with invalid phone number", async () => {
    await practiceFormPage.enterPracticeForm(
      "Nurul",
      "Arifin",
      email,
      "3209",
      "Jl. Merdeka No. 123, Jakarta"
    );
    await practiceFormPage.clickOnSubmitButton();
    const isInvalid = await practiceFormPage.isMobileNumberInvalid();
    expect(isInvalid).toBeTruthy;
  });
});
