import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from 'react-query';
import { httpGet } from '../../utils/axiosRequests';
import CollapsibleTable from './DataGrid';
import { Motor } from './types';
import { useAuth } from '../../providers/auth';
import AddDialogue from './AddDialogue';

const Motor = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, error, isLoading } = useQuery('getAllMotors', () => {
    return httpGet<Array<Motor>>({
      url: '/motor',
      headers: { Authorization: 'Bearer ' + user.token },
    });
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: '20px',
      }}
    >
      <Button
        color='secondary'
        variant='contained'
        size='medium'
        style={{ marginBottom: '10px' }}
        disabled={isLoading}
        onClick={handleOpen}
      >
        <AddIcon /> Add Motor
      </Button>
      <CollapsibleTable data={data?.data} isLoading={isLoading} />
      <AddDialogue open={open} handleClose={handleClose} />
    </div>
  );
};

export default Motor;
