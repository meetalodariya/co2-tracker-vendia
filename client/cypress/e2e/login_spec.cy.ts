describe('login page', () => {
  it('renders the login page', () => {
    cy.visit('/login');

    cy.get('[data-testid="login-container"]').should('exist');
  });

  it('should display error message if inputs are empty', () => {
    cy.visit('/login');

    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="error-message"]')
      .should('exist')
      .should('have.text', 'Invalid inputs!');
  });

  it('should redirect to dashboard landing page upon successful login', () => {
    cy.intercept('/user/signin', { token: 'asidfm2i34' }).as('postSignin');

    cy.visit('/login');

    cy.get('[data-testid="username-textfield"]').type('userxyz');

    cy.get('[data-testid="password-textfield"]').type('passwrd');

    cy.get('[data-testid="submit-button"]').click();

    cy.wait('@postSignin')
      .its('request.body')
      .should('include', { username: 'userxyz', password: 'passwrd' });

    cy.location().should((doc) => {
      expect(doc.pathname).to.eq('/');
    });
  });
});
