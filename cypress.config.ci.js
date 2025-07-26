const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    // CI-specific settings
    experimentalModifyObstructiveThirdPartyCode: true,
    // Reduce video quality for faster uploads
    videoCompression: 32,
    // Retry failed tests
    retries: {
      runMode: 2,
      openMode: 0,
    },
    // Environment variables for CI
    env: {
      CI: true,
    },
  },
  // Component testing configuration (if needed in future)
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
