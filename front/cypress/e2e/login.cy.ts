describe('Login spec', () => {
    
    it('Login failed', () => {
        cy.visit('/login')
        cy.get('input[formControlName=email]').type("123@failed")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
        cy.get('.error').should('contain', 'An error occurred')
    })

    it('Logout', () => {
        cy.loginAsUser()
        cy.get('span').contains('Logout').click()
        cy.url().should('eq', 'http://localhost:4200/')
    })
    
    it('show error when filed not filled', () => {
        cy.visit('/login')
        cy.get('input[formControlName=email]').focus()
        cy.get('input[formControlName=password]').focus()
        cy.get('input[formControlName=email]').should('have.class', 'ng-invalid')
    })
    
    it('Login successfull', () => {
        cy.loginAsAdmin()
    })

})