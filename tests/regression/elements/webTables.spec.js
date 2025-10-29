import { test, expect } from "@playwright/test";
import WebTablesPage from "../../../pages/elements/WebTablesPage.js";
import HomePage from "../../../pages/HomePage.js";
import { generateRandomEmail } from "../../../utils/helper.js";

test.describe("DEMOQA Web tables Module", async () => {
  let webTablesPage, homePage;
  const email = generateRandomEmail();

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await webTablesPage.clickOnWebTablesMenu();
  });

  test("@regression Verify add valid data succefully", async ({ page }) => {
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

  test("@regression Verify add data with empty textfield", async () => {
    await webTablesPage.clickOnAddButton();
    await webTablesPage.clickOnSubmitButton();

    const textFieldEmpty =
      (await webTablesPage.isInputEmpty("#firstName")) &&
      (await webTablesPage.isInputEmpty("#lastName")) &&
      (await webTablesPage.isInputEmpty("#userEmail")) &&
      (await webTablesPage.isInputEmpty("#age")) &&
      (await webTablesPage.isInputEmpty("#salary")) &&
      (await webTablesPage.isInputEmpty("#department"));
    expect(textFieldEmpty).toBeTruthy;
  });

  test("@regression Verify add data with invalid email", async () => {
    await webTablesPage.clickOnAddButton();
    await webTablesPage.entertextField(
      "Nurul",
      "Arifin",
      "nurularifingmail.com",
      "31",
      "7500000",
      "Dev."
    );
    await webTablesPage.clickOnSubmitButton();

    const isEmailValueInvalid = await webTablesPage.isEmailValueInvalid();
    expect(isEmailValueInvalid).toBeTruthy;
  });

  test("@regression Verify add data with invalid number format", async () => {
    await webTablesPage.clickOnAddButton();
    await webTablesPage.entertextField(
      "Nurul",
      "Arifin",
      email,
      "ab",
      "def",
      "Dev."
    );
    await webTablesPage.clickOnSubmitButton();

    const ageAndSalaryInvalid = await webTablesPage.isAgeAndSalaryInvalid();
    expect(ageAndSalaryInvalid).toBeTruthy;
  });

  // edit data and delete data test cases can be added here in the future
  test("@regression Verify edit with valid data", async ({ page }) => {
    await webTablesPage.clickOnEditButtonByRow();
    await webTablesPage.entertextField(
      "Muhammad",
      "Juwaini",
      "muhammadjuwaini@gmail.com",
      "37",
      "5000000",
      "PM."
    );
    await webTablesPage.clickOnSubmitButton();
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toContain("muhammadjuwaini@gmail.com");
  });

  test("@regression Verify edit with invalid email format", async () => {
    await webTablesPage.clickOnEditButtonByRow();
    await webTablesPage.entertextField(
      "Muhammad",
      "Juwaini",
      "nurularifingmail.com",
      "37",
      "5000000",
      "PM."
    );
    await webTablesPage.clickOnSubmitButton();
    const isEmailValueInvalid = await webTablesPage.isEmailValueInvalid();
    expect(isEmailValueInvalid).toBeTruthy;
  });

  test("@regression Verify edit data with invalid number format", async () => {
    await webTablesPage.clickOnEditButtonByRow();
    await webTablesPage.entertextField(
      "Nurul",
      "Arifin",
      email,
      "ab",
      "def",
      "Dev."
    );
    await webTablesPage.clickOnSubmitButton();

    const ageAndSalaryInvalid = await webTablesPage.isAgeAndSalaryInvalid();
    expect(ageAndSalaryInvalid).toBeTruthy;
  });

  test("@regression Verify edit data with empty textfield", async () => {
    await webTablesPage.clickOnEditButtonByRow();
    await webTablesPage.entertextField("", "", "", "", "", "");
    await webTablesPage.clickOnSubmitButton();

    const textFieldEmpty =
      (await webTablesPage.isInputEmpty("#firstName")) &&
      (await webTablesPage.isInputEmpty("#lastName")) &&
      (await webTablesPage.isInputEmpty("#userEmail")) &&
      (await webTablesPage.isInputEmpty("#age")) &&
      (await webTablesPage.isInputEmpty("#salary")) &&
      (await webTablesPage.isInputEmpty("#department"));
    expect(textFieldEmpty).toBeTruthy;
  });

  test.afterEach(async ({ context }) => {
    for (const page of context.pages()) {
      if (!page.isClosed) await page.close().catch(() => {});
    }
  });
});
