describe("ab-testing", () => {
  beforeEach(() => {
    cy.visit("/ab-testing");
  });

  it("should show original", () => {
    cy.findByText("Remove Bucket", { exact: true }).click();
    cy.findByText("Bucket: none", { exact: true }).should("exist");
  });

  it("should show variant a", () => {
    cy.findByText("Bucket A", { exact: true }).click();
    cy.findByText("Bucket: a", { exact: true }).should("exist");
  });

  it("should show variant b", () => {
    cy.findByText("Bucket B", { exact: true }).click();
    cy.findByText("Bucket: b", { exact: true }).should("exist");
  });
});
