describe('template spec', () => {
  it('passes', () => {
    // GO TO POSTS PAGE
    // GO TO FIRST POST
    // CHECK IF COMMENT FORM EXISTS

    cy.visit('localhost:3000/posts');
    cy.contains('Open post').click();
    cy.get('#comment').should('not.exist');
  });
});
