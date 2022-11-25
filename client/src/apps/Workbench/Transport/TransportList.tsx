import React from 'react';
import { useQuery } from 'react-query';
import { httpGet } from '@utils/axiosRequests';
import { Grid, Box, Typography } from '@mui/material';
import { useAuth } from 'src/providers/auth';
import SyncIcon from '@mui/icons-material/Sync';
import { Transport } from '../../Transport/types';
import TransportCard from './TransportCard';
import ListLoader from '../ListLoader';
import { useWorkbench } from 'src/providers/workbench/workbench';

const TransportList = () => {
  const { user } = useAuth();
  const { transports, setTransportList, selectedTransport } = useWorkbench();

  const { error, isFetching, refetch } = useQuery(
    'getAllTransports',
    () => {
      return httpGet<Array<Transport>>({
        url: '/transport',
        headers: { Authorization: 'Bearer ' + user.token },
      });
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setTransportList(data.data);
      },
    },
  );

  if (error) {
    return <></>;
  }

  let filteredTransports = transports;
  if (transports && selectedTransport) {
    filteredTransports = filteredTransports.filter(
      (transport) => transport._id !== selectedTransport._id,
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
          <Typography variant='h6'>Select a transport</Typography>
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
          {isFetching || !filteredTransports ? (
            <ListLoader />
          ) : (
            filteredTransports.map((component) => (
              <TransportCard key={component._id} data={component} />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

export default TransportList;
