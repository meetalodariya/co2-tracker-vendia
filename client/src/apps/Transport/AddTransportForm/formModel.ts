export default {
  formId: 'add-transport-form',
  formField: {
    vehicleId: {
      name: 'vehicleId',
      label: 'Vehicle ID*',
      requiredErrorMsg: 'Vehicle ID is required',
    },
    shipmentId: {
      name: 'shipmentId',
      label: 'Shipment ID*',
      requiredErrorMsg: 'Shipment ID is required',
    },
    charge: {
      name: 'charge',
      label: 'Charge (USD per mile)*',
      requiredErrorMsg: 'Charge is required',
    },
    co2: {
      name: 'co2',
      label: 'CO2 emission (Grams per mile)*',
      requiredErrorMsg: 'CO2 emission is required',
    },
    transportationMethod: {
      name: 'transportationMethod',
      label: 'Transportation method*',
      requiredErrorMsg: 'Transportation method is required',
    },
    originName: {
      name: 'name',
      label: 'Origin address (A)*',
      requiredErrorMsg: 'Origin address is required',
    },
    originLat: {
      name: 'lat',
    },
    originLng: {
      name: 'lng',
    },
    destinationName: {
      name: 'name',
      label: 'Destination address (B)*',
      requiredErrorMsg: 'Destination address is required',
    },
    destinationLat: {
      name: 'lat',
    },
    destinationLng: {
      name: 'lng',
    },
    distance: {
      name: 'distance',
    },
    duration: {
      name: 'duration',
    },
  },
};
