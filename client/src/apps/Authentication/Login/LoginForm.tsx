import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Card, Alert } from '@mui/material';
import Button from '@mui/material/Button';

import { useAuth } from '../../../providers/auth';
import { httpPost } from '../../../utils/axiosRequests';

import styles from './LoginForm.styles.scss';

export const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ username: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { username, password } = credentials;

      if (!username || !password) {
        setError('Invalid inputs!');
        return;
      }

      const { data, error } = await httpPost<{ token: string }>({
        url: '/user/signin',
        data: {
          username,
          password,
        },
      });

      if (data) {
        auth.signin({ token: data.token }, () => {
          navigate('/');
        });
      } else if (error) {
        setError('Server error: ' + error.message);
      }
    },
    [credentials, auth, navigate],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((val) => {
      return {
        ...val,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: 'white',
          padding: '20px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <div style={{ fontWeight: '800', fontSize: '1.8rem' }}>Sign In</div>
        <form onSubmit={handleSubmit}>
          <TextField
            data-testid={'username-textfield'}
            value={credentials.username}
            onChange={handleInputChange}
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            color='primary'
            style={{ marginBottom: '10px' }}
          />
          <TextField
            data-testid={'password-textfield'}
            value={credentials.password}
            onChange={handleInputChange}
            name='password'
            label='Password'
            color='primary'
            variant='outlined'
            type={'password'}
            fullWidth
          />
          <div style={{ marginTop: '10px' }}>
            {error && (
              <Alert data-testid={'error-message'} severity='error'>
                {error}
              </Alert>
            )}
          </div>
          <div className={styles['action-container']}>
            <Button
              fullWidth
              color='secondary'
              variant='contained'
              type='submit'
              data-testid={'submit-button'}
            >
              Sign in
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};
