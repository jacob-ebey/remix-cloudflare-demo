describe("themes", () => {
  beforeEach(() => {
    cy.visit("/themes");
    cy.findByTestId("theme-dark").click();
    cy.get("html[data-theme='dark']").should("exist");
  });

  it("should load themes when clicked", () => {
    cy.findByTestId("theme-light").click();
    cy.get("html[data-theme='light']").should("exist");
  });
});
