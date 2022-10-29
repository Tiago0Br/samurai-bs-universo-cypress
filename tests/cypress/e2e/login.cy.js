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

    context('Tentativa de login', () => {
        it('Senha errada', () => {
            const user = {
                name: 'Celso Kamura',
                email: 'kamura@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            }

            cy.postUser(user).then(() => {
                user.password = 'abc123'
                loginPage.go()
                loginPage.form(user)
                loginPage.submit()
                const message = 'verifique suas credenciais'
                loginPage.toast.shouldHaveText(message)
            })
        })

        context('E-mail inválido', () => {
            const invalidEmails = [
                'tiago.com.br',
                'yahoo.com',
                '@gmail.com',
                '@',
                'tiago@'
            ]

            before(() => {
                loginPage.go()
            })

            invalidEmails.forEach(invalidEmail => {
                it(`Não deve logar com o e-mail ${invalidEmail}`, () => {
                    const user = { email: invalidEmail, password: 'pwd123' }

                    loginPage.form(user)
                    loginPage.submit()
                    loginPage.alertHaveText('Informe um email válido')
                })
            })
        })
    })
})