describe("index", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show the hero", () => {
    cy.findByText("Remix on Cloudflare", { exact: false }).should("exist");
  });
});
