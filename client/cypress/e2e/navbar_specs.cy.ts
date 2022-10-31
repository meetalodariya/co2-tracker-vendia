describe('Navbar', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ token: '234223415n' }),
    );
  });

  it('should log the user out after clicking on logout', () => {
    cy.visit('/');

    cy.get('[data-testid="account-profile"]').click();

    cy.get('[data-testid="nav-logout-button"]').click();

    cy.location().should((doc) => {
      expect(doc.pathname).to.eq('/login');
    });
  });
});
