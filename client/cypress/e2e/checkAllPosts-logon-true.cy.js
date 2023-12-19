describe('template spec', () => {
  it('passes', () => {
    // LOGIN FIRST
    cy.visit('localhost:3000/login');
    cy.get('#email').click().type('testisahkoposti@email.com');
    cy.get('#password').click().type('testiSalasana123.');
    cy.get('#submit').click();

    // THEN GO TO ALL POSTS PAGE
    // ADD POST FORM SHOULD BE VISIBLE
    cy.get('#postTitle').should('be.visible');
  });
});
