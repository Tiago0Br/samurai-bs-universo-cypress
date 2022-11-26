/// <reference types="cypress"/>
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Dashboard', () => {
    it('Deve exibir o agendamento feito por um cliente no dashboard', () => {
        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycure.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            },
            appointmentHour: '14:00'
        }

        const { customer, provider, appointmentHour } = data
        cy.postUser(customer)
        cy.postUser(provider)

        cy.apiLogin(customer)
        cy.setProviderId(provider.email)
        cy.createAppointment(appointmentHour).then(() => {
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()
    
            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBe(customer, appointmentHour)
        })
    })
})