import { el } from './elements'

class SignupPage {
    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }

    toasterHaveText(expectText) {
        cy.get(el.toast, { timeout: 8000 })
            .find('p')
            .should('be.visible')
            .and('have.text', expectText)
    }
}

export default new SignupPage()