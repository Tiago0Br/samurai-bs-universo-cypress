/// <reference types="cypress"/>

describe('Cadastro de usuários', () => {
    beforeEach(() => {
        cy.visit('/signup')
    })

    context('Cadastro válido', () => {
        it('Deve cadastrar um usuário com sucesso', () => {
            const user = {
                name: 'Tiago Lopes',
                email: 'tiagoltavares2002@gmail.com',
                password: 'pwd123'
            }
    
            cy.task('removeUser', user.email)
    
            cy.get('input[placeholder*=Nome]').type(user.name)
            cy.get('input[placeholder*="email"]').type(user.email)
            cy.get('input[type=password]').type(user.password)
    
            cy.contains('button', 'Cadastrar').click()
    
            cy.get('.toast', { timeout: 8000 })
                .find('p')
                .should('be.visible')
                .and('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
    
            cy.get('input[placeholder*=Nome]').type(user.name)
            cy.get('input[placeholder*="email"]').type(user.email)
            cy.get('input[type=password]').type(user.password)
    
            cy.contains('button', 'Cadastrar').click()
    
            cy.get('.toast', { timeout: 8000 })
                .find('p')
                .should('be.visible')
                .and('have.text', 'Email já cadastrado para outro usuário.')
        })
    })
})