/// <reference types="cypress" />

describe('check 404 page', () => {
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
