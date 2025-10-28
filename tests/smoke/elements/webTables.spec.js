import { test, expect } from "@playwright/test";
import WebTablesPage from "../../../pages/elements/WebTablesPage.js";
import HomePage from "../../../pages/HomePage.js";
import { generateRandomEmail } from "../../../utils/helper.js";

test.describe("DEMOQA Web Tables Module", () => {
  let webTablesPage, homePage;
  const email = generateRandomEmail();

  test.beforeEach(({ page }) => {
    webTablesPage = new WebTablesPage(page);
    homePage = new HomePage(page);
  });

  test("@smoke Verify open the page and add new data", async ({ page }) => {
    await homePage.navigateToElements();
    await webTablesPage.clickOnWebTablesMenu();
    await webTablesPage.clickOnAddButton();
    await webTablesPage.entertextField(
      "Nurul",
      "Arifin",
      email,
      "31",
      "7500000",
      "Dev."
    );
    await webTablesPage.clickOnSubmitButton();

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("Arifin");
  });
});
