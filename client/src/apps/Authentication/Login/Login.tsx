import React from 'react';
import { Grid } from '@mui/material';

import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2014/09/13/21/46/milling-444493__480.jpg')",
          filter: 'blur(6px)',
          WebkitFilter: 'blur(6px)',
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
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{
          minHeight: '100vh',
          zIndex: 9999,
          position: 'fixed',
        }}
      >
        <Grid item xs={3}>
          <LoginForm />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
