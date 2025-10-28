import { test, expect } from "@playwright/test";
import LinksPage from "../../../pages/elements/LinksPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Links Module", () => {
  let linksPage, homePage;

  test.beforeEach(({ page }) => {
    linksPage = new LinksPage(page);
    homePage = new HomePage(page);
  });

  test("@smoke Verify open the page and click on the link", async ({
    page,
    context,
  }) => {
    await homePage.navigateToElements();
    await linksPage.clickOnLinkMenu();
    await linksPage.clickOnHomeLink();

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("No Content");
    await linksPage.closeNewTabs();
  });
});
