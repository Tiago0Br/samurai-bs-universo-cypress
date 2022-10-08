/// <reference types="cypress"/>

Cypress.Commands.add('postUser', user => {
    cy.task('removeUser', user.email)
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/users',
        body: user
    }).its('status').should('be.equal', 200)
})