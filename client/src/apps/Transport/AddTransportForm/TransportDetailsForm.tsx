import React from 'react';
import { useFormikContext } from 'formik';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { SelectField, InputField } from '../../../core/FormFields';
import formModel from './formModel';

const transportMethods = [
  {
    value: undefined,
    label: 'None',
  },
  {
    value: 'ground',
    label: (
      <div style={{ display: 'flex' }}>
        <LocalShippingIcon />
        <Typography sx={{ paddingLeft: '6px', alignItems: 'center' }}>
          {' '}
          Ground
        </Typography>
      </div>
    ),
  },
  {
    value: 'ship',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DirectionsBoatIcon />
        <Typography sx={{ paddingLeft: '6px' }}> Ship</Typography>
      </div>
    ),
  },
];

export default function TransportDetailsForm() {
  const {
    formField: { charge, shipmentId, vehicleId, transportationMethod, co2 },
  } = formModel;

  return (
    <React.Fragment>
      <div style={{ padding: '0px 8px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SelectField
              name={transportationMethod.name}
              label={transportationMethod.label}
              data={transportMethods}
              variant='standard'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name={shipmentId.name}
              variant='standard'
              label={shipmentId.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              variant='standard'
              name={vehicleId.name}
              label={vehicleId.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              type='number'
              name={charge.name}
              variant='standard'
              label={charge.label}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              type='number'
              name={co2.name}
              variant='standard'
              label={co2.label}
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
