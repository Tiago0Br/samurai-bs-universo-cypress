/// <reference types="cypress"/>

Cypress.Commands.add('postUser', user => {
    cy.task('removeUser', user.email)
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/users',
        body: user
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('recoveryPass', email => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/password/forgot',
        body: {
            email
        }
    }).its('status').should('be.equal', 204)

    cy.task('findToken', email).then(result => {
        Cypress.env('recoveryToken', result.token)
    })
})