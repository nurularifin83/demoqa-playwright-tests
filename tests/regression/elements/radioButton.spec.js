import { test, expect } from "@playwright/test";
import RadioButtonPage from "../../../pages/elements/RadioButtonPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Radio Button Module", () => {
  let radioButton, homePage;

  test.beforeEach(async ({ page }) => {
    radioButton = new RadioButtonPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await radioButton.clickOnRadioButtonMenu();
  });

  test("@regression Verify selected Impressive button", async () => {
    await radioButton.clickOnImpressiveRadio();
    const isCorrect = await radioButton.verifyImpressiveText("Impressive");
    expect(isCorrect).toBeTruthy;
  });

  test("@regression Verify that Impressive radio button is not selected", async () => {
    await radioButton.clickOnImpressiveRadio();
    await radioButton.clickOnYesRadio();
    const isCorrect = await radioButton.verifyYesText("Yes");
    expect(isCorrect).toBeTruthy;
  });
});
