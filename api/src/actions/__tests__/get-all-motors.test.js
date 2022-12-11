const { default: HttpError } = require('../../exceptions/http-error');
const { getAllMotorsController } = require('../get-all-motors');

const vendiaHPTResponse = {
  items: [
    {
      _id: '01842c0a-f050-341b-99ac-87aed50c411e',
      _owner: 'node-1',
      partNumber: 'test-data',
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
  ],
};

describe('Get All motors controller', () => {
  test('should return correct records', async () => {
    const listAllBattriesMock = jest.fn();
    const resJsonMock = jest.fn();
    listAllBattriesMock.mockResolvedValue(vendiaHPTResponse);

    const vendiaClient = {
      entities: { motor: { list: listAllBattriesMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
    };

    const res = {
      json: resJsonMock,
    };

    await getAllMotorsController(req, res, () => undefined);

    expect(res.json.mock.calls[0][0]).toStrictEqual(vendiaHPTResponse.items);
  });

  test('should return error when query to vendia fails', async () => {
    const listAllBattriesMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    listAllBattriesMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { motor: { list: listAllBattriesMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
    };

    const res = {
      json: resJsonMock,
    };

    await getAllMotorsController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
