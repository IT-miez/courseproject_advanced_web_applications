describe('template spec', () => {
  it('passes', () => {
    // CHECK IF LOGOUT BUTTON EXISTS
    // (SHOULD WHEN LOGON)

    cy.visit('localhost:3000/login');
    cy.get('#email').click().type('testisahkoposti@email.com');
    cy.get('#password').click().type('testiSalasana123.');
    cy.get('#submit').click();
    cy.get('.logoutButton').should('exist');
  });
});
