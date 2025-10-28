import { test, expect } from "@playwright/test";
import RadioButtonPage from "../../../pages/elements/RadioButtonPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Radio Button Module", () => {
  let radioButton, homePage;

  test.beforeEach(({ page }) => {
    radioButton = new RadioButtonPage(page);
    homePage = new HomePage(page);
  });

  test("@smoke Verify open the page and selected radio button successfully", async () => {
    await homePage.navigateToElements();
    await radioButton.clickOnRadioButtonMenu();
    await radioButton.clickOnImpressiveRadio();
    const isCorrect = await radioButton.verifyImpressiveText("Impressive");
    expect(isCorrect).toBeTruthy();
  });
});
