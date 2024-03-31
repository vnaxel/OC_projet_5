describe('Register spec', () => {
        
        it('Register failed', () => {
            cy.visit('/register')
            cy.get('input[formControlName=firstName]').type("John")
            cy.get('input[formControlName=lastName]').type("Doe")
            cy.get('input[formControlName=email]').type("yoga@studio.com")
            cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
            cy.get('.error').should('contain', 'An error occurred')
        })
    
        it('show error when filed not filled', () => {
            cy.visit('/register')
            cy.get('input[formControlName=email]').focus()
            cy.get('input[formControlName=password]').focus()
            cy.get('input[formControlName=email]').should('have.class', 'ng-invalid')
        })
        
        it('Register successfull', () => {
            cy.visit('/register')
            cy.get('input[formControlName=firstName]').type("John")
            cy.get('input[formControlName=lastName]').type("Doe")
            cy.get('input[formControlName=email]').type("userTest@email.com")
            cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}`)
            cy.url().should('include', '/login')
            cy.get('input[formControlName=email]').type("userTest@email.com")
            cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
            cy.url().should('include', '/sessions')
        })

        it('show the user information', () => {
            cy.login('userTest@email.com', 'test!1234')
            cy.url().should('include', '/sessions')
            cy.get('span').contains('Account').click()
            cy.url().should('include', '/me')
            cy.get('p').first().should('contain', 'Name: John DOE')
            cy.get('p').eq(1).should('contain', 'Email: userTest@email.com')
        })

        it('Delete Account just created', () => {
            cy.login('userTest@email.com', 'test!1234')
            cy.url().should('include', '/sessions')
            cy.get('span').contains('Account').click()
            cy.get('button').contains('Detail').click() //Delete the account (the button got weird content, but it's the delete button)
            cy.url().should('eq', 'http://localhost:4200/')
        })

    })

