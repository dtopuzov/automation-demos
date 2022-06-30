/// <reference types="cypress" />

describe('dynamic elements spec', () => {
  it('dynamic created', () => {
    cy.visit('/dynamic_loading/2');
    cy.get('#start button').click();
    cy.get('#finish h4', { timeout: 20000 }).should('be.visible');
  });

  it('dynamic displayed', () => {
    cy.visit('/dynamic_loading/1');
    cy.get('#start button').click();
    cy.get('#finish h4', { timeout: 20000 }).should('be.visible');
  });
});