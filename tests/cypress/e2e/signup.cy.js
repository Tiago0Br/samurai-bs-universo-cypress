/// <reference types="cypress"/>
import signupPage from '../support/pages/signup'

describe('Cadastro de usuários', () => {
    beforeEach(() => {
        signupPage.go()
    })

    context('Cadastro válido', () => {
        it('Deve cadastrar um usuário com sucesso', () => {
            const user = {
                name: 'Tiago Lopes',
                email: 'tiagoltavares2002@gmail.com',
                password: 'pwd123'
            }
    
            cy.task('removeUser', user.email)
    
            signupPage.form(user)
            signupPage.submit()
    
            signupPage
                .toasterHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Tentativa de cadastro com dados inválidos', () => {
        it('Deve exibir um erro ao tentar cadastrar um usuário com e-mail repetido', () => {
            const user = {
                name: 'João Lucas',
                email: 'joaolucas@samuraibs.com',
                password: 'pwd123',
                is_provider: true
            }
    
            cy.task('removeUser', user.email)
            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/users',
                body: user
            }).its('status').should('be.equal', 200)
    
            signupPage.form(user)
            signupPage.submit()
    
            signupPage.toasterHaveText('Email já cadastrado para outro usuário.')
        })
    })
})