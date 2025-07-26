// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for login
Cypress.Commands.add("login", (username = "admin", password = "password") => {
  cy.visit("/");
  cy.get('input[type="text"]').type(username);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.get("h2").should("contain", "Todo List");
});

// Custom command for adding a todo
Cypress.Commands.add("addTodo", (text) => {
  cy.get('input[placeholder="Add new todo"]').type(text);
  cy.get("form").first().submit();
  cy.get("ul li").should("contain", text);
});
