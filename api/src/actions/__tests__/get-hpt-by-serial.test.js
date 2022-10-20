const { default: HttpError } = require('../../exceptions/http-error');
const { getHptBySerialNumber } = require('../get-hpt-by-serial');


const vendiaHPTResponse = {
  items: [
    {
      _id: 'lkasjdifojo',
      _owner: 'asldjfioa123',
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
  ],
};

describe('Get HPT By Serial Number controller', () => {
  test('should return correct record based on provided SN', async () => {
    const testSerialNum = 'i23unuj29f';
    const listHornetPowerToolsMock = jest.fn();
    const resJsonMock = jest.fn();
    listHornetPowerToolsMock.mockResolvedValue(vendiaHPTResponse);

    const vendiaClient = {
      entities: { hornetPowerTools: { list: listHornetPowerToolsMock } },
    };

    const req = {
      params: {
        serialNum: testSerialNum,
      },
      app: {
        locals: {
          vendiaClient,
        },
      },
    };

    const res = {
      json: resJsonMock,
    };

    const result = await getHptBySerialNumber(req, res, () => undefined);

    expect(listHornetPowerToolsMock.mock.calls[0][0]).toStrictEqual({
      filter: {
        serialNumber: {
          eq: testSerialNum,
        },
      },
    });

    // calls = [[hptRecord]];
    expect(res.json.mock.calls[0][0]).toStrictEqual({
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
  });

  test('should return error when there is no record with given SN', async () => {
    const testSerialNum = 'i23unuj29f';
    const listHornetPowerToolsMock = jest.fn();
    const resJsonMock = jest.fn();
    const nextMock = jest.fn();
    listHornetPowerToolsMock.mockResolvedValue({ items: [] });

    const vendiaClient = {
      entities: { hornetPowerTools: { list: listHornetPowerToolsMock } },
    };

    const req = {
      params: {
        serialNum: testSerialNum,
      },
      app: {
        locals: {
          vendiaClient,
        },
      },
    };

    const res = {
      json: resJsonMock,
    };
    const next = nextMock;

    await getHptBySerialNumber(req, res, next);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('record not found', 404),
    );
  });
});
