import { test, expect } from "@playwright/test";
import TextBoxPage from "../../../pages/elements/TextBoxPage.js";
import HomePage from "../../../pages/HomePage.js";
import { generateRandomEmail } from "../../../utils/helper.js";

test.describe("DEMOQA Text Box Module", () => {
  let textBoxPage, homePage;
  const email = generateRandomEmail();

  test.beforeEach(({ page }) => {
    textBoxPage = new TextBoxPage(page);
    homePage = new HomePage(page);
  });

  test("@sanity Verify add new valid data successfully", async () => {
    await homePage.navigateToElements();
    await textBoxPage.clickOnTextBoxMenu();
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
});
