import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Skeleton } from '@mui/material';

export default function CardSkeletonLoader() {
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        title={
          <Skeleton
            animation='wave'
            height={20}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton
            animation='wave'
            height={20}
            width='60%'
            style={{ marginBottom: 6 }}
          />
        }
      />
      <Skeleton sx={{ height: 194 }} animation='wave' variant='rectangular' />
      <CardContent>
        <Skeleton
          animation='wave'
          height={15}
          width='60%'
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation='wave'
          height={15}
          width='90%'
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation='wave'
          height={15}
          width='70%'
          style={{ marginBottom: 15 }}
        />
      </CardContent>
    </Card>
  );
}
