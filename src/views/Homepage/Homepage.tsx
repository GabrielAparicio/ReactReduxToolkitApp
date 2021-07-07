import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FilteringSelect from '../../features/todos/components/FilteringSelect';
import SearchForm from '../../features/todos/components/SearchForm';
import TodoList from '../../features/todos/components/TodoList';
import { HOMEPAGE_HEADER } from '../../utils/constants';

const useStyles = makeStyles({
  root: {
    maxWidth: '90%',
    margin: 'auto',
  },
  header: {
    fontWeight: 'bold',
  },
});

const Homepage: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography variant="h4" className={classes.header}>
          {HOMEPAGE_HEADER}
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item xs={12} sm={6}>
          <SearchForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FilteringSelect />
        </Grid>
      </Grid>
      <Grid item>
        <TodoList />
      </Grid>
    </Grid>
  );
};

export default Homepage;
