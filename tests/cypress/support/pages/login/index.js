class LoginPage {
    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get('input[placeholder$=mail]').type(user.email)
        cy.get('input[type=password]').type(user.password)
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }
}

export default new LoginPage()