// Fill in and submit the login form on /login.
Cypress.Commands.add("login", (username = Cypress.env("username"), password = Cypress.env("password")) => {
  cy.visit("/login");
  if (username) {
    cy.get("#username").type(username);
  }
  if (password) {
    cy.get("#password").type(password, { log: false });
  }
  cy.get("button[type='submit']").click();
});

// Run a request that is expected to fail without Cypress failing the test on the status code.
Cypress.Commands.add("statusOf", (path) => {
  return cy.request({ url: path, failOnStatusCode: false }).its("status");
});
