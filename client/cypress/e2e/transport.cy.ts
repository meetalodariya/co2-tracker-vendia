describe('Transport page', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ token: '234223415n' }),
    );
  });

  it('renders the page', () => {
    cy.intercept('GET', '/transport', { fixture: 'transport' });

    cy.visit('/components/transport');

    cy.get('[data-testid="transport-container"]').should('exist');
  });

  it('should render details and directions dialog for given transport card', () => {
    cy.intercept('GET', '/transport', { fixture: 'transport' });

    cy.visit('/components/transport');

    cy.get('[data-testid="transport-details-button-0"]').click();
    cy.get('[data-testid="transport-details-dialog"]').should('exist');

    cy.get('[data-testid="transport-details-dialog-close"]').click();

    cy.get('[data-testid="transport-directions-button-0"]').click();
    cy.get('[data-testid="transport-directions-dialog"]').should('exist');
    cy.wait(2000);
    cy.get('[data-testid="transport-directions-dialog-close"]').click();
  });

  it('should display show filter', () => {
    cy.intercept('GET', '/transport**', { fixture: 'transport' }).as(
      'getTransports',
    );
    cy.visit('/components/transport');

    cy.get('[data-testid="show-filter"]').click();
    cy.get('[data-testid="show-filter-ship"]').click();

    cy.get('[data-testid="show-filter"]').click();
    cy.get('[data-testid="show-filter-ground"]').click();
  });

  it('add transport form', () => {
    cy.intercept('GET', '/transport**', { fixture: 'transport' }).as(
      'getTransports',
    );

    cy.visit('/components/transport');

    cy.get('[data-testid="add-transport-button"]').click();
    cy.get('[data-testid="add-transport-dialog"]').should('exist');
    cy.get('[data-testid="add-transport-dialog-close"]').click();
  });
});
