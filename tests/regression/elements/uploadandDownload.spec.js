import { test, expect } from "@playwright/test";
import UploadandDownloadPage from "../../../pages/elements/UploadandDownloadPage.js";
import HomePage from "../../../pages/HomePage.js";

test.describe("DEMOQA Upload And Download Module", () => {
  let uploadandDownloadPage, homePage;

  test.beforeEach(async ({ page }) => {
    uploadandDownloadPage = new UploadandDownloadPage(page);
    homePage = new HomePage(page);

    await homePage.navigateToElements();
    await uploadandDownloadPage.clickOnUploadandDownloadMenu();
  });

  test("@regression1 Verify download is successfully", async () => {
    await uploadandDownloadPage.downloadFile();
    // Verify is download success
    const fs = require("fs");
    expect(fs.existsSync("./downloads/sampleFile.jpeg")).toBeTruthy();
  });

  test("@regression1 Verify upload successfully", async () => {
    await uploadandDownloadPage.uploadFile();
    const uploadedValue = await uploadandDownloadPage.verifyUploadedFile();
    expect(uploadedValue).toContain("sampleFile.jpeg");
  });
});
