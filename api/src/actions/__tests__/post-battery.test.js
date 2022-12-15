const { default: HttpError } = require('../../exceptions/http-error');
const { addBatteryController } = require('../post-battery');

describe('Add batteries controller', () => {
  test('should return correct records', async () => {
    const addBattriesMock = jest.fn();
    const resJsonMock = jest.fn();
    addBattriesMock.mockResolvedValue();

    const vendiaClient = {
      entities: { battery: { add: addBattriesMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        partNumber: '234jmasodifm',
        serialNumber: 'BTR-234',
        imageURL:
          'https://www.batteriesplus.com/globalassets/card-blocks/images/products-400x400/x2power-auto-battery.jpg',
        co2: [],
        dateManufactured: '2022-10-11',
        salesPrice: 18,
      },
    };

    const res = {
      json: resJsonMock,
    };

    await addBatteryController(req, res, () => undefined);
    expect(addBattriesMock.mock.calls[0][0]).toStrictEqual({
      partNumber: '234jmasodifm',
      serialNumber: 'BTR-234',
      imageURL:
        'https://www.batteriesplus.com/globalassets/card-blocks/images/products-400x400/x2power-auto-battery.jpg',
      co2: [],
      dateManufactured: '2022-10-11',
      salesPrice: 18,
    });
    expect(res.json.mock.calls[0][0]).toStrictEqual({ msg: 'Success' });
  });

  test('should return error when query to vendia fails', async () => {
    const addBattriesMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    addBattriesMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { battery: { add: addBattriesMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        partNumber: '234jmasodifm',
        serialNumber: 'BTR-234',
        imageURL:
          'https://www.batteriesplus.com/globalassets/card-blocks/images/products-400x400/x2power-auto-battery.jpg',
        co2: [],
        dateManufactured: '2022-10-11',
        salesPrice: 18,
      },
    };

    const res = {
      json: resJsonMock,
    };

    await addBatteryController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
