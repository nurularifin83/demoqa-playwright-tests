import { test, expect } from "@playwright/test";
import CheckBoxPage from "../../../pages/elements/CheckBoxPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Check Box Module", () => {
  let checkBoxPage, homePage;

  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await checkBoxPage.clickOnCheckBoxMenu();
  });

  test("@regression Verify checked check box successfully", async () => {
    await checkBoxPage.clickOnCheckBox();
    const isCorrect = await checkBoxPage.verifyDisplayResult(
      "You have selected"
    );
    expect(isCorrect).toBeTruthy;
  });

  test("@regression Verify Unchecked check box successfully", async () => {
    await checkBoxPage.clickOnCheckBox();
    await checkBoxPage.clickOnCheckBox();
    const isCheckedMarkInvisible =
      await checkBoxPage.isCheckedMarkNotDisplayed();
    expect(isCheckedMarkInvisible).toBeTruthy;
  });

  test("@regression Verify Maximize check box successfully", async () => {
    await checkBoxPage.maximize();
    const isTextVisible = await checkBoxPage.isExcelFileVisible(
      "Excel File.doc"
    );
    expect(isTextVisible).toBeTruthy;
  });

  test("@regression Verify Collapse check box successfully", async () => {
    await checkBoxPage.maximize();
    await checkBoxPage.collapse();
    const isTextNotVisible = await checkBoxPage.isExcelFileNotVisible();
    expect(isTextNotVisible).toBeTruthy;
  });

  test.afterEach(async ({ context }) => {
    for (const page of context.pages()) {
      if (!page.isClosed) await page.close().catch(() => {});
    }
  });
});
