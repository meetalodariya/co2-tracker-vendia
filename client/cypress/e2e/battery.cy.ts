const batteries = [
  {
    _id: '01842c0a-f050-341b-99ac-87aed50c411e',
    _owner: 'node-1',
    partNumber: '222434fasd',
    serialNumber: 'ogcmYbNn',
    imageURL:
      'https://cdn.shopify.com/s/files/1/1550/6951/products/dc9096_11ccc41c-3574-4b51-bd81-14a64c401d5b_600x.jpg?v=1561053467',
    co2: [
      { year: '2015', value: '1400' },
      { year: '2016', value: '1100' },
      { year: '2017', value: '900' },
    ],
    dateManufactured: '2022-09-13',
    costManufactured: 200,
    salesPrice: 208,
  },
  {
    _id: '0184321a-e929-f635-1f87-b50ffe01428f',
    _owner: 'node-1',
    partNumber: 'part-289',
    serialNumber: 'f34f',
    imageURL:
      'https://www.aaa.com/AAA/common/AAR/images/battery-check-thumb.png',
    co2: null,
    dateManufactured: '2022-10-10',
    costManufactured: 324,
    salesPrice: 42341,
  },
  {
    _id: '01843467-a382-5898-9e82-64e040d876c1',
    _owner: 'node-1',
    partNumber: '234jmasodifm',
    serialNumber: 'BTR-234',
    imageURL:
      'https://www.batteriesplus.com/globalassets/card-blocks/images/products-400x400/x2power-auto-battery.jpg',
    co2: [],
    dateManufactured: '2022-10-11',
    costManufactured: null,
    salesPrice: 18,
  },
  {
    _id: '0184346d-572e-6df2-35bb-2d96c353dc11',
    _owner: 'node-1',
    partNumber: '234mk',
    serialNumber: 'Jslm',
    imageURL:
      'https://cdn.shopify.com/s/files/1/2702/9014/products/P1000131_2232_480x480.jpg?v=1662660867',
    co2: [],
    dateManufactured: '2022-11-07',
    costManufactured: null,
    salesPrice: 7,
  },
];

describe('Battery page', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ token: '234223415n' }),
    );
  });

  it('renders the page', () => {
    cy.intercept('/battery', batteries).as('getBatteries');

    cy.visit('/components/battery');

    cy.get('[data-testid="battery-update-table"]').should('exist');
  });

  it('renders the results on the screen', () => {
    cy.intercept('/battery', batteries).as('getBatteries');
    cy.visit('/components/battery');

    cy.get('[data-testid="battery-row"]')
      .first()
      .should('exist')
      .should('have.text', '222434fasd');
  });

  it('opens up add battery dialog after clicking on add button', () => {
    cy.intercept('/battery', batteries).as('getBatteries');
    cy.visit('/components/battery');

    cy.get('[data-testid="add-battery-button"]').click();

    cy.get('[data-testid="add-battery-dialog"]').should('be.visible');
  });

  it('sends the correct form data after submission', () => {
    cy.intercept('GET', '/battery', { fixture: 'battery' });
    cy.intercept('POST', '**/battery', {
      statusCode: 200,
      body: { msg: 'Success' },
    }).as('postBatteries');

    cy.visit('/components/battery');

    cy.get('[data-testid="add-battery-button"]').click();

    cy.get('[data-testid="add-battery-serialNumber-field"]').type('BTR-62345');
    cy.get('[data-testid="add-battery-partNumber-field"]').type('lkmq3245');
    cy.get('[data-testid="add-battery-imageURL-field"]').type('test');
    cy.get('[data-testid="add-battery-salesPrice-field"]').type('234');
    cy.get('[data-testid="add-battery-submit-button"]').click();

    cy.wait('@postBatteries').then((intercept) => {
      expect(intercept.request.body).to.deep.equal({
        serialNumber: 'BTR-62345',
        partNumber: 'lkmq3245',
        imageURL: 'test',
        salesPrice: 234,
        dateManufactured: new Date().toISOString().split('T')[0],
      });
    });
  });

  it('sends the correct update form data after submission', () => {
    cy.intercept('GET', '/battery', { fixture: 'battery' });
    cy.intercept('PUT', '**/battery', {
      statusCode: 200,
      body: { msg: 'Success' },
    }).as('putBattery');

    cy.visit('/components/battery');

    cy.get('[data-testid="edit-battery-button"]').first().click();

    cy.get('[data-testid="update-battery-partNumber-field"]')
      .clear()
      .type('lkmq3245');
    cy.get('[data-testid="update-battery-imageURL-field"]')
      .clear()
      .type('test');
    cy.get('[data-testid="update-battery-salesPrice-field"]')
      .clear()
      .type('234');
    cy.get('[data-testid="update-battery-submit-button"]').click();

    cy.wait('@putBattery').then((intercept) => {
      expect(intercept.request.body).to.deep.equal({
        _id: '01842c0a-f050-341b-99ac-87aed50c411e',
        _owner: 'node-1',
        co2: [
          { year: '2015', value: '1400' },
          { year: '2016', value: '1100' },
          { year: '2017', value: '900' },
        ],
        serialNumber: 'ogcmYbNn',
        partNumber: 'lkmq3245',
        imageURL: 'test',
        costManufactured: 200,
        salesPrice: 2340,
        dateManufactured: '2022-09-13',
      });
    });
  });
});
