import { test, expect } from "@playwright/test";
import CheckBoxPage from "../../../pages/elements/CheckBoxPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Check Box Module", () => {
  let checkBoxPage, homePage;

  test.beforeEach(({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    homePage = new HomePage(page);
  });

  test("@smoke Verify open the page and checked checkbox", async () => {
    await homePage.navigateToElements();
    await checkBoxPage.clickOnCheckBoxMenu();
    await checkBoxPage.clickOnCheckBox();
    const isCorrect = await checkBoxPage.verifyDisplayResult(
      "You have selected"
    );
    expect(isCorrect).toBeTruthy;
  });
});
