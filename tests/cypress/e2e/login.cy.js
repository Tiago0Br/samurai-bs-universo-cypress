/// <reference types="cypress"/>

import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', () => {
    it('Login com sucesso', () => {
        const user = {
            name: 'Teste de Login',
            email: 'teste@samuraibs.com',
            password: 'pwd123'
        }

        loginPage.go()
        loginPage.form(user)
        loginPage.submit()
        dashPage.userLoggedIn(user.name)
    })
})