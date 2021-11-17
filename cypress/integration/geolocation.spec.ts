describe("geolocation", () => {
  beforeEach(() => {
    cy.visit("/geolocation");
  });

  it("should show the currency and language", () => {
    cy.findByTestId("currency").should("exist");
    cy.findByTestId("language").should("exist");
  });
});
