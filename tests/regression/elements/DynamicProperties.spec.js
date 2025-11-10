import { test, expect } from "@playwright/test";
import DynamicPropertiesPage from "../../../pages/elements/DynamicPropertiesPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Dynamic Properties Module", () => {
  let dynamicPropertiesPage, homePage;

  test.beforeEach(async ({ page }) => {
    dynamicPropertiesPage = new DynamicPropertiesPage(page);
    homePage = new HomePage(page);
  });

  test("@regression Verify button behaviors", async () => {
    await homePage.navigateToElements();
    await dynamicPropertiesPage.clickOnDynamicProperties();

    const isDisabled =
      await dynamicPropertiesPage.isEnableAfterButtonDisabled();
    expect(isDisabled).toBeTruthy();

    await dynamicPropertiesPage.waitForEnableAfterButton();

    // 2️⃣ Verify Color Change Button
    const initialColor =
      await dynamicPropertiesPage.getColorChangeButtonColor();
    await dynamicPropertiesPage.page.waitForTimeout(5000); // wait for color to change
    const changedColor =
      await dynamicPropertiesPage.getColorChangeButtonColor();
    expect(changedColor).not.toBe(initialColor);

    // 3️⃣ Verify Visible After Button
    await dynamicPropertiesPage.waitForVisibleAfterButton();
    expect(
      await dynamicPropertiesPage.visibleAfterButton.isVisible()
    ).toBeTruthy();
  });
});
