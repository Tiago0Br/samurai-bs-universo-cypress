import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        cy.get(el.toast, { timeout: 8000 })
            .should('have.css', 'opacity', '1')
            .find('p')
            .should('be.visible')
            .and('include.text', expectText)
    }
}

export default new Toast