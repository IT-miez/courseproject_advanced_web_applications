describe('template spec', () => {
  it('passes', () => {

    // LOGIN FIRST
    cy.visit('localhost:3000/login')
    cy.get("#email").click().type("testisahkoposti@email.com")
    cy.get("#password").click().type("testiSalasana123.")
    cy.get("#submit").click()

    // THEN GO TO ALL POSTS PAGE
    // ADD COMMENT FORM SHOULD NOT BE VISIBLE
    cy.get("#postTitle").click().type("Test post added by cypress test")
    cy.get("#code").click().type("let number = 5; \n console.log(number)")
    cy.get(".submitbutton").click()
    cy.visit("localhost:3000/posts")
    cy.contains("Test post added by cypress test")
  })
})
