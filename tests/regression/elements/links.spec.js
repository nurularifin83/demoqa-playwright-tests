import { test, expect } from "@playwright/test";
import LinksPage from "../../../pages/elements/LinksPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Links Module", () => {
  let linksPage, homePage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await linksPage.clickOnLinkMenu();
  });

  test("@regression Verify click on home link succeffully", async ({
    page,
  }) => {
    await linksPage.clickOnHomeLink();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("Elements");
    await linksPage.closeNewTabs();
  });

  test("@regression Verify click on home41tpo link succeffully", async ({
    page,
  }) => {
    await linksPage.clickOnHome41TPoLink();
    const bodyText = await page.locator("body").innerText({ timeout: 15000 });
    expect(bodyText).toContain("Elements");
    await linksPage.closeNewTabs();
  });

  test("@regression Verify click on created link succeffully", async () => {
    await linksPage.clickOnCreatedLink();
    const isDisplayed = await linksPage.isCratedLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test("@regression Verify click on no content link succeffully", async () => {
    await linksPage.clickOnNoContentLink();
    const isDisplayed = await linksPage.isNoContentLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test("@regression Verify click on moved link succeffully", async () => {
    await linksPage.clickOnMovedLink();
    const isDisplayed = await linksPage.isMovedLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test("@regression Verify click on bad request link succeffully", async () => {
    await linksPage.clickOnBadRequestLink();
    const isDisplayed = await linksPage.isBadRequestLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test("@regression Verify click on Forbidden link succeffully", async () => {
    await linksPage.clickOnForbiddenLink();
    const isDisplayed = await linksPage.isForbiddenLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test("@regression Verify click on Not Found link succeffully", async () => {
    await linksPage.clickOnNotFoundLink();
    const isDisplayed = await linksPage.isNotFoundLinkTextVisible();
    expect(isDisplayed).toBeTruthy;
  });

  test.afterEach(async ({ context }) => {
    for (const page of context.pages()) {
      if (!page.isClosed) await page.close().catch(() => {});
    }
  });
});
