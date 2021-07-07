import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'white',
  },
});

interface EmptyListViewProps {
  title: string;
}

const EmptyListView: React.FC<EmptyListViewProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={classes.root}>
      {title}
    </Typography>
  );
};

export default EmptyListView;
