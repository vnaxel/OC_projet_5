/// <reference types="cypress" />
export { };
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    namespace Cypress {
        interface Chainable {
            loginAsAdmin(): Chainable<void>
            loginAsUser(): Chainable<void>
        }
    }
}

Cypress.Commands.add('loginAsAdmin', () => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', {
        body: {
            id: 1,
            username: 'admin',
            firstName: 'admin',
            lastName: 'admin',
            admin: true
        },
    })
    cy.get('input[formControlName=email]').type("admin")
    cy.get('input[formControlName=password]').type(`admin{enter}{enter}`)
    cy.url().should('include', '/sessions')
})

Cypress.Commands.add('loginAsUser', () => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', {
        body: {
            id: 1,
            username: 'user',
            firstName: 'user',
            lastName: 'user',
            admin: false
        },
    })
    cy.get('input[formControlName=email]').type("user")
    cy.get('input[formControlName=password]').type(`user{enter}{enter}`)
    cy.url().should('include', '/sessions')
})