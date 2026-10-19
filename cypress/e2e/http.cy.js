describe("HTTP status codes", () => {
  [200, 404, 500].forEach((code) => {
    it(`/status_codes/${code} returns ${code}`, () => {
      cy.statusOf(`/status_codes/${code}`).should("eq", code);
    });
  });
});

describe("Basic authentication", () => {
  it("rejects a request with no credentials", () => {
    cy.statusOf("/basic_auth").should("eq", 401);
  });

  it("shows the success page with the right credentials", () => {
    cy.visit("/basic_auth", { auth: { username: "admin", password: "admin" } });

    cy.contains("Congratulations");
  });
});
