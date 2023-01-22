/// <reference types="cypress"/>
import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'
import user from '../fixtures/recovery.json'

describe('Recuperação de senha', () => {
    it('Resgate da senha por e-mail', () => {
        cy.postUser(user)

        fpPage.go()
        fpPage.form(user.email)
        fpPage.submit()
        
        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        fpPage.toast.shouldHaveText(message)
    })

    it('Cadastro de um nova senha', () => {
        cy.postUser(user)

        cy.recoveryPass(user.email).then(() => {
            rpPage.go()
            rpPage.form('abc123', 'abc123')
            rpPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(message)
        })
    })
})