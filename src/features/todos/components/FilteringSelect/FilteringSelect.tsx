import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { setCurrentFilter, VisibilityFilters } from '../../filteringSlice';
import { useAppDispatch } from '../../../../redux/storeHooks';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '90%',
      margin: '1em auto',
    },
  })
);

const FilteringSelect: React.FC = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState<VisibilityFilters>('all');
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as VisibilityFilters;
    setFilter(value);
    dispatch(setCurrentFilter(value));
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Completed</InputLabel>
        <Select
          native
          labelId="select-label"
          value={filter}
          onChange={handleChange}
          inputProps={{ 'data-testid': 'filter-select' }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </Select>
      </FormControl>
    </>
  );
};

export default FilteringSelect;
