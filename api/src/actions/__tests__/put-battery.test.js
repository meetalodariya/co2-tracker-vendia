const { default: HttpError } = require('../../exceptions/http-error');
const { updateBatteryController } = require('../put-battery');

describe('Update battery controller', () => {
  test('should call update method with correct fields', async () => {
    const updateMotorMock = jest.fn();
    const resJsonMock = jest.fn();
    updateMotorMock.mockResolvedValue();

    const vendiaClient = {
      entities: { battery: { update: updateMotorMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        _id: '12345',
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

    await updateBatteryController(req, res, () => undefined);
    expect(updateMotorMock.mock.calls[0][0]).toStrictEqual({
      _id: '12345',
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
    const putMotorMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    putMotorMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { battery: { update: putMotorMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        _id: '12345',
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

    await updateBatteryController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
