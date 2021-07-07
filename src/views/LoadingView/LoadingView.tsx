import React from 'react';
import Grid from '@material-ui/core/Grid';

const LoadingView: React.FC = () => {
  return (
    <Grid container justifyContent="center">
      <div>Loading...</div>
    </Grid>
  );
};

export default LoadingView;
