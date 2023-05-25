/// <reference types="cypress" />
import { TestQuery, TestVariables, InvalidVariables } from '../../src/managers/request/Request';

describe('check app', () => {
  it('should login and use playground', () => {
    cy.visit('/');

    cy.get('nav a').should('have.length', 3);

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

    cy.get('input[name=email]').type('test1@mail.ru');
    cy.get('input[name=password]').type('Qwerty123456');

    cy.get('form button[type=button]').click();

    cy.contains(/registration error/i);

    cy.get('input[name=password]').type('!');

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

  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});
