import { test, expect } from "@playwright/test";
import BrowserWindowsPage from "../../../pages/AFW/BrowserWindowsPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Browser Windows Module", () => {
  let browserWindowsPage, homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    browserWindowsPage = new BrowserWindowsPage(page);

    await homePage.navigateToAlertsFrameWindows();
    await browserWindowsPage.clickOnBrowserWindowsMenu();
  });

  test("@smoke Verify open the page and open the new tab", async ({
    context,
  }) => {
    const [newTab] = await Promise.all([
      context.waitForEvent("page"),
      browserWindowsPage.switchToNewTab(),
    ]);

    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL("https://demoqa.com/sample");

    await newTab.close();
  });
});
