describe("Form controls", () => {
  it("checks and unchecks checkboxes", () => {
    cy.visit("/checkboxes");
    const boxes = () => cy.get("#checkboxes input[type='checkbox']");

    boxes().first().check().should("be.checked");
    boxes().last().uncheck().should("not.be.checked");
  });

  it("selects options in a dropdown", () => {
    cy.visit("/dropdown");

    cy.get("#dropdown").select("Option 1").should("have.value", "1");
    cy.get("#dropdown").select("Option 2").should("have.value", "2");
  });

  it("accepts a number in a number input", () => {
    cy.visit("/inputs");

    cy.get("input[type='number']").type("42").should("have.value", "42");
  });

  it("reports the key that was pressed", () => {
    cy.visit("/key_presses");

    cy.get("#target").type("A");

    cy.get("#result").should("contain", "You entered: A");
  });
});
