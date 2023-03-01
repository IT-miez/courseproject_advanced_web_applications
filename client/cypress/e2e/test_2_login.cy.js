describe('template spec', () => {
    it('passes', () => {
      cy.visit('localhost:3000/login')
      cy.get("#email").click().type("testisahkoposti@email.com")
      cy.get("#password").click().type("testiSalasana123.")
      cy.get("#submit").click()
    })
  })
