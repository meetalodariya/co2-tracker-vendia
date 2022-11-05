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

  const { data, error, isLoading } = useQuery('getAllBatteries', () => {
    return httpGet<{ data: Array<Battery>; status: number }>({
      url: '/battery',
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
        data-testid="add-battery-button"
      >
        <AddIcon size='small' /> Add Battery
      </Button>
      <CollapsibleTable data={data?.data} isLoading={isLoading} />
      <AddDialogue open={open} handleClose={handleClose} />
    </div>
  );
};

export default Battery;