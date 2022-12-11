describe('Workbench page', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ token: '234223415n' }),
    );
    cy.intercept('GET', '/transport', { fixture: 'transport' });
    cy.intercept('GET', '/battery', { fixture: 'battery' });
    cy.intercept('GET', '/motor', { fixture: 'motor' });
  });

  it('renders the page', () => {
    cy.visit('/workbench');

    cy.get('[data-testid="workbench-container"]').should('exist');
  });

  it('drag n drop', () => {
    cy.intercept('POST', '**/hpt', {
      statusCode: 200,
      body: { msg: 'Success' },
    }).as('postHPT');

    cy.visit('/workbench');
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="battery-list-button"]').click();

    cy.get('[data-testid="battery-draggable-card"]')
      .first()
      .trigger('dragstart', {
        dataTransfer,
      });

    cy.get('[data-testid="battery-bucket"]').trigger('drop', {
      dataTransfer,
    });
    cy.findAllByText('Summary:').should('exist');
    cy.findAllByText('Total cost:').should('exist');
    cy.findAllByText('900 KgCO2').should('exist');
    cy.findAllByText('$ 208').should('exist');

    cy.get('[data-testid="motor-list-button"]').click();
    cy.get('[data-testid="motor-draggable-card"]')
      .first()
      .trigger('dragstart', {
        dataTransfer,
      });
    cy.get('[data-testid="motor-bucket"]').trigger('drop', {
      dataTransfer,
    });

    cy.findAllByText('$ 416').should('exist');

    cy.get('[data-testid="transport-list-button"]').click();
    cy.get('[data-testid="transport-draggable-card"]')
      .first()
      .trigger('dragstart', {
        dataTransfer,
      });
    cy.get('[data-testid="transport-bucket"]').trigger('drop', {
      dataTransfer,
    });

    cy.findAllByText('$ 34249').should('exist');

    cy.get('[data-testid="create-hpt-button"]').click();

    cy.get('[data-testid="create-hpt-toolType-field"]').type('drill');
    cy.get('[data-testid="create-hpt-serialNumber-field"]').type('HPT-1234');
    cy.get('[data-testid="create-hpt-imageURL-field"]').type(
      'https://example.com/img2.jpg',
    );

    cy.get('[data-testid="create-hpt-submit-button"]').click();
    cy.wait('@postHPT').then((intercept) => {
      expect(intercept.request.body).to.deep.equal({
        components: [
          { type: 'motor', serialNumber: 'MTR-ogcmYbNn', co2: 3232 },
          { type: 'battery', serialNumber: 'ogcmYbNn', co2: 900 },
        ],
        imageURL: 'https://example.com/img2.jpg',
        toolType: 'drill',
        serialNumber: 'HPT-1234',
        transport: {
          transportationMethod: 'ground',
          trackingId: '652f52ec-5313-4eb3-8f67-64bd50032ff1',
          co2: 908,
        },
      });
    });
  });
  //   it('should render details and directions dialog for given transport card', () => {
  //     cy.intercept('GET', '/transport', { fixture: 'transport' });

  //     cy.visit('/components/transport');

  //     cy.get('[data-testid="transport-details-button-0"]').click();
  //     cy.get('[data-testid="transport-details-dialog"]').should('exist');

  //     cy.get('[data-testid="transport-details-dialog-close"]').click();

  //     cy.get('[data-testid="transport-directions-button-0"]').click();
  //     cy.get('[data-testid="transport-directions-dialog"]').should('exist');
  //     cy.wait(2000);
  //     cy.get('[data-testid="transport-directions-dialog-close"]').click();
  //   });
});
