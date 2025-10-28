import { test, expect } from "@playwright/test";
import TextBoxPage from "../../../pages/elements/TextBoxPage.js";
import HomePage from "../../../pages/HomePage.js";
import { generateRandomEmail } from "../../../utils/helper.js";

test.describe("DEMOQA Text Box Module", () => {
  let textBoxPage, homePage;
  const email = generateRandomEmail();

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await textBoxPage.clickOnTextBoxMenu();
  });

  test("@regression Verify add valid data", async () => {
    await textBoxPage.enterTextBox(
      "Nurul Arifin",
      email,
      "Jl. Persada I No 27",
      "Ajee Pagar Air"
    );
    await textBoxPage.clickOnSubmit();
    const isCorrect = await textBoxPage.verifyDisplayName("Nurul Arifin");
    expect(isCorrect).toBeTruthy;
  });

  test("@regression Verify input with invalid format email", async () => {
    await textBoxPage.enterTextBox(
      "Nurul Arifin",
      "nurularifingmail.com",
      "Jl. Persada I No 27",
      "Ajee Pagar Air"
    );
    await textBoxPage.clickOnSubmit();
    const isErrorVisible = await textBoxPage.verifyErrorOnEmail();
    expect(isErrorVisible).toBeTruthy;
  });

  test("@regression Verify empty textfield", async () => {
    await textBoxPage.enterTextBox("", "", "", "");
    await textBoxPage.clickOnSubmit();
    const isCorrect = await textBoxPage.verifyNoOutput();
    expect(isCorrect).toBeTruthy;
  });
});
