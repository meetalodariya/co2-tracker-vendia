import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { useAuth } from '../../providers/auth';
import { httpGet } from '../../utils/axiosRequests';
import { HPTDetails } from './types';
import SearchResults from './SearchResults';

const Dashboard = () => {
  const auth = useAuth();
  const [htpSn, setHptSn] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    hptDetails: HPTDetails | null;
    status: string;
  } | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setResult(null);
      setIsLoading(true);

      const { data, error } = await httpGet<HPTDetails>({
        url: `/hpt/${htpSn}`,
        headers: {
          Authorization: 'Bearer ' + auth.user.token,
        },
      });

      if (data) {
        setResult({ hptDetails: data, status: 'Success' });
      } else if (error) {
        if (error?.response?.status === 401) {
          auth.signout(() => undefined);
        } else if (error?.response?.status === 404) {
          setResult({ hptDetails: null, status: 'Not Found' });
        }
      }

      setIsLoading(false);
    },
    [auth, htpSn],
  );

  return (
    <>
      <div
        style={{
          padding: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          display: 'flex',
          minWidth: 'calc(100% - 10px)',
          gap: '200px'
        }}
        data-testid={'dashboard-container'}
      >
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id='standard'
              data-testid='hpt-sn-input'
              variant='filled'
              label='Enter HPT Serial Number'
              value={htpSn}
              onChange={(e) => setHptSn(e.target.value)}
              sx={{
                width: '30vw',
                backgroundColor: 'white',
              }}
              color='primary'
              InputProps={{
                endAdornment: (
                  <IconButton type='submit'>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </div>
        <div>
          <SearchResults isLoading={isLoading} data={result} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
