export const CONFIG = {
  BASE_URL: process.env.BASE_URL || "https://demoqa.com",
  TIMEOUT: 180000,
  TESDIR: "./tests",
  RETRIES: 1,
  WORKERS: 1,
  ARGS: "--start-maximized",

  // 💻 Browser settings
  HEADLESS: process.env.HEADLESS === "true" || false,
  VIEWPORT: null,
};
