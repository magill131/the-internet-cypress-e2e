describe("Form authentication", () => {
  it("logs in with valid credentials and logs out", () => {
    cy.login();

    cy.url().should("include", "/secure");
    cy.get("#flash").should("contain", "You logged into a secure area!");

    cy.contains("a", "Logout").click();

    cy.url().should("include", "/login");
    cy.get("#flash").should("contain", "You logged out of the secure area!");
  });

  it("shows an error for an invalid username", () => {
    cy.login("not_a_user", Cypress.env("password"));

    cy.url().should("include", "/login");
    cy.get("#flash").should("contain", "Your username is invalid!");
  });

  it("shows an error for an invalid password", () => {
    cy.login(Cypress.env("username"), "wrong_password");

    cy.url().should("include", "/login");
    cy.get("#flash").should("contain", "Your password is invalid!");
  });

  it("sends a visitor who is not logged in away from the secure page", () => {
    cy.visit("/secure");

    cy.url().should("include", "/login");
    cy.get("#flash").should("contain", "You must login to view the secure area!");
  });
});
