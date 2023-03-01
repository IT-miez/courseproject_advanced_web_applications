describe('template spec', () => {
    it('passes', () => {

      // DONT LOGIN AT ALL

      // THEN GO TO ALL POSTS PAGE
      // ADD POST FORM SHOULD NOT BE VISIBLE
      cy.visit("localhost:3000/posts")
      cy.get("#postTitle").should("not.exist")
    })
  })
