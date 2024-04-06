describe('test session creation, update and deletion', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/teacher', { fixture: 'teachers.json' }).as('getTeacher')
        cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('getSessions')
        cy.intercept('POST', '/api/session', {
            body: {
                id: 1,
                name: 'e2e test session yoga name',
                date: '2021-12-12',
                description: 'e2e test session yoga description',
                teacher_id: 1
            },
        }).as('createSession')
        cy.intercept('GET', '/api/session/1', { fixture: 'session_1.json' }).as('getSession')
        cy.intercept('PUT', '/api/session/1', { fixture: 'session_1.json' }).as('updateSession')
        cy.intercept('GET', '/api/teacher/1', { fixture: 'teacher_1.json' }).as('getTeacher')
        cy.intercept('DELETE', '/api/session/1', {
            statusCode: 200
        }).as('deleteSession')
    })

    it('cant create session because a field is empty', () => {
        cy.loginAsAdmin()
        cy.get('button').contains('Create').click()
        cy.get('input').first().focus()
        cy.get('input').eq(1).focus()
        cy.get('input').first().should('have.class', 'ng-invalid')
        cy.url().should('include', '/sessions/create')
        cy.get('button').contains('Save').parent().should('be.disabled')
        cy.visit('/sessions')
    })

    it('create a session', () => {
        cy.loginAsAdmin()
        cy.get('button').contains('Create').click()
    
        cy.url().should('include', '/sessions/create')
        cy.get('input').first().type('e2e test session yoga name')
        cy.get('input').eq(1).type('2021-12-12')
        cy.get('mat-select[formControlName="teacher_id"]').click();
        cy.get('mat-option').should('have.length.gt', 0).first().click();
        cy.get('textarea').type('e2e test session yoga description')
        cy.get('button').contains('Save').click()
        cy.url().should('include', '/sessions')
        cy.get('snack-bar-container').should('contain', 'Session created !')
    })

    it('cant update session because a field is empty', () => {
        cy.loginAsAdmin()
        cy.get(':nth-child(1) > .mat-card-actions > .ng-star-inserted').click()
        cy.get('input').first().clear()
        cy.get('input').eq(1).clear()
        cy.get('input').first().focus()
        cy.get('input').eq(1).focus()
        cy.get('input').first().should('have.class', 'ng-invalid')
        cy.url().should('include', '/sessions/update')
        cy.get('button').contains('Save').parent().should('be.disabled')
        cy.visit('/sessions')
    })

    it('update a session', () => {
        cy.loginAsAdmin()
        cy.get(':nth-child(1) > .mat-card-actions > .ng-star-inserted').click()
        cy.url().should('include', '/sessions/update')
        cy.get('input').first().clear().type('e2e test session yoga name updated')
        cy.get('input').eq(1).clear().type('2021-12-13')
        cy.get('mat-select').click()
        cy.get('mat-option').contains('Marie DURAND').click()
        cy.get('textarea').clear().type('e2e test session yoga description updated')
        cy.get('button').contains('Save').click()
        cy.url().should('include', '/sessions')
        cy.get('snack-bar-container').should('contain', 'Session updated !')

    })

    it('delete a session', () => {
        cy.url().should('include', '/sessions')
        cy.get(':nth-child(1) > .mat-card-actions > :nth-child(1)').click()
        cy.get('[fxlayoutalign="space-between center"] > :nth-child(2) > .mat-focus-indicator').click()
        cy.url().should('include', '/sessions')
        cy.get('snack-bar-container').should('contain', 'Session deleted !')
    })
})