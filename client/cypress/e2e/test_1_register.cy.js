describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000/register')
    cy.get("#email").click().type("testisahkoposti@email.com")
    cy.get("#password").click().type("testiSalasana123.")
    cy.get("#bio").click().type("Cypress test bio short text.")
    cy.get("#submit").click()
  })
})