import { test, expect } from "@playwright/test";
import BrowserWindowsPage from "../../../pages/AFW/BrowserWindowsPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Browser Windows Module", () => {
  let browserWindowsPage, homePage;

  test.beforeEach(async ({ page }) => {
    browserWindowsPage = new BrowserWindowsPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToAlertsFrameWindows();
    await browserWindowsPage.clickOnBrowserWindowsMenu();
  });

  test("@regression Verify click on New Tab button successfully", async () => {
    const newTab = await browserWindowsPage.switchToNewTab();

    await newTab.waitForLoadState("load", { timeout: 15000 });
    await expect(newTab).toHaveURL("https://demoqa.com/sample");

    await newTab.close();
  });

  test("@regression Verify click on New Window button successfully", async () => {
    const newWindow = await browserWindowsPage.switchToNewWindow();
    await expect(newWindow).toHaveURL("https://demoqa.com/sample");

    await newWindow.close();
  });

  test("@regression Verify click on new window message button successfully", async () => {
    const isClicked = await browserWindowsPage.clickOnNewWindowMessage();
    expect(isClicked).toBeTruthy;
  });
});
