const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://the-internet.herokuapp.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    // The site delays some elements by several seconds on purpose.
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 1, openMode: 0 },
    // Demo credentials published on the site's own login page.
    env: {
      username: "tomsmith",
      password: "SuperSecretPassword!",
    },
  },
});
