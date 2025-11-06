import BasePage from "../BasePage.js";
import fs from "fs";
import path from "path";

export default class UploadandDownloadPage extends BasePage {
  constructor(page) {
    super(page);
    this.uploadInput = this.page.locator("#uploadFile");
    this.uploadedFilePath = this.page.locator("#uploadedFilePath");
  }

  async clickOnUploadandDownloadMenu() {
    const selector = "(//li[@id='item-7'])[1]";
    await this.safeClick(selector);
  }

  async downloadFile() {
    const downloadBtn = await this.page.locator("#downloadButton");
    const href = await downloadBtn.getAttribute("href");

    const base64Data = href.replace(/^data:image\/jpeg;base64,/, "");

    // ✅ Create downloads folder if it doesn't exist
    const downloadDir = path.resolve("./downloads");
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    // ✅ Save file
    const filePath = path.join(downloadDir, "sampleFile.jpeg");
    fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

    console.log(`✅ File downloaded successfully: ${filePath}`);
  }

  async uploadFile() {
    const filePath = path.resolve("./downloads/sampleFile.jpeg");

    // ✅ Upload the file
    await this.uploadInput.setInputFiles(filePath);

    console.log(`📤 File uploaded successfully: ${filePath}`);
  }

  async verifyUploadedFile() {
    await this.page.waitForSelector("#uploadedFilePath", { state: "visible" });
    const uploadedText = await this.uploadedFilePath.textContent();
    return uploadedText;
  }
}
