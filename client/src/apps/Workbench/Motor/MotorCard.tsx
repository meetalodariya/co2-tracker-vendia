import { Grid, Typography } from '@mui/material';
import { getLatestCo2Value } from '@utils/co2';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';

import { Motor } from '../../Motor/types';
import ComponentCard from '../ComponentCard';
import DndTypes from '../DndTypes';

interface Props {
  data: Motor;
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

const MotorCard: FC<Props> = ({ data }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndTypes.MOTOR,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { id: data._id },
    options: {
      dropEffect: 'move',
    },
  }));

  const latestCo2Val = getLatestCo2Value(data.co2);

  const cardContent = (
    <>
      <Grid container>
        {renderKeyValue(null, 'SN#:', data.serialNumber)}
        {renderKeyValue(null, 'Price:', data.salesPrice)}
        {latestCo2Val && renderKeyValue(null, 'CO2:', latestCo2Val.value)}
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
        data-testid='motor-draggable-card'
      >
        <ComponentCard
          serialNumber={data.serialNumber}
          cardContent={cardContent}
          imageURL={data.imageURL}
        />
      </div>
    </>
  );
};

export default MotorCard;
