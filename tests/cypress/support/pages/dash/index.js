class DashPage {
    userLoggedIn(username) {
        cy.get('a[href="/profile"]')
            .should('be.visible')
            .and('have.text', username)
    }
}

export default new DashPage()