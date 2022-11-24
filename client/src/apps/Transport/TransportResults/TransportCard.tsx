import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, CardActions, Button } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import RouteIcon from '@mui/icons-material/Route';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Transport } from '../types';
import { secondsToDhms } from '@utils/time';
import TransportDetailsDialog from './TransportDetailsDialog';
import DirectionsDialog from './DirectionsDialog';

interface Props {
  data: Transport;
}

const renderKeyValue = (icon, key, value) => {
  return (
    <>
      <Grid
        item
        container
        xs={5}
        columnSpacing={0.5}
        alignItems={'center'}
        height={'fit-content'}
      >
        {icon}
        <Grid item>
          <Typography component='span' variant='body2' fontSize={'13px'}>
            {key}{' '}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Typography
          color='text.secondary'
          component='span'
          variant='body2'
          fontSize={'13px'}
        >
          {value}
        </Typography>
      </Grid>
    </>
  );
};

const TransportCard: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const distanceUnit = data.transportationMethod === 'ship' ? 'nmi' : 'mi';
  const distanceInMiles = React.useMemo(
    () => Math.floor(data.distance * 0.000621371192),
    [data.distance],
  );
  const durationInDh = secondsToDhms(data.duration);
  const [directionModalOpen, setDirectionModalOpen] =
    React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDirectionModalOpen = () => setDirectionModalOpen(true);
  const handleDirectionModalClose = () => setDirectionModalOpen(false);

  return (
    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        component='img'
        height='140'
        src={data.imageURL}
        alt={data.transportationMethod}
      />
      <CardContent>
        <Grid
          container
          justifyContent={'space-between'}
          alignItems={'center'}
          marginBottom={1}
        >
          <Typography fontSize={'1.5rem'} component='span'>
            {capitalizeFirstLetter(data.transportationMethod)}
          </Typography>
          <Typography
            fontSize={'15px'}
            component='span'
            color='text.secondary'
            sx={{ display: 'flex', gap: '3px' }}
          >
            <PaidIcon fontSize='small' />
            {data.bill}
          </Typography>
        </Grid>

        <Grid container justifyContent={'flex-start'} rowSpacing={0.3}>
          {renderKeyValue(
            <AddLocationIcon fontSize='small' />,
            'From:',
            data.origin.name,
          )}
          {renderKeyValue(
            <WhereToVoteIcon fontSize='small' />,
            'To:',
            data.destination.name,
          )}
          {renderKeyValue(
            <RouteIcon fontSize='small' />,
            'Distance:',
            distanceInMiles + ' ' + distanceUnit,
          )}
          {renderKeyValue(
            <AccessTimeFilledIcon fontSize='small' />,
            'Duration:',
            durationInDh,
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Button size='small' color={'secondary'} onClick={handleOpen}>
          Details
        </Button>
        <Button
          size='small'
          color={'secondary'}
          onClick={handleDirectionModalOpen}
        >
          Directions
        </Button>
      </CardActions>
      <TransportDetailsDialog
        handleClose={handleClose}
        open={open}
        values={{ ...data, distanceUnit, durationInDh, distanceInMiles }}
      />
      <DirectionsDialog
        handleClose={handleDirectionModalClose}
        open={directionModalOpen}
        values={data}
      />
    </Card>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default TransportCard;
