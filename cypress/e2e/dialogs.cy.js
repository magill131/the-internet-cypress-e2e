describe("JavaScript dialogs", () => {
  beforeEach(() => {
    cy.visit("/javascript_alerts");
  });

  it("accepts a JS alert", () => {
    const onAlert = cy.stub();
    cy.on("window:alert", onAlert);

    cy.contains("button", "Click for JS Alert")
      .click()
      .then(() => expect(onAlert).to.have.been.calledOnce);

    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  it("accepts a JS confirm", () => {
    // Cypress accepts confirms automatically.
    cy.contains("button", "Click for JS Confirm").click();

    cy.get("#result").should("have.text", "You clicked: Ok");
  });

  it("cancels a JS confirm", () => {
    cy.on("window:confirm", () => false);

    cy.contains("button", "Click for JS Confirm").click();

    cy.get("#result").should("have.text", "You clicked: Cancel");
  });

  it("answers a JS prompt", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Chris");
    });

    cy.contains("button", "Click for JS Prompt").click();

    cy.get("#result").should("have.text", "You entered: Chris");
  });
});

describe("Context menu", () => {
  it("shows an alert when the hot spot is right-clicked", () => {
    const onAlert = cy.stub();
    cy.on("window:alert", onAlert);
    cy.visit("/context_menu");

    cy.get("#hot-spot")
      .rightclick()
      .then(() => expect(onAlert).to.have.been.calledOnce);
  });
});
