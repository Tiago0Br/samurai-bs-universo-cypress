import header from '../../components/header'
import { el } from './elements'

class DashPage {
    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 }).should('be.visible')
    }

    selectDay(date) {
        cy.intercept({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/providers/**/month-availability**`
        }).as('availableDays')

        const day = date.getDate()
        const month = date.getMonth()
        const now = new Date()
        if (month !== now.getMonth()) {
            cy.get('span[class*=next]').click()
            cy.wait('@availableDays')
        }

        const target = new RegExp(`^${day}$`, 'g')
        cy.contains(el.availableDays, target).click()
    }

    appointmentShouldBe(customer, hour) {
        cy.contains('div', customer.name)
            .should('be.visible')
            .parent()
            .contains(el.appointmentHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()