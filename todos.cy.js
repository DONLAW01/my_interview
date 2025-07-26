describe("Todo CRUD Operations", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/");
    cy.wait(2000); // Wait for page to load

    cy.get('input[type="text"]', { force: true }).type("admin");
    cy.get('input[type="password"]', { force: true }).type("password");
    cy.get('button[type="submit"]', { force: true }).click();

    // Wait for todo list to load - our app shows "Task Manager"
    cy.get("h2").should("contain", "Task Manager");
  });

  it("should display existing todos", () => {
    cy.get(".todo-item").should("have.length.at.least", 1);
  });

  it("should create a new todo", () => {
    const newTodoText = "Test Todo " + Date.now();

    cy.get('input[placeholder="Add a new task..."]', { force: true }).type(
      newTodoText
    );
    cy.get(".add-btn", { force: true }).click();

    // Should add the new todo to the list
    cy.get(".todo-item").should("contain", newTodoText);
  });

  it("should not create empty todo", () => {
    cy.get(".todo-item").then(($items) => {
      const initialCount = $items.length;

      cy.get('input[placeholder="Add a new task..."]', { force: true }).type(
        "   "
      ); // Only spaces
      cy.get(".add-btn", { force: true }).click();

      // Should not add empty todo
      cy.get(".todo-item").should("have.length", initialCount);
    });
  });

  it("should edit an existing todo", () => {
    const updatedText = "Updated Todo " + Date.now();

    // Click edit button on first todo
    cy.get(".todo-item").first().find(".edit-btn", { force: true }).click();

    // Update the text
    cy.get('input[type="text"]').last().clear().type(updatedText);
    cy.get(".save-btn", { force: true }).click();

    // Should show updated text
    cy.get(".todo-item").first().should("contain", updatedText);
  });

  //   it("should cancel editing a todo", () => {
  //     const originalText = "Sample Todo";

  //     // Click edit button
  //     cy.get(".todo-item").first().find(".edit-btn", { force: true }).click();

  //     // Change text but cancel
  //     cy.get('input[type="text"]').last().clear().type("Changed Text");
  //     cy.get(".cancel-btn", { force: true }).click();

  //     // Should show original text
  //     cy.get(".todo-item").first().should("contain", originalText);
  //   });

  it("should delete a todo", () => {
    // Get initial count
    cy.get(".todo-item").then(($items) => {
      const initialCount = $items.length;

      // Delete first todo
      cy.get(".todo-item").first().find(".delete-btn", { force: true }).click();

      // Should have one less todo
      cy.get(".todo-item").should("have.length", initialCount - 1);
    });
  });

  it("should toggle todo completion", () => {
    // Click the completion checkbox on first todo
    cy.get(".todo-item").first().find(".complete-btn", { force: true }).click();

    // Should show completed state
    cy.get(".todo-item").first().should("have.class", "completed");
  });

  it("should logout successfully", () => {
    cy.get(".logout-btn", { force: true }).click();

    // Should return to login page
    cy.get("h2").should("contain", "Welcome Back");
    cy.get('input[type="text"]').should("be.visible");
  });
});
