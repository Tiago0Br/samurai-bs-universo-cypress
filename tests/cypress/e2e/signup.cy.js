/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Cadastro de usuários', () => {
    beforeEach(() => {
        cy.visit('/signup')
    })

    it('Deve cadastrar um usuário com sucesso', () => {
        const user = {
            name: 'Tiago Lopes',
            email: faker.internet.email(),
            password: 'pwd123'
        }

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