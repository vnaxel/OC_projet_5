describe('create session', () => {
    beforeEach(() => {
        cy.login('yoga@studio.com', 'test!1234')
    })

    it('create a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').first().click()
        cy.url().should('include', '/sessions/create')
        cy.get('input').first().type('e2e test session yoga name')
        cy.get('input').eq(1).type('2021-12-12')
        // selection mat-select
        cy.get('mat-select').click()
        cy.get('mat-option').contains('Margot DELAHAYE').click()
        cy.get('textarea').type('e2e test session yoga description')
        cy.get('button').contains('Save').click()
        cy.url().should('include', '/sessions')
        cy.get('mat-card-title').should('contain', 'e2e test session yoga name')
    })
})