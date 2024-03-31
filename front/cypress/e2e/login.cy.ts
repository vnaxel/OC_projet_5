describe('Login spec', () => {
    it('Login successfull', () => {
      cy.visit('/login')
      cy.get('input[formControlName=email]').type("yoga@studio.com")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
      cy.url().should('include', '/sessions')
    })
  });