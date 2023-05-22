/// <reference types="cypress" />
import { v4 as unique } from 'uuid';
import { TestQuery, TestVariables } from '../../src/managers/request/Request';
const email = unique();

describe('check app', () => {
  it('should register', () => {
    cy.visit('/');

    cy.contains('Sign Up').click();

    cy.get('input[name=email]').type(`${email}@gmail.com`);
    cy.get('input[name=password]:first-of-type').type('test1111');
    cy.get('input[name=passwordRepeat]').type('test@1111');

    cy.get('form button[type=button]').click();

    cy.contains(/Minimum 8 symbols/i);
    cy.contains(/must match/i);

    cy.get('input[name=password]:first-of-type').clear().type('test@1111');
    cy.get('input[name=passwordRepeat]').clear().type('test@1111');

    cy.get('form button[type=button]').click();

    cy.contains(/your first request/i);

    cy.contains('Sign out').click();
  });

  it('should login and use playground', () => {
    cy.visit('/');

    cy.contains('Sign In').click();

    cy.get('form button span').should('have.text', 'Sign In');

    cy.get('input[name=email]').type('byjanka@tut.by');
    cy.get('input[name=password]').type('11111111');

    cy.get('form button[type=button]').click();

    cy.get('textarea').first().type(TestQuery, { parseSpecialCharSequences: false });
    cy.contains('Variables').click();
    cy.get('textarea[name=variables]').type(TestVariables, { parseSpecialCharSequences: false });

    cy.get('span[aria-label=caret-right]').click();

    cy.contains(/"name": "Mechanical Rick"/i);

    cy.contains('Sign out').click();
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
