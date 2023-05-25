/// <reference types="cypress" />
import { v4 as unique } from 'uuid';

const email = unique();

describe('check registration', () => {
  it('should validate and register', () => {
    cy.visit('/');

    cy.contains('Welcome to GraphiQL');

    cy.get('nav a').should('have.length', 3);

    cy.get('nav a')
      .last()
      .then(($link) => {
        if ($link.text().includes('Sign out')) {
          cy.contains('Sign out').click();
        }
      });

    cy.contains('Sign Up').click();

    cy.get('input[name=email]').type(`${email}@gmail.com`);
    cy.get('input[name=password]:first-of-type').type('test1111');
    cy.get('input[name=passwordRepeat]').type('test@1111');

    cy.get('form button[type=button]').click();

    cy.contains(/Minimum 8 symbols/i);
    cy.contains(/must match/i);

    const password = () => cy.get('input[name=password]:first-of-type');
    password().clear();
    password().type('test@1111');

    const repeat = () => cy.get('input[name=passwordRepeat]');
    repeat().clear();
    repeat().type('test@1111');

    cy.get('form button[type=button]').click();

    cy.contains(/your first request/i);

    cy.contains('Sign out').click();
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
