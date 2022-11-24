export type co2HistoricalData = Array<{ year: string; value: string }>;

export interface Motor {
  _id: string;
  partNumber: string;
  serialNumber: string;
  imageURL: string;
  co2: co2HistoricalData;
  dateManufactured: string;
  salesPrice: string;
}
