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

  test("@smoke Verify open the page and download is successfully", async () => {
    await uploadandDownloadPage.downloadFile();
    // Verify is download success
    const fs = require("fs");
    expect(fs.existsSync("./downloads/sampleFile.jpeg")).toBeTruthy();
  });
});
