describe("Dynamic controls", () => {
  beforeEach(() => {
    cy.visit("/dynamic_controls");
  });

  it("removes and re-adds a checkbox", () => {
    cy.get("#checkbox").should("exist");

    cy.contains("button", "Remove").click();
    cy.get("#message").should("contain", "It's gone!");
    cy.get("#checkbox").should("not.exist");

    cy.contains("button", "Add").click();
    cy.get("#message").should("contain", "It's back!");
    cy.get("#checkbox").should("exist");
  });

  it("enables a disabled text input", () => {
    cy.get("#input-example input").should("be.disabled");

    cy.contains("button", "Enable").click();
    cy.get("#message").should("contain", "It's enabled!");

    cy.get("#input-example input").should("be.enabled").type("hello").should("have.value", "hello");
  });
});

describe("Dynamic loading", () => {
  // Example 1 hides the element until loading ends; example 2 adds it to the page afterward.
  [1, 2].forEach((example) => {
    it(`shows the loaded text in example ${example}`, () => {
      cy.visit(`/dynamic_loading/${example}`);

      cy.contains("button", "Start").click();

      cy.get("#finish").should("be.visible").and("contain", "Hello World!");
    });
  });
});
