import Grid from '@mui/material/Grid';
import React, { FC } from 'react';
import { Transport } from '../types';
import TransportCard from './TransportCard';

interface Props {
  data: Transport[];
}

const TransportResults: FC<Props> = ({ data }) => {
  return (
    <>
      <div
        style={{
          height: '100%',
          padding: '10px 0px 55px 0px',
          overflowY: 'scroll',
        }}
      >
        <Grid container columnSpacing={3} rowSpacing={3}>
          {data.map((routeData, index) => {
            return (
              <Grid key={routeData.trackingId} item>
                <TransportCard data={routeData} index={index} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default TransportResults;
