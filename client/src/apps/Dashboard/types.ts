export interface Component {
  type: string;
  serialNumber: string;
  co2: number;
}

export interface Transport {
  transportationMethod: string;
  trackingId: string;
  co2: number;
}

export interface HPTDetails {
  toolType: string;
  serialNumber: string;
  imageURL: string;
  components: Component[];
  transport: Transport;
}
