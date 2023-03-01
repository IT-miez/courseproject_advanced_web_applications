describe('template spec', () => {
    it('passes', () => {

      // LOGIN FIRST
      cy.visit('localhost:3000/login')
      cy.get("#email").click().type("testisahkoposti@email.com")
      cy.get("#password").click().type("testiSalasana123.")
      cy.get("#submit").click()

      // THEN GO TO ALL POSTS PAGE
      // THEN GET FIRST FAKE POST WITH A GIVEN ID
      // THEN OPEN IT TO CHECK IF YOU CAN OPEN POSTS
      cy.get("#63f73c747e1e858968099990").click()
    })
  })
