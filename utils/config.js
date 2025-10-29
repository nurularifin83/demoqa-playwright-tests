export const CONFIG = {
  BASE_URL: process.env.BASE_URL || "https://demoqa.com",
  TIMEOUT: 120000,
  TESDIR: "./tests",
  RETRIES: process.env.CI ? 2 : 0,
  WORKERS: 1,
  ARGS: "--start-maximized",

  // 💻 Browser settings
  HEADLESS: process.env.HEADLESS === "true" || true,
  VIEWPORT: null,
};
