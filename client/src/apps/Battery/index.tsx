import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from 'react-query';

import { httpGet } from '../../utils/axiosRequests';
import CollapsibleTable from './DataGrid';
import { Battery } from './types';
import { useAuth } from '../../providers/auth';
import AddDialogue from './AddDialogue';

const Battery = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, error, isFetching } = useQuery(
    'getAllBatteries',
    () => {
      return httpGet<Array<Battery>>({
        url: '/battery',
        headers: { Authorization: 'Bearer ' + user.token },
      });
    },
    { refetchOnWindowFocus: false },
  );

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
        disabled={isFetching}
        onClick={handleOpen}
        data-testid='add-battery-button'
      >
        <AddIcon /> Add Battery
      </Button>
      <CollapsibleTable data={data?.data} isLoading={isFetching} />
      <AddDialogue open={open} handleClose={handleClose} />
    </div>
  );
};

export default Battery;
