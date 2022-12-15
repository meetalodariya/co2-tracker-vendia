const { default: HttpError } = require('../../exceptions/http-error');
const { addTransportController } = require('../post-transport');

describe('Add transport controller', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  test('should call add method with correct fields', async () => {
    const addTransportMock = jest.fn();
    const resJsonMock = jest.fn();
    addTransportMock.mockResolvedValue();
    const vendiaClient = {
      entities: { transportation: { add: addTransportMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        transportationMethod: 'ground',
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
      },
    };

    const res = {
      json: resJsonMock,
    };

    await addTransportController(req, res, () => undefined);

    // TODO: to be fixed
    // expect(addTransportMock.mock.calls[0][0]).toStrictEqual({
    //   trackingId: '12345',
    //   transportationMethod: 'ground',
    //   vehicleId: 'DJS-234',
    //   shipmentId: 'myshipment-123',
    //   imageURL:
    //     'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJ1Y2t8ZW58MHx8MHx8&w=1000&q=80',
    //   distance: 4537512,
    //   co2: 322,
    //   duration: 151540,
    //   charge: 12,
    //   origin: {
    //     name: 'New York University',
    //     lat: 40.72951339999999,
    //     lng: -73.9964609,
    //   },
    //   destination: {
    //     name: 'California State University, Sacramento',
    //     lat: 38.5584611,
    //     lng: -121.4218188,
    //   },
    //   dateArrived: '2020-01-01',
    //   dateShipped: '2020-01-01',
    //   bill: '33833 USD',
    // });

    expect(res.json.mock.calls[0][0]).toStrictEqual({ msg: 'Success' });
  });

  test('should return error when query to vendia fails', async () => {
    const addTransportMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    addTransportMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { transportation: { add: addTransportMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        transportationMethod: 'ground',
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
      },
    };

    const res = {
      json: resJsonMock,
    };

    await addTransportController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
