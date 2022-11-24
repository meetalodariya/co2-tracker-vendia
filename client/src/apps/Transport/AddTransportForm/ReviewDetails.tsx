import React, { FC, useMemo } from 'react';
import { useFormikContext } from 'formik';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FifteenMpIcon from '@mui/icons-material/FifteenMp';
import FactoryIcon from '@mui/icons-material/Factory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningIcon from '@mui/icons-material/Warning';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import Co2Icon from '@mui/icons-material/Co2';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentsIcon from '@mui/icons-material/Payments';

import { Grid } from '@mui/material';
import { secondsToDhms } from '../../../utils/time';
import { AddTransportMethodForm } from './formInitialValues';

const renderDetails = (icon, key, value, unit?) => {
  return (
    <>
      <Grid item container xs={12} sm={6} columnSpacing={2}>
        <Grid item alignSelf={'center'}>
          {icon}
        </Grid>
        <Grid item>
          <div style={{ maxWidth: '190px' }}>
            <div style={{ color: '#2c2c2c', fontSize: '15px' }}>
              {value}{' '}
              <span style={{ color: '#bfc0c5', fontSize: '12px' }}>{unit}</span>
            </div>
            <div
              style={{
                marginBottom: '4px',
                color: '#bfc0c5',
                fontSize: '14px',
              }}
            >
              {key}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const ReviewDetails: FC = () => {
  const { values } = useFormikContext<AddTransportMethodForm>();
  const {
    transportationMethod,
    charge,
    co2,
    shipmentId,
    vehicleId,
    destination,
    origin,
    distance,
    duration,
  } = values;

  const distanceUnit = transportationMethod === 'ship' ? 'nmi' : 'mi';
  const distanceInMiles = useMemo(
    () => Math.floor(distance * 0.000621371192),
    [distance],
  );
  const durationInDh = secondsToDhms(duration);
  const totalCost = distanceInMiles * charge;
  const totalCo2 = Math.ceil((distanceInMiles * co2) / 1000);

  const transportIcon =
    transportationMethod === 'ship' ? (
      <DirectionsBoatFilledIcon color='secondary' fontSize='large' />
    ) : (
      <LocalShippingIcon color='secondary' fontSize='large' />
    );

  return (
    <div style={{ padding: '0 20px' }}>
      <Grid container columnSpacing={3} rowSpacing={3}>
        {renderDetails(
          transportIcon,
          'Transportation Method',
          transportationMethod,
        )}
        {renderDetails(
          <FifteenMpIcon color='secondary' fontSize='large' />,
          'Vehicle ID',
          vehicleId,
        )}
        {renderDetails(
          <FactoryIcon color='secondary' fontSize='large' />,
          'Shipment ID',
          shipmentId,
        )}
        {renderDetails(
          <AttachMoneyIcon color='secondary' fontSize='large' />,
          'Charge',
          charge,
          'USD per mile',
        )}
        {renderDetails(
          <Co2Icon color='secondary' fontSize='large' />,
          'CO2 value',
          co2,
          'Grams per mile',
        )}
        {renderDetails(
          <RouteIcon color='secondary' fontSize='large' />,
          (transportationMethod === 'ship' ? 'Sea' : 'Ground') + ' Distance',
          distanceInMiles,
          distanceUnit,
        )}
        {renderDetails(
          <AddLocationIcon color='secondary' fontSize='large' />,
          'Origin Address',
          origin.name,
        )}
        {renderDetails(
          <WhereToVoteIcon color='secondary' fontSize='large' />,
          'Destination Address',
          destination.name,
        )}
        {renderDetails(
          <AccessTimeFilledIcon color='secondary' fontSize='large' />,
          'Duration',
          durationInDh,
        )}
        {renderDetails(
          <PaymentsIcon color='secondary' fontSize='large' />,
          'Total cost (distance * charge)',
          totalCost,
          'USD',
        )}
        {renderDetails(
          <WarningIcon color='secondary' fontSize='large' />,
          <>
            Total CO2 emission <br />
            (distance * co2 value)
          </>,
          totalCo2,
          'KgCO2',
        )}
      </Grid>
    </div>
  );
};

export default ReviewDetails;
