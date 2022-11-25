import * as Yup from 'yup';
import formModel from './formModel';

const {
  formField: {
    charge,
    destinationLat,
    destinationLng,
    originLat,
    originLng,
    originName,
    shipmentId,
    vehicleId,
    destinationName,
    transportationMethod,
    co2,
  },
} = formModel;

export default [
  Yup.object().shape({
    [transportationMethod.name]: Yup.string().required(
      `${transportationMethod.requiredErrorMsg}`,
    ),
    [shipmentId.name]: Yup.string().required(`${shipmentId.requiredErrorMsg}`),
    [vehicleId.name]: Yup.string().required(`${vehicleId.requiredErrorMsg}`),
    [charge.name]: Yup.number().required(`${charge.requiredErrorMsg}`),
    [co2.name]: Yup.number().required(`${co2.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    destination: Yup.object({
      [destinationName.name]: Yup.string().required(
        `${destinationName.requiredErrorMsg}`,
      ),
      [destinationLng.name]: Yup.number().required(
        `Please enter a valid destination`,
      ),
      [destinationLat.name]: Yup.number().required(
        `Please enter a valid destination`,
      ),
    }),
    origin: Yup.object({
      [originName.name]: Yup.string().required(
        `${originName.requiredErrorMsg}`,
      ),
      [originLng.name]: Yup.number().required(`Please enter a valid origin`),
      [originLat.name]: Yup.number().required(`Please enter a valid origin`),
    }),
  }),
];
