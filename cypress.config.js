const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Demo credentials published on the site's own login page, so they are safe to expose.
  // Read them in tests with Cypress.expose("username"). (Cypress 16 removed Cypress.env().)
  expose: {
    username: "tomsmith",
    password: "SuperSecretPassword!",
  },
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
  },
});
