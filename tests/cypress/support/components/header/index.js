import { el } from './elements'

class Header {
    userLoggedIn(username) {
        cy.get(el.fullName)
            .should('be.visible')
            .and('have.text', username)
    }
}

export default new Header()