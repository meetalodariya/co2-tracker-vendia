describe('Dashboard landing page', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ token: '234223415n' }),
    );
  });

  it('renders the login page', () => {
    cy.visit('/');

    cy.get('[data-testid="dashboard-container"]').should('exist');
  });

  it('renders the results after fetching data from backend', () => {
    cy.intercept('/hpt/fasd234', {
      toolType: 'vacuum cleaner',
      serialNumber: 'asfs23',
      imageURL:
        'https://images.philips.com/is/image/philipsconsumer/4514d44a7c684b94bf2fad13010a37b9?$jpglarge$&wid=1250',
      components: [
        {
          type: 'motor',
          serialNumber: 'PMcQLNWf',
          co2: 31233,
        },
        {
          type: 'battery',
          serialNumber: 'ogcmYbNn',
          co2: 421234,
        },
      ],
      transport: {
        transportationMethod: 'ground',
        trackingId: '4gedrgq2',
        co2: 523344,
      },
    }).as('getHPTbySN');

    cy.visit('/');

    cy.get('[data-testid="hpt-sn-input"]').type('fasd234{enter}');

    cy.get('[data-testid="hpt-details-card"]').should('exist');
    cy.get('[data-testid="card-expand-more"]').click();

    cy.contains('CO2 breakdown:').should('exist');
  });

  it('renders the error message when no results are found', () => {
    cy.intercept('/hpt/fasd234', {
      toolType: 'vacuum cleaner',
      serialNumber: 'asfs23',
      imageURL:
        'https://images.philips.com/is/image/philipsconsumer/4514d44a7c684b94bf2fad13010a37b9?$jpglarge$&wid=1250',
      components: [
        {
          type: 'motor',
          serialNumber: 'PMcQLNWf',
          co2: 31233,
        },
        {
          type: 'battery',
          serialNumber: 'ogcmYbNn',
          co2: 421234,
        },
      ],
      transport: {
        transportationMethod: 'ground',
        trackingId: '4gedrgq2',
        co2: 523344,
      },
    }).as('getHPTbySN');

    cy.intercept('GET', '/hpt/fasd234', {
      statusCode: 404,
    });

    cy.visit('/');
    cy.get('[data-testid="hpt-sn-input"]').type('fasd234{enter}');

    cy.contains('No results found!').should('exist');
  });
});
