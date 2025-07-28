describe("Basic Application Tests", () => {
  it("should load the application", () => {
    cy.visit("/");
    cy.get("h2").should("contain", "Welcome Back");
  });

  it("should have login form elements", () => {
    cy.visit("/");
    cy.get('input[type="text"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get('button[type="submit"]').should("contain", "Sign In");
  });

  it("should show login credentials hint", () => {
    cy.visit("/");
    cy.contains("admin / password").should("be.visible");
  });

  it("should have professional styling", () => {
    cy.visit("/");
    // Check for gradient background
    cy.get("body")
      .should("have.css", "background")
      .and("include", "linear-gradient");

    // Check for glass morphism effect
    cy.get(".login-card").should("exist");

    // Check for icons
    cy.get(".login-icon").should("exist");
  });

  it("should have completion functionality", () => {
    cy.visit("/");
    cy.get('input[type="text"]').type("admin");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    // Wait for todo list to load
    cy.get("h2").should("contain", "Task Manager");

    // Check for completion buttons
    cy.get(".complete-btn").should("exist");

    // Check for todo items with completion functionality
    cy.get(".todo-item").should("exist");
    cy.get(".todo-content").should("exist");
  });
});
