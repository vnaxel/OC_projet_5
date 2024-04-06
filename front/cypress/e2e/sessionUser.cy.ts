import { User } from "src/app/interfaces/user.interface"

describe('user routes', () => {
    beforeEach(() => {
        let users: number[] = []
        cy.intercept('GET', '/api/teacher', { fixture: 'teachers.json' }).as('getTeacher')
        cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('getSessions')
        cy.intercept('GET', '/api/session/1', (req) => {
            req.reply(JSON.stringify({
                id: 1,
                name: 'e2e test session yoga name',
                date: '2021-12-12',
                description: 'e2e test session yoga description',
                teacher_id: 1,
                users: users
            })
            )
        }
        ).as('getSession')
        cy.intercept('POST', '/api/session/1/participate/1', (req) => {
            users.push(1)
            req.reply(200)
        }).as('participateSession')
        cy.intercept('GET', '/api/teacher/1', { fixture: 'teacher_1.json' }).as('getTeacher')
        cy.intercept('DELETE', '/api/session/1/participate/1', (req) => {
            users.pop()
            req.reply(200)
        }).as('unParticipateSession')
    })


    it('user can not create a session', () => {
        cy.loginAsUser()
        cy.get('button').should('not.contain', 'Create')
    })

    it('user can not update a session', () => {
        cy.loginAsUser()
        cy.get('button').should('not.contain', 'Edit')
    })

    it('user can not delete a session', () => {
        cy.loginAsUser()
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('button').should('not.contain', 'Delete')
        cy.get('button').should('contain', 'Participate')
    })

    it('user can subscribe to a session', () => {
        cy.loginAsUser()
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('button').contains('Participate').click()
        cy.get('.ml1').should('contain', '1 attendees')
    })

    it('user can unsubscribe to a session', () => {
        cy.loginAsUser()
        cy.get('mat-card').get('button').contains('Detail').click()
        cy.get('button').contains('Participate').click()
        cy.get('.ml1').should('contain', '1 attendees')
        cy.get('button').contains('Do not participate').click()
        cy.get('.ml1').should('contain', '0 attendees')
    })
})