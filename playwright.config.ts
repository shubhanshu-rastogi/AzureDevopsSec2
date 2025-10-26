// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  // ... your other settings (timeout, use, projects) ...
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['html',  { outputFolder: 'reports/html', open: 'never' }],
    ['blob'],
    [path.resolve(__dirname, './telemetry/appinsights-reporter.ts')], // <-- add this line
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
