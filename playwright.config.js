// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { CONFIG } from "./utils/config.js";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: CONFIG.TESDIR,
  timeout: CONFIG.TIMEOUT,
  retries: CONFIG.RETRIES,
  workers: CONFIG.WORKERS,
  reporter: [["list"], ["allure-playwright"], ["html", { open: "never" }]],
  use: {
    headless: CONFIG.HEADLESS,
    viewport: CONFIG.VIEWPORT, // important: let browser decide full screen size
    launchOptions: {
      args: [CONFIG.ARGS],
    },
    baseURL: CONFIG.BASE_URL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",

    contextOptions: {
      ignoreHTTPSErrors: true, // ✅ avoids random SSL-related crashes
    },

    // ✅ Auto-wait and stability improvements for large suites
    navigationTimeout: 60000,
    actionTimeout: 15000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        viewport: CONFIG.VIEWPORT,
        launchOptions: { args: [CONFIG.ARGS] },
      },
    },

    {
      name: "firefox",
      use: {
        viewport: CONFIG.VIEWPORT,
        launchOptions: {
          args: [CONFIG.ARGS],
          firefoxUserPrefs: {
            "network.http.max-connections": 256,
            "network.http.connection-timeout": 30,
            "network.http.response.timeout": 60,
          },
        },
      },
    },

    {
      name: "webkit",
      use: {
        viewport: CONFIG.VIEWPORT,
        launchOptions: { args: [CONFIG.ARGS] },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
