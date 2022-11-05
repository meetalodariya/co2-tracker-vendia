export interface Motor {
  _id: string;
  partNumber: string;
  serialNumber: string;
  imageURL: string;
  co2: Array<{ year: string; value: string }>;
  dateManufactured: string;
  salesPrice: string;
}
