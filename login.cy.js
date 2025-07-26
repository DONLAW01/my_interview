describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    // Wait for page to load and remove any overlays
    cy.wait(2000);
  });

  it("should display login form", () => {
    cy.get('input[type="text"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
  });

  it("should login with valid credentials", () => {
    cy.get('input[type="text"]', { force: true }).type("admin");
    cy.get('input[type="password"]', { force: true }).type("password");
    cy.get('button[type="submit"]', { force: true }).click();

    // Should redirect to todo list
    cy.get("h2").should("contain", "Task Manager");
  });

  it("should show error with invalid credentials", () => {
    cy.get('input[type="text"]', { force: true }).type("invalid");
    cy.get('input[type="password"]', { force: true }).type("wrongpassword");
    cy.get('button[type="submit"]', { force: true }).click();
  });

  it("should show error with empty credentials", () => {
    cy.get('button[type="submit"]', { force: true }).click();

    // HTML5 validation should prevent submission
    cy.get('input[type="text"]').should("have.attr", "required");
    cy.get('input[type="password"]').should("have.attr", "required");
  });
});
