import { Skeleton } from '@mui/material';
import React from 'react';

const renderLoader = (opacity: number) => {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '6px', opacity }}>
      <Skeleton
        variant='rectangular'
        width={100}
        height={100}
        sx={{ borderRadius: '10px' }}
        animation='wave'
      />
      <div style={{ width: '60%' }}>
        <Skeleton variant='text' sx={{ width: '60%' }} animation='wave' />
        <Skeleton variant='text' sx={{ width: '90%' }} animation='wave' />
        <Skeleton variant='text' sx={{ width: '50%' }} animation='wave' />
        <Skeleton variant='text' sx={{ width: '100%' }} animation='wave' />
      </div>
    </div>
  );
};

const ListLoader = () => {
  return (
    <>
      {renderLoader(1)}
      {renderLoader(0.9)}
      {renderLoader(0.8)}
      {renderLoader(0.7)}
      {renderLoader(0.6)}
      {renderLoader(0.4)}
      {renderLoader(0.2)}
    </>
  );
};

export default ListLoader;
