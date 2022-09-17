/// <reference types="cypress"/>

it('A aplicação deve estar online', () => {
    cy.visit('/')
    cy.get('form h1', { timeout: 7000 })
        .should('be.visible')
        .and('have.text', 'Faça seu login')
})