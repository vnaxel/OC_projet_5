describe('create session', () => {
    beforeEach(() => {
        cy.login('test@test.com', 'test!1234')
    })

    it('user can not create a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').should('not.contain', 'Create')
    })

    it('user can not update a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').should('not.contain', 'Edit')
    })

    it('user can not delete a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('button').should('not.contain', 'Delete')
    })

    it('user can subscribe to a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('button').contains('Participate').click()
        cy.get('.ml1').should('contain', '1 attendees')
    })

    it('user can unsubscribe to a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('.ml1').should('contain', '1 attendees')
        cy.get('button').contains('Do not participate').click()
        cy.get('.ml1').should('contain', '0 attendees')
    })
})