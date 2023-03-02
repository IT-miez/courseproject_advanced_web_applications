describe('template spec', () => {
    it('passes', () => {

        // CHECK IF PROFILE PAGE BUTTON EXISTS (SHOULD NOT WHEN NOT LOGON)

        cy.visit("localhost:3000/posts")
        cy.get(".profilePageButton").should("not.exist")
    })
  })
