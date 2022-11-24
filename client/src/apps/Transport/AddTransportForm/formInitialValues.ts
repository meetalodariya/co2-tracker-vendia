export interface AddTransportMethodForm {
  vehicleId: string;
  charge: number;
  co2: number;
  shipmentId: string;
  transportationMethod: string;
  origin: {
    name: string;
    lat: number;
    lng: number;
  };
  destination: {
    name: string;
    lat: number;
    lng: number;
  };
  distance: number;
  duration: number;
}

export default {
  vehicleId: '',
  charge: null,
  shipmentId: '',
  transportationMethod: '',
  co2: null,
  origin: {
    name: '',
    lat: null,
    lng: null,
  },
  destination: {
    name: '',
    lat: null,
    lng: null,
  },
  distance: null,
  duration: null,
} as AddTransportMethodForm;
