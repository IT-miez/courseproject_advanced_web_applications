describe('template spec', () => {
    it('passes', () => {


      cy.visit('localhost:3000/posts')
      
      // CHECK IF FORM EXIST FOR ADDING DATA
      // SHOULD NOT EXIST WHEN NOT LOGGED IN
      
      cy.get("#postTitle").should("not.exist")
      cy.get("#code").should("not.exist")
    })
  })
