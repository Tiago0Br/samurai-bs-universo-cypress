import { el } from './elements'
import toast from '../../components/toast'

class ResetPassPage {
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit(`/reset-password?token=${Cypress.env('recoveryToken')}`)

        cy.contains(el.title)
            .should('be.visible')
    }

    form(newPass, confirmPass) {
        cy.get(el.newPassword)
            .clear()
            .type(newPass)
        cy.get(el.passwordConfirm)
            .clear()
            .type(confirmPass)
    }

    submit() {
        cy.contains(el.changePassButton).click()
    }
}

export default new ResetPassPage()