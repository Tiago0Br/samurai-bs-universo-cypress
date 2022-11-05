import toast from '../../components/toast'
import alert from '../../components/alert'
import { el } from './elements'

class LoginPage {
    constructor() {
        this.toast = toast
        this.alert = alert
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
}

export default new LoginPage()