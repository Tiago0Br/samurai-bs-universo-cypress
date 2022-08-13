/// <reference types="cypress"/>

describe('Cadastro de usuários', () => {
    beforeEach(() => {
        cy.visit('/signup')
    })

    it('Deve cadastrar um usuário com sucesso', () => {
        const user = {
            name: 'Tiago Lopes',
            email: 'tiagoltavares2002@gmail.com',
            password: 'pwd123'
        }

        cy.task('removeUser', user.email)

        cy.get('input[placeholder=Nome]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(user.email)
        cy.get('input[type=password]').type(user.password)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast', { timeout: 8000 })
            .find('p')
            .should('be.visible')
            .and('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
    })
})