describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000/posts');

    // CHECK IF YOU CAN OPEN A POST
    cy.contains('Open post').click();
  });
});
