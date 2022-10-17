const { createVendiaClient } = require('@vendia/client');

const client = createVendiaClient({
  apiUrl:
    process.env.VENDIA_GRAPHQL_URL ||
    'https://4up3f6n7i4.execute-api.us-west-2.amazonaws.com/graphql',
  websocketUrl:
    process.env.VENDIA_GRAPHQL_WEBSOCKET_URL ||
    'wss://1j07jg5k8k.execute-api.us-west-2.amazonaws.com/graphql',
  apiKey:
    process.env.VENDIA_API_KEY ||
    'A6wEjAzKprLonR797yA8P2DgNW6Do2xMgY6BSfSdnGSU',
});

const motor = {
  partNumber: '12',
  serialNumber: 'PMcQLNWf',
  imageURL: 'https://m.media-amazon.com/images/I/41ZXA+E76qL._AC_SY580_.jpg',
  co2: [
    {
      year: '2015',
      value: '2131',
    },
    {
      year: '2016',
      value: '1900',
    },
    {
      year: '2017',
      value: '1500',
    },
  ],
  dateManufactured: '2022-08-22',
  costManufactured: 2312,
  salesPrice: 5000,
};

const battery = {
  partNumber: '22',
  serialNumber: 'ogcmYbNn',
  imageURL:
    'https://cdn.shopify.com/s/files/1/1550/6951/products/dc9096_11ccc41c-3574-4b51-bd81-14a64c401d5b_600x.jpg?v=1561053467',
  co2: [
    {
      year: '2015',
      value: '1400',
    },
    {
      year: '2016',
      value: '1100',
    },
    {
      year: '2017',
      value: '900',
    },
  ],
  dateManufactured: '2022-09-26',
  costManufactured: 200,
  salesPrice: 500,
};

const shipTransport = {
  transportationMethod: 'ship',
  trackingId: '3qwer23',
  vehicleId: '234f23',
  shipmentId: 'f43g32',
  imageURL:
    'https://zeymarine.com/wp-content/uploads/2020/01/container-ships-zeymarine-blog.jpg',
  co2: 555222,
  dateShipped: '2022-10-02',
  dateArrived: '2022-10-11',
  bill: '23422234',
};

const truckTransport = {
  transportationMethod: 'ground',
  trackingId: '4gedrgq2',
  vehicleId: 'fw4f2gf',
  shipmentId: 'w24gad3',
  imageURL:
    'https://drivingtowardacure.net/wp-content/uploads/2022/03/TuSimple_Self_Drving_Truck_4_copy.0.jpg',
  co2: 342422,
  dateShipped: '2022-08-14',
  dateArrived: '2022-09-30',
  bill: '5322222',
};

const drillHPT = {
  toolType: 'drill',
  serialNumber: '32hvaso2',
  imageURL:
    'https://cdn.thewirecutter.com/wp-content/media/2020/12/powerdrills-2048px-0818.jpg',
  components: [
    {
      type: 'motor',
      serialNumber: 'PMcQLNWf',
      co2: 1500
    },
    {
      type: 'battery',
      serialNumber: 'ogcmYbNn',
      co2: 900
    },
  ],
  transport: {
    transportationMethod: 'ground',
    trackingId: '4gedrgq2',
    co2: 342422,
  },
};

async function populateVendia() {
  try {
    const { entities } = client;

    await entities.battery.add(battery);

    await entities.motor.add(motor);
    await entities.transportation.add(shipTransport);
    await entities.transportation.add(truckTransport);

    await entities.hornetPowerTools.add(drillHPT);
  } catch (e) {
    throw e;
  }
}

populateVendia().then(() => {
    console.log('done!')
}).catch(e => {
    console.error("Something went wrong: ", e)
});
