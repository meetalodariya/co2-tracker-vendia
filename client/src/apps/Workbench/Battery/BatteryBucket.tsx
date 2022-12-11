import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useWorkbench } from 'src/providers/workbench/workbench';
import theme from 'src/theme';
import SvgBattery from '@assets/icons/battery.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Battery } from '../../Battery/types';
import { getLatestCo2Value } from '@utils/co2';
import PaymentsIcon from '@mui/icons-material/Payments';
import DndTypes from '../DndTypes';

const renderKeyValue = (icon, key, value) => {
  return (
    <>
      <Grid
        item
        container
        xs={6}
        columnSpacing={0.2}
        alignItems={'center'}
        height={'fit-content'}
      >
        {icon}
        <Grid item>
          <Typography color='text.secondary' component='span' variant='body2'>
            {key}{' '}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography component='span' variant='body2'>
          {value}
        </Typography>
      </Grid>
    </>
  );
};

const getCard = (data: Battery) => {
  const latestCo2Val = getLatestCo2Value(data.co2);

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          borderRadius: '10px',
          alignItems: 'center',
          height: '190px',
        }}
      >
        <div style={{ height: 190, width: 190 }}>
          <CardMedia
            component='img'
            height='190'
            sx={{ width: 190, borderRadius: '10px' }}
            src={data.imageURL}
            alt={data.serialNumber}
          />
        </div>
        <CardContent sx={{ padding: '16px', width: '100%', fontSize: '13px' }}>
          <Grid container rowSpacing={0.2}>
            {renderKeyValue(null, 'SN#:', data.serialNumber)}
            {renderKeyValue(null, 'Price:', data.salesPrice + ' USD')}
            {latestCo2Val &&
              renderKeyValue(null, 'CO2 value:', latestCo2Val.value + ' KgCO2')}
            {renderKeyValue(
              null,
              'Manufactured Date:',
              new Date(data.dateManufactured).toDateString(),
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const BatteryBucket = () => {
  const { handleBatterySelect, selectedBattery, setBatteryList } =
    useWorkbench();
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DndTypes.BATTERY,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      drop: (item: { id: string }) => {
        handleBatterySelect(item.id);
      },
    }),
    [handleBatterySelect],
  );

  const bucketBackground = isOver
    ? 'rgba(0, 87, 61, 0.6)'
    : canDrop
    ? 'rgba(0, 87, 61, 0.3)'
    : 'none';

  return (
    <Box
      component={'div'}
      sx={{
        height: '200px',
        borderRadius: '10px',
        border: '2px solid ' + theme.palette.primary.light,
        position: 'relative',
        padding: '3px',
      }}
      role={'Bucket'}
      ref={drop}
      data-testid='battery-bucket'
    >
      {bucketBackground !== 'none' && (
        <div
          style={{
            backgroundColor: bucketBackground,
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 100,
            borderRadius: '10px',
            top: 0,
            left: 0,
          }}
        ></div>
      )}
      <div style={{ zIndex: 10 }}>
        {selectedBattery && getCard(selectedBattery)}
      </div>
      {!selectedBattery && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(50%,-50%)',
            zIndex: 1,
            opacity: 0.7,
          }}
        >
          <SvgBattery />
        </div>
      )}
    </Box>
  );
};

export default BatteryBucket;
