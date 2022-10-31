import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { useAuth } from '../../providers/auth';
import { httpGet } from '../../utils/axiosRequests';
import { HPTDetails } from './types';
import Nav from '../Nav/Nav';
import SearchResults from './SearchResults';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
      <Nav />
      <div
        style={{
          backgroundImage:
            "url('https://www.oxygenna.com/wp-content/uploads/2014/08/tools-blog.jpg')",
          filter: 'blur(4px)',
          WebkitFilter: 'blur(4px)',
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          zIndex: 1,
          position: 'fixed',
          left: 0,
          right: 0,
          display: 'block',
        }}
      ></div>
      <Grid
        container
        rowSpacing={13}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginTop: '8px', position: 'absolute', zIndex: 999 }}
        data-testid={'dashboard-container'}
      >
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
            </div>
          </form>
        </Grid>
        <Grid item xs={12}>
          <SearchResults isLoading={isLoading} data={result} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
