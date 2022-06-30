/// <reference types="cypress" />

describe('login spec', () => {
  it('should login with valid credentials', () => {
    // Hello-world implementation, everything inside the test
    cy.visit('/login');
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.get('#flash').should('contain.text', 'You logged into a secure area!');
  });

  it('should login with invalid username', () => {
    // Showcase using custom cypress commands (defined in commands.js)
    cy.visit('/login');
    cy.login('wrongUsername', 'SuperSecretPassword!');
    cy.get('#flash').should('contain.text', 'Your username is invalid!');
  });

  it('should login with invalid password', () => {
    // Showcase using custom cypress commands (defined in commands.js)
    cy.visit('/login');
    cy.login('tomsmith', 'wrongPassword');
    cy.get('#flash').should('contain.text', 'Your password is invalid!');
  });
});
