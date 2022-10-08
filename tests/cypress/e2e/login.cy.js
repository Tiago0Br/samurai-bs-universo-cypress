/// <reference types="cypress"/>

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
    context('Usuário válido', () => {
        const user = {
            name: 'Teste de Login',
            email: 'teste@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('Login com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })
})