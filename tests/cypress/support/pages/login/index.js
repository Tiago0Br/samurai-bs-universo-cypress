import toast from '../../components/toast'
import { el } from './elements'

class LoginPage {
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.email).clear().type(user.email)
        cy.get(el.password).clear().type(user.password, { log: false })
    }

    submit() {
        cy.contains(el.signIn).click()
    }

    alertHaveText(expectedText) {
        cy.contains(el.alertError, expectedText)
            .should('be.visible')
    }
}

export default new LoginPage()