import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { HPTDetails } from './types';
import HptCard from './HptCard';
import CardSkeletonLoader from './CardSkeletonLoader';
import { Typography } from '@mui/material';

interface Props {
  isLoading: boolean;
  data: { hptDetails: HPTDetails; status: string };
}

const SearchResults: FC<Props> = ({ isLoading, data }) => {
  return (
    <Grid container spacing={0} direction='column' alignItems='center'>
      <Grid item xs={3}>
        {isLoading && !data && <CardSkeletonLoader />}
        {data && data.status === 'Success' && (
          <HptCard data={data.hptDetails} />
        )}
        {data && data.status === 'Not Found' && (
          <Typography variant='h4'>No results found!</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchResults;
