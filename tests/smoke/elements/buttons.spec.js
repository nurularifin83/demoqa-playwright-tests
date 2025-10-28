import { test, expect } from "@playwright/test";
import ButtonsPage from "../../../pages/elements/ButtonsPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Buttons Module", () => {
  let buttons, homePage;

  test.beforeEach(({ page }) => {
    buttons = new ButtonsPage(page);
    homePage = new HomePage(page);
  });

  test("@smoke Verify open the page and click on the button", async ({
    page,
  }) => {
    await homePage.navigateToElements();
    await buttons.clickOnButtonsMenu();
    await buttons.clickOnClickMeButton();

    const bodyText = await page.locator("body").innerText();
    await expect(bodyText).toContain("You have done a dynamic click");
  });
});
