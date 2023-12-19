describe('template spec', () => {
  it('passes', () => {
    // FIRST LOGIN
    cy.visit('localhost:3000/login');
    cy.get('#email').click().type('testisahkoposti@email.com');
    cy.get('#password').click().type('testiSalasana123.');
    cy.get('#submit').click();

    // GO TO POSTS PAGE
    // OPEN A POST
    // COMMENT THE POST

    cy.contains('Open post').click();
    cy.get('#comment').click().type('test comment made with cypress');
    cy.get('#submit').click();
  });
});
