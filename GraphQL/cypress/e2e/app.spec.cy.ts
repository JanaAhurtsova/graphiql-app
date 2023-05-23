/// <reference types="cypress" />
import { v4 as unique } from 'uuid';
import { TestQuery, TestVariables, InvalidVariables } from '../../src/managers/request/Request';

const email = unique();

describe('check app', () => {
  it('should register', () => {
    cy.visit('/');

    cy.contains('Welcome to GraphiQL');

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

  it('should login and use playground', () => {
    cy.visit('/');

    cy.contains('Welcome to GraphiQL');

    cy.get('nav a')
      .last()
      .then(($link) => {
        if ($link.text().includes('Sign out')) {
          cy.contains('Sign out').click();
        }
      });
    //validate sign in
    cy.contains('Sign In').click();

    cy.get('form button span').should('have.text', 'Sign In');

    cy.get('input[name=email]').type('byjanka@tut.by');
    cy.get('input[name=password]').type('1111111');

    cy.get('form button[type=button]').click();

    cy.contains(/not correct/i);

    cy.get('input[name=password]').type('1');

    cy.get('form button[type=button]').click();

    //write request
    cy.get('textarea').first().type(TestQuery, { parseSpecialCharSequences: false });
    cy.contains('Variables').click();
    cy.get('textarea[name=variables]').type(InvalidVariables, { parseSpecialCharSequences: false });
    cy.get('span[aria-label=caret-right]').click();

    cy.contains(/error/i);
    cy.contains('OK').click();

    const variables = () => cy.get('textarea[name=variables]');
    variables().clear();
    variables().type(TestVariables, { parseSpecialCharSequences: false });

    cy.get('span[aria-label=caret-right]').click();

    cy.contains(/"name": "Mechanical Rick"/i);

    //open documentation
    cy.get('aside ul li:first-of-type[aria-disabled=false]').click();
    cy.contains(/FilterLocation/);
    cy.get('button.ant-drawer-close').click();

    cy.contains('Sign out').click();
  });

  it('show error page', () => {
    cy.visit('/test');

    cy.contains('Nothing to see here');

    cy.get('.ant-switch-inner').click();
    cy.contains('Здесь ничего нет');
  });

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
