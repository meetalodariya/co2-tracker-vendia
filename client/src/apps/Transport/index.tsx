import React from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import AddIcon from '@mui/icons-material/Add';
import { useQuery } from 'react-query';
import { httpGet, httpPost } from '../../utils/axiosRequests';
import { useAuth } from '../../providers/auth';
import AddTransportDialogue from './AddTransportDialogue';
import TransportResults from './TransportResults';
import { Transport } from './types';

const Transport = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState<boolean>(false);
  const [showFilter, setShowFilter] = React.useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isFetching, error } = useQuery(
    ['getAllTransportRoutes', showFilter],
    () =>
      httpGet<Transport[]>({
        url: '/transport',
        params: {
          ...(showFilter ? { show: showFilter } : {}),
        },
        headers: { Authorization: 'Bearer ' + user.token },
      }),
    { refetchOnWindowFocus: false },
  );

  if (error) {
    return <></>;
  }

  return (
    <div
      style={{
        height: 'calc(100% - 64px)',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <Grid container justifyContent={'space-between'} alignItems={'center'}>
        <Grid item>
          <Button
            color='secondary'
            variant='contained'
            size='medium'
            disabled={isFetching}
            onClick={handleOpen}
          >
            <AddIcon /> Add Transport Route
          </Button>
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <InputLabel id='demo-select-small'>Show</InputLabel>
            <Select
              labelId='demo-select-small'
              id='demo-select-small'
              value={showFilter}
              label='Transport Method'
              onChange={(e) => {
                setShowFilter(e.target.value);
              }}
            >
              <MenuItem value=''>
                <em>All</em>
              </MenuItem>
              <MenuItem value={'ship'}>Ship</MenuItem>
              <MenuItem value={'ground'}>Ground</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {isFetching ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(50%,-50%)',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TransportResults data={data.data} />
      )}
      <AddTransportDialogue open={open} handleClose={handleClose} />
    </div>
  );
};

export default Transport;
