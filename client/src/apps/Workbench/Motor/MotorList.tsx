import React from 'react';
import { useQuery } from 'react-query';
import { httpGet } from '@utils/axiosRequests';
import { Grid, Box, Typography } from '@mui/material';
import { useAuth } from 'src/providers/auth';
import SyncIcon from '@mui/icons-material/Sync';
import { Motor } from '../../Motor/types';
import MotorCard from './MotorCard';
import ListLoader from '../ListLoader';
import { useWorkbench } from 'src/providers/workbench/workbench';

const MotorList = () => {
  const { user } = useAuth();
  const { motors, setMotorList, selectedMotor } = useWorkbench();

  const { error, isFetching, refetch } = useQuery(
    'getAllMotors',
    () => {
      return httpGet<Array<Motor>>({
        url: '/motor',
        headers: { Authorization: 'Bearer ' + user.token },
      });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setMotorList(data.data);
      },
    },
  );

  if (error) {
    return <></>;
  }

  let filteredMotors = motors;
  if (motors && selectedMotor) {
    filteredMotors = filteredMotors.filter(
      (motor) => motor._id !== selectedMotor._id,
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
          <Typography variant='h6'>Select a motor</Typography>
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
          {isFetching || !filteredMotors ? (
            <ListLoader />
          ) : (
            filteredMotors.map((component) => (
              <MotorCard key={component._id} data={component} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default MotorList;
