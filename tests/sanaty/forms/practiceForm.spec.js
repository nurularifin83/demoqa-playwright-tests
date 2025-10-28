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

  test.beforeEach(({ page }) => {
    practiceFormPage = new PracticeFormPage(page);
    homePage = new HomePage(page);
  });

  test("@sanity Verify add new valid data successfully", async () => {
    await homePage.navigateToForms();
    await practiceFormPage.clickOnPracticeFormMenu();
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
});
