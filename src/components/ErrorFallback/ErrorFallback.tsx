import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <p>Something went wrong</p>
      <p>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Grid>
  );
};

export default ErrorFallback;
