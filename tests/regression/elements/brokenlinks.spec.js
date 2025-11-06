import { test, expect } from "@playwright/test";
import BrokenLinkPage from "../../../pages/elements/BrokenLinkPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Broken Links Module", () => {
  let brokenLinkPage, homePage;

  test.beforeEach(async ({ page }) => {
    brokenLinkPage = new BrokenLinkPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await brokenLinkPage.clickOnBrokenLinksMenu();
  });

  test("@regression Verify valid image loads correctly", async () => {
    const validSelector = "(//img[@src='/images/Toolsqa.jpg'])[2]";
    const isLoaded = await brokenLinkPage.isImageLoaded(validSelector);
    expect(isLoaded).toBeTruthy(); // ✅ image should display fine
  });

  test("@regression Verify broken image fails to load", async () => {
    const invalidSelector = "//img[@src='/images/Toolsqa_1.jpg']";
    const isLoaded = await brokenLinkPage.isImageLoaded(invalidSelector);
    expect(isLoaded).toBeFalsy(); // ❌ image should NOT display
  });

  test("@regression Verify valid link", async () => {
    await brokenLinkPage.clickOnValidLink();
    const expectedUrl = "https://demoqa.com/";
    const isCorrect = await brokenLinkPage.verifyLinkNavigation(expectedUrl);
    expect(isCorrect).toBeTruthy();
  });

  test("@regression Verify broken link", async () => {
    await brokenLinkPage.clickOnBrokenLink();
    const expectedUrl = "http://the-internet.herokuapp.com/status_codes/500";
    const isCorrect = await brokenLinkPage.verifyLinkNavigation(expectedUrl);
    expect(isCorrect).toBeTruthy();
  });
});
