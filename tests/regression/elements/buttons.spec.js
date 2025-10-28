import { test, expect } from "@playwright/test";
import ButtonsPage from "../../../pages/elements/ButtonsPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Button Module", () => {
  let buttons, homePage;

  test.beforeEach(async ({ page }) => {
    buttons = new ButtonsPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await buttons.clickOnButtonsMenu();
  });

  test("@regression Verify click me button is working", async ({ page }) => {
    await buttons.clickOnClickMeButton();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("You have done a dynamic click");
  });

  test("@regression Verify Double Click Me button is working", async () => {
    await buttons.clickOnDoubleClickMeButton();
    await buttons.clickOnDoubleClickMeButton();
  });

  test("@regression Verify Right Click Me button is working", async ({
    page,
  }) => {
    await buttons.clickOnRightClickMeButton();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("You have done a right click");
  });

  test.afterEach(async ({ context }) => {
    for (const page of context.pages()) {
      if (!page.isClosed) await page.close().catch(() => {});
    }
  });
});
