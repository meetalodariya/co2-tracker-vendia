import React from 'react';
import { Grid } from '@mui/material';

import { LoginForm } from './LoginForm';
// import {canvas} from '../../../components/canvas/canvas';style={{}}
// import background from '../../../assets/images/background-image.jpg';


const Login = () => {
const logo = require('./background-image.jpg');

  return (
    <div className="mainGrid">
      <img alt='logo' style={{ width: 100 }} src={require('./background-image.jpg')} />
      <Grid 
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '80vh'
        // ,backgroundImage:`url(${background})`
      }}
      >
        <Grid item xs={3}>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
