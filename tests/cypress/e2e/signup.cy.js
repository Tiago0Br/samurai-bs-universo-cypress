/// <reference types="cypress"/>
import signupPage from '../support/pages/signup'

describe('Cadastro de usuários', () => {
    context('Cadastro válido', () => {
        it('Deve cadastrar um usuário com sucesso', () => {
            const user = {
                name: 'Tiago Lopes',
                email: 'tiagoltavares2002@gmail.com',
                password: 'pwd123'
            }
    
            cy.task('removeUser', user.email)
    
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
    
            signupPage
                .toast
                .shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Tentativa de cadastro com dados inválidos', () => {
        it('E-mail repetido', () => {
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
    
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
    
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })

        it('E-mail inválido', () => {
            const user = {
                name: 'Elizabeth Olsen',
                email: 'liza.yahoo.com',
                password: 'pwd123'
            }

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })

        context('Senha com menos de 6 caracteres', () => {
            const user = { name: 'Jason Friday', email: 'jason@gmail.com' }
            const passwords = ['1', '2a', '3ab', '4abc', '5abcd']
            passwords.forEach(p => {
                it(`${p.length} ${p.length === 1 ? 'caracter' : 'caracteres'}`, () => {
                    user.password = p
                    signupPage.go()
                    signupPage.form(user)
                    signupPage.submit()
                    signupPage.alert.haveText('Pelo menos 6 caracteres')
                })
            })
        })

        context('Campos em branco', () => {
            const alertMessages = [
                {field: 'nome', message: 'Nome é obrigatório'}, 
                {field: 'e-mail', message: 'E-mail é obrigatório'}, 
                {field: 'senha', message: 'Senha é obrigatória'}
            ]

            before(() => {
                signupPage.go()
                signupPage.submit()
            })

            alertMessages.forEach(({ field, message }) => {
                it(field, () => {
                    signupPage.alert.haveText(message)
                })
            })
        })
    })
})