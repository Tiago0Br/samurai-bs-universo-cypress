/// <reference types="cypress"/>

const user = {
    name: 'Tiago Lopes',
    email: 'tiagoltavares2002@gmail.com',
    password: 'pwd123'
}

describe('Cadastro de usuários', () => {
    beforeEach(() => {
        cy.visit('/signup')
    })

    it('Deve cadastrar um usuário com sucesso', () => {
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

    it('Deve exibir um erro ao tentar cadastrar um usuário com e-mail repetido', () => {
        cy.get('input[placeholder=Nome]').type(user.name)
        cy.get('input[placeholder="E-mail"]').type(user.email)
        cy.get('input[type=password]').type(user.password)

        cy.contains('button', 'Cadastrar').click()

        cy.get('.toast', { timeout: 8000 })
            .find('p')
            .should('be.visible')
            .and('have.text', 'Email já cadastrado para outro usuário.')
    })
})