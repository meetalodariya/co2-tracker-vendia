const { default: HttpError } = require('../../exceptions/http-error');
const { addHptController } = require('../post-hpt');

describe('Add HPT controller', () => {
  test('should call add method with correct fields', async () => {
    const addHPTMock = jest.fn();
    const resJsonMock = jest.fn();
    addHPTMock.mockResolvedValue();

    const vendiaClient = {
      entities: { hornetPowerTools: { add: addHPTMock } },
    };

    const req = {
      app: {
        locals: {
          vendiaClient,
        },
      },
      body: {
        toolType: 'drill',
        serialNumber: '32hvaso2',
        imageURL:
          'https://cdn.thewirecutter.com/wp-content/media/2020/12/powerdrills-2048px-0818.jpg',
        components: [
          {
            type: 'motor',
            serialNumber: 'PMcQLNWf',
            co2: 1500,
          },
          {
            type: 'battery',
            serialNumber: 'ogcmYbNn',
            co2: 900,
          },
        ],
        transport: {
          transportationMethod: 'ground',
          trackingId: '4gedrgq2',
          co2: 342422,
        },
      },
    };

    const res = {
      json: resJsonMock,
    };

    await addHptController(req, res, () => undefined);
    expect(addHPTMock.mock.calls[0][0]).toStrictEqual({
      toolType: 'drill',
      serialNumber: '32hvaso2',
      imageURL:
        'https://cdn.thewirecutter.com/wp-content/media/2020/12/powerdrills-2048px-0818.jpg',
      components: [
        {
          type: 'motor',
          serialNumber: 'PMcQLNWf',
          co2: 1500,
        },
        {
          type: 'battery',
          serialNumber: 'ogcmYbNn',
          co2: 900,
        },
      ],
      transport: {
        transportationMethod: 'ground',
        trackingId: '4gedrgq2',
        co2: 342422,
      },
    });
    expect(res.json.mock.calls[0][0]).toStrictEqual({ msg: 'Success' });
  });

  test('should return error when query to vendia fails', async () => {
    const addHPTMock = jest.fn();
    const nextMock = jest.fn();
    const resJsonMock = jest.fn();
    addHPTMock.mockRejectedValue(new Error('Something went wrong'));

    const vendiaClient = {
      entities: { hornetPowerTools: { add: addHPTMock } },
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

    await addHptController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('Something went wrong'),
    );
  });
});
