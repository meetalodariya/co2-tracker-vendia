import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
import TodayIcon from '@mui/icons-material/Today';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReviewDetails from '../AddTransportForm/ReviewDetails';
import { Grid } from '@mui/material';
import { Transport } from '../types';

interface Values extends Transport {
  distanceUnit: string;
  durationInDh: string;
  distanceInMiles: number;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  values: Values;
}

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

const TransportDetailsDialog: FC<Props> = ({ open, handleClose, values }) => {
  const {
    transportationMethod,
    vehicleId,
    shipmentId,
    charge,
    co2,
    distanceInMiles,
    distanceUnit,
    origin,
    destination,
    bill,
    durationInDh,
    dateShipped,
  } = values;
  const transportIcon =
    transportationMethod === 'ship' ? (
      <DirectionsBoatFilledIcon color='secondary' fontSize='large' />
    ) : (
      <LocalShippingIcon color='secondary' fontSize='large' />
    );
  const totalCo2 = Math.ceil((distanceInMiles * co2) / 1000);

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        data-testid='transport-details-dialog'
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Transport Details
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
            data-testid='transport-details-dialog-close'
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
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
              <TodayIcon color='secondary' fontSize='large' />,
              'Created Date',
              new Date(dateShipped).toDateString(),
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
              <RouteIcon color='secondary' fontSize='large' />,
              (transportationMethod === 'ship' ? 'Sea' : 'Ground') +
                ' Distance',
              distanceInMiles,
              distanceUnit,
            )}
            {renderDetails(
              <AccessTimeFilledIcon color='secondary' fontSize='large' />,
              'Duration',
              durationInDh,
            )}
            {renderDetails(
              <PaymentsIcon color='secondary' fontSize='large' />,
              'Total cost (distance * charge)',
              bill,
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransportDetailsDialog;
