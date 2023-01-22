/// <reference types="cypress"/>

import moment from 'moment'
const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('postUser', user => {
    cy.task('removeUser', user.email)
    cy.request({
        method: 'POST',
        url: `${apiUrl}/users`,
        body: user
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('recoveryPass', email => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}/password/forgot`,
        body: {
            email
        }
    }).its('status').should('be.equal', 204)

    cy.task('findToken', email).then(result => {
        Cypress.env('recoveryToken', result.token)
    })
})

Cypress.Commands.add('apiLogin', ({ email, password }, setLocalStorage=false) => {
    const payload = {
        email,
        password
    }

    cy.request({
        method: 'POST',
        url: `${apiUrl}/sessions`,
        body: payload
    }).then(res => {
        expect(res.status).to.be.equal(200)
        Cypress.env('apiToken', res.body.token)

        if (setLocalStorage) {
            const { token, user } = res.body
    
            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))

            cy.visit('/dashboard')
        }
    })
})

Cypress.Commands.add('setProviderId', providerEmail => {
    cy.request({
        method: 'GET',
        url: `${apiUrl}/providers`,
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then(({ status, body }) => {
        expect(status).to.be.equal(200)
        body.forEach(provider => {
            if (provider.email === providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})

Cypress.Commands.add('createAppointment', hour => {
    let now = new Date()
    const dayOfWeek = now.getDay()
    let sumDays

    switch (dayOfWeek) {
        case 5: // sexta-feira
            sumDays = 3
            break
        case 6: // sábado
            sumDays = 2
            break
        default:
            sumDays = 1
            break
    }

    now.setDate(now.getDate() + sumDays)
    const date = moment(now).format(`YYYY-MM-DD ${hour}:00`)
    Cypress.env('appointmentDate', now)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date
    }

    cy.request({
        method: 'POST',
        url: `${apiUrl}/appointments`,
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        },
        body: payload
    }).its('status').should('be.equal', 200)
})