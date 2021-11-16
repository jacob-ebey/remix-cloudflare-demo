describe("redirects", () => {
  beforeEach(() => {
    cy.visit("/redirects");
  });

  it("should show the loader message", () => {
    cy.findByText("/redirects/1", { exact: true }).click();
    cy.url().should("include", "/redirects/post/1");
  });
});
