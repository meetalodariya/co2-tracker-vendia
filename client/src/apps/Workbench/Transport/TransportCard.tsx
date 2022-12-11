import { Grid, Typography } from '@mui/material';
import { getLatestCo2Value } from '@utils/co2';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Transport } from '../../Transport/types';
import ComponentCard from '../ComponentCard';
import DndTypes from '../DndTypes';

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
        columnSpacing={0.2}
        alignItems={'center'}
        height={'fit-content'}
      >
        {icon}
        <Grid item>
          <Typography
            color='text.secondary'
            component='span'
            variant='body2'
            fontSize={'13px'}
          >
            {key}{' '}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Typography component='span' variant='body2' fontSize={'13px'}>
          {value}
        </Typography>
      </Grid>
    </>
  );
};

const TransportCard: FC<Props> = ({ data }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndTypes.TRANSPORT,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { id: data._id },
    options: {
      dropEffect: 'move',
    },
  }));

  const cardContent = (
    <>
      <Grid container>
        {renderKeyValue(null, 'Shipment#:', data.shipmentId)}
        {renderKeyValue(null, 'Cost:', data.bill)}
        {renderKeyValue(null, 'Total CO2:', data.co2)}
      </Grid>
    </>
  );

  return (
    <>
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={drag}
        role='Handle'
        data-testid='transport-draggable-card'
      >
        <ComponentCard
          serialNumber={data.shipmentId}
          cardContent={cardContent}
          imageURL={data.imageURL}
        />
      </div>
    </>
  );
};

export default TransportCard;
