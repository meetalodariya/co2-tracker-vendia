import React from 'react';
import { useQuery } from 'react-query';
import { httpGet } from '@utils/axiosRequests';
import { Grid, Box, Typography } from '@mui/material';
import { useAuth } from 'src/providers/auth';
import SyncIcon from '@mui/icons-material/Sync';
import { Battery } from '../../Battery/types';
import BatteryCard from './BatteryCard';
import ListLoader from '../ListLoader';
import { useWorkbench } from 'src/providers/workbench/workbench';

const BatteryList = () => {
  const { user } = useAuth();
  const { batteries, setBatteryList, selectedBattery } = useWorkbench();

  const { error, isFetching, refetch } = useQuery(
    'getAllBatteries',
    () => {
      return httpGet<Array<Battery>>({
        url: '/battery',
        headers: { Authorization: 'Bearer ' + user.token },
      });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setBatteryList(data.data);
      },
    },
  );

  if (error) {
    return <></>;
  }

  let filteredBatteries = batteries;
  if (batteries && selectedBattery) {
    console.log({ batteries });

    filteredBatteries = filteredBatteries.filter(
      (battery) => battery._id !== selectedBattery._id,
    );
  }

  return (
    <>
      <Box
        component='div'
        sx={{
          width: '100%',
          height: '100%',
          padding: '8px 12px',
          position: 'relative',
        }}
      >
        <Grid
          container
          justifyContent={'space-between'}
          alignItems='center'
          p={1}
        >
          <Typography variant='h6'>Select a battery</Typography>
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => {
              refetch();
            }}
          >
            <SyncIcon color='primary' />
          </div>
        </Grid>
        <Box
          component={'div'}
          sx={{
            overflow: 'auto',
            height: 'calc(100% - 70px)',
            padding: '3px',
          }}
        >
          {isFetching || !filteredBatteries ? (
            <ListLoader />
          ) : (
            filteredBatteries.map((component) => (
              <BatteryCard key={component._id} data={component} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default BatteryList;
