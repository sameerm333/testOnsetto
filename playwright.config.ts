
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  // Test directory
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: false,

  // Fail if test.only is committed
  forbidOnly: !!process.env.CI,

  // Retry only in CI
  retries: process.env.CI ? 2 : 0,

  // Single worker in CI
  workers: process.env.CI ? 1 : undefined,

  // HTML report
  reporter: 'html',

  // Folder for screenshots/videos/traces
  outputDir: 'test-results',

  // Global timeout
  timeout: 60 * 1000,

  // Expect timeout
  expect: {
    timeout: 10000,
  },

  // Shared settings
  use: {
    baseURL: process.env.BASE_URL,

    headless: false,

    viewport: {
      width: 1440,
      height: 900,
    },

    actionTimeout: 15000,

    navigationTimeout: 30000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Uncomment if needed

    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    */
  ],
});