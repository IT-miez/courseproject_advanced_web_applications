describe('template spec', () => {
    it('passes', () => {
        cy.visit("localhost:3000/posts")
        cy.get(".profilePageButton").should("not.exist")
    })
  })
