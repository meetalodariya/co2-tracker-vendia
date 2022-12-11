const { default: HttpError } = require('../../exceptions/http-error');
const { getAllTransportsController } = require('../get-all-transport');

const vendiaTransportResponse = {
  items: [
    {
      _id: '01845b34-2261-dc97-3199-4d04cd3bf1eb',
      _owner: 'node-1',
      transportationMethod: 'ground',
      trackingId: '652f52ec-5313-4eb3-8f67-64bd50032ff1',
      vehicleId: 'DJS-234',
      shipmentId: 'myshipment-123',
      imageURL:
        'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJ1Y2t8ZW58MHx8MHx8&w=1000&q=80',
      distance: 4537512,
      co2: 322,
      duration: 151540,
      charge: 12,
      origin: {
        name: 'New York University',
        lat: 40.72951339999999,
        lng: -73.9964609,
      },
      destination: {
        name: 'California State University, Sacramento',
        lat: 38.5584611,
        lng: -121.4218188,
      },
      dateShipped: '2022-11-09',
      dateArrived: '2022-11-09',
      bill: '33833 USD',
    },
    {
      _id: '01845b34-9bed-1d89-9604-c7c344a25d7c',
      _owner: 'node-1',
      transportationMethod: 'ship',
      trackingId: '09d3008a-9366-4aa6-8762-25b3dc711dc7',
      vehicleId: 'fasd',
      shipmentId: 'myshipment-123',
      imageURL:
        'https://media.istockphoto.com/id/1353544730/photo/container-ship-in-import-export-global-business-worldwide-logistic-and-transportation.jpg?b=1&s=170667a&w=0&k=20&c=NWhHcIbnxXMjKRnnordwe6TLZZszL3rbPL5Kew9j9jo=',
      distance: 11768466.2,
      co2: 212,
      duration: 752091,
      charge: 11,
      origin: {
        name: 'Embarcadero, San Francisco, US',
        lat: 37.772,
        lng: -122.214,
      },
      destination: {
        name: 'Brisbane Port, Australia',
        lat: -27.467,
        lng: 153.027,
      },
      dateShipped: '2022-11-09',
      dateArrived: '2022-11-09',
      bill: '80438 USD',
    },
    {
      _id: '01845b39-0f4d-1120-6c71-05ce15aa8c4b',
      _owner: 'node-1',
      transportationMethod: 'ship',
      trackingId: 'c7397954-2bcb-4e60-9061-43d781c63036',
      vehicleId: 'fasd',
      shipmentId: 'asdf',
      imageURL:
        'https://img.freepik.com/premium-photo/aerial-side-view-cargo-ship-carrying-container-running-export-goods-from-cargo-yard-port-other-ocean-concept-freight-shipping-ship_33850-697.jpg',
      distance: 824824.07,
      co2: 4324,
      duration: 52663,
      charge: 233,
      origin: { name: 'Florida, US', lat: 26.7153, lng: -80.0534 },
      destination: {
        name: 'Southport, North Carolina',
        lat: 33.914584,
        lng: -78.020557,
      },
      dateShipped: '2022-11-09',
      dateArrived: '2022-11-09',
      bill: '119417 USD',
    },
  ],
};

describe('Get All transports controller', () => {
  test('should return correct records', async () => {
    const listAllTransportsMock = jest.fn();
    const resJsonMock = jest.fn();
    listAllTransportsMock.mockResolvedValue(vendiaTransportResponse);

    const vendiaClient = {
      entities: { transportation: { list: listAllTransportsMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      query: {
        show: 'ship',
      },
    };

    const res = {
      json: resJsonMock,
    };

    await getAllTransportsController(req, res, () => undefined);
    expect(listAllTransportsMock.mock.calls[0][0]).toStrictEqual({
      filter: { transportationMethod: { eq: 'ship' } },
    });

    expect(res.json.mock.calls[0][0]).toStrictEqual(
      vendiaTransportResponse.items,
    );
  });

  test('should return error when query to vendia fails', async () => {
    const listAllTransportsMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    listAllTransportsMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { transportation: { list: listAllTransportsMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      query: {},
    };

    const res = {
      json: resJsonMock,
    };

    await getAllTransportsController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
