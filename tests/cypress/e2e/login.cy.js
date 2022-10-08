/// <reference types="cypress"/>

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
    beforeEach(() => {
        loginPage.go()
    })

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
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('Tentativa de login', () => {
        const user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(() => {
                user.password = 'abc123'
            })
        })

        it('Não deve logar se a senha estiver errada', () => {
            loginPage.form(user)
            loginPage.submit()
            cy.get('div.toast')
                .should('be.visible')
                .and('contain', 'verifique suas credenciais')
        })
    })
})