describe('create session', () => {
    beforeEach(() => {
        cy.login('yoga@studio.com', 'test!1234')
    })

    it('cant create session because a field is empty', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').contains('Create').click()
        cy.get('input').first().focus()
        cy.get('input').eq(1).focus()
        cy.get('input').first().should('have.class', 'ng-invalid')
        cy.url().should('include', '/sessions/create')
        cy.get('button').contains('Save').parent().should('be.disabled')
    })

    it('create a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').first().click()
        cy.url().should('include', '/sessions/create')
        cy.get('input').first().type('e2e test session yoga name')
        cy.get('input').eq(1).type('2021-12-12')
        // selection mat-select
        cy.get('mat-select').click()
        cy.get('mat-option').contains('DELAHAYE').click()
        cy.get('textarea').type('e2e test session yoga description')
        cy.get('button').contains('Save').click()
        cy.url().should('include', '/sessions')
        cy.get('mat-card-title').should('contain', 'e2e test session yoga name')
    })

    it('cant update session because a field is empty', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').contains('Edit').click()
        cy.url().should('include', '/sessions/update')
        cy.get('input').first().clear()
        cy.get('input').eq(1).clear()
        cy.get('input').first().focus()
        cy.get('input').eq(1).focus()
        cy.get('input').first().should('have.class', 'ng-invalid')
        cy.url().should('include', '/sessions/update')
        cy.get('button').contains('Save').parent().should('be.disabled')
    })

    it('update a session', () => {
        cy.url().should('include', '/sessions')
        cy.get('button').contains('Edit').click()
        cy.url().should('include', '/sessions/update')
        cy.get('input').first().clear().type('e2e test session yoga name updated')
        cy.get('input').eq(1).clear().type('2021-12-13')
        cy.get('mat-select').click()
        cy.get('mat-option').contains('THIERCELIN').click()
        cy.get('textarea').clear().type('e2e test session yoga description updated')
        cy.get('button').contains('Save').click()
        cy.url().should('include', '/sessions')
        cy.get('mat-card-title').should('contain', 'e2e test session yoga name updated')
    })

    it('delete the just created session session', () => {
        cy.url().should('include', '/sessions')
        // recuperer la card qui contient le titre de la session et cliquer sur le bouton detail
        cy.get('mat-card-title').contains('e2e test session yoga name updated').parent().parent().parent().find('button').contains('Detail').click()

        cy.get('button').contains('Delete').click()
        cy.url().should('include', '/sessions')
        cy.get('mat-card-title').should('not.contain', 'e2e test session yoga name updated')
    })
})