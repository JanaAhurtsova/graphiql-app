/// <reference types="cypress" />
import text from '../../src/assets/json/localization.json';

describe('check 404 page', () => {
  it('show error page', () => {
    cy.visit('/test');

    cy.contains(text.en.errorTitle);

    cy.get('.ant-switch-inner').click();
    cy.contains(text.ru.errorTitle);
  });
});
