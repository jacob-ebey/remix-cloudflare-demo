describe("redirects", () => {
  beforeEach(() => {
    cy.visit("/redirects");
  });

  it("should redirect to a post", () => {
    cy.findByText("/redirects/1", { exact: true }).click();
    cy.url().should("include", "/redirects/post/1");
  });
});
