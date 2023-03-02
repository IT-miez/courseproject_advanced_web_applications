describe('template spec', () => {
    it('passes', () => {

      // LOGIN FIRST

      cy.visit('localhost:3000/login')
      cy.get("#email").click().type("testisahkoposti@email.com")
      cy.get("#password").click().type("testiSalasana123.")
      cy.get("#submit").click()

      // GO TO POSTS SITE
      // ADD A POST
      
      cy.get("#postTitle").click().type("Test post")
      cy.get("#code").click().type("console.log(5)")
      cy.get(".submitbutton").click()
      cy.visit("localhost:3000/posts")
      cy.contains("console.log(5)")
    })
  })
