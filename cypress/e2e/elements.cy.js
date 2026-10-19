describe("Add and remove elements", () => {
  it("adds three buttons and removes one", () => {
    cy.visit("/add_remove_elements/");

    for (let i = 0; i < 3; i++) {
      cy.contains("button", "Add Element").click();
    }
    cy.get(".added-manually").should("have.length", 3);

    cy.get(".added-manually").first().click();
    cy.get(".added-manually").should("have.length", 2);
  });
});

describe("File upload", () => {
  it("uploads a file and shows its name", () => {
    cy.visit("/upload");

    cy.get("#file-upload").selectFile("cypress/fixtures/sample.txt");
    cy.get("#file-submit").click();

    cy.get("h3").should("contain", "File Uploaded!");
    cy.get("#uploaded-files").should("contain", "sample.txt");
  });
});

describe("Sortable data table", () => {
  // Reads the Last Name column inside .should(), so Cypress retries until the table has sorted.
  const lastNamesShould = (check) =>
    cy.get("#table1 tbody tr td:nth-child(1)").should(($cells) => {
      const names = Cypress._.map($cells, (cell) => cell.innerText.trim());
      check(names);
    });

  beforeEach(() => {
    cy.visit("/tables");
  });

  it("sorts by last name ascending on the first click", () => {
    cy.contains("#table1 th", "Last Name").click();

    lastNamesShould((names) => {
      expect(names).to.deep.equal([...names].sort());
    });
  });

  it("sorts by last name descending on the second click", () => {
    cy.contains("#table1 th", "Last Name").click().click();

    lastNamesShould((names) => {
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });
});
