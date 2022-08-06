/// <reference types="cypress"/>

it('A aplicação deve estar online', () => {
    cy.visit('/')
    cy.get('form h1')
        .should('be.visible')
        .and('have.text', 'Faça seu login')
})