export interface Transport {
  _id: string;
  _owner: string;
  transportationMethod: string;
  trackingId: string;
  vehicleId: string;
  shipmentId: string;
  imageURL: string;
  distance: number;
  co2: number;
  duration: number;
  charge: number;
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
  dateShipped: string;
  dateArrived: string;
  bill: string;
}
