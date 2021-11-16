describe("geolocation", () => {
  beforeEach(() => {
    cy.visit("/geolocation");
  });

  it("should show the loader message", () => {
    cy.findByTestId("currency").should("exist");
    cy.findByTestId("language").should("exist");
  });
});
