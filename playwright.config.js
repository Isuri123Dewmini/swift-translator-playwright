const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ],

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
