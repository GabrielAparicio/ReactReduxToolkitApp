import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';
import { useAppDispatch } from '../../../../redux/storeHooks';
import { setSearchingContent } from '../../searchingSlice';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      width: '90%',
      margin: '1em auto',
    },
  })
);

interface SearchFormFields {
  searchContent: string;
}

const inputFields = {
  searchContent: {
    name: 'searchContent',
    type: 'text',
    id: 'search-content',
    label: 'Search',
    defaultValue: '',
    placeholder: 'keyword...',
  },
};

const SearchForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { control, setValue } = useForm<SearchFormFields>();

  /* 
  _.debounce is a function provided by lodash to limit how
  often a particularly expensive operation can be run.
  In this case, we want to limit how often we dispatch an action to the store, 
  waiting until the user has completely finished typing before making the corresponding request 
  */
  const debouncedDispatchContent = debounce((content: string) => {
    dispatch(setSearchingContent(content));
  }, 500);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setValue('searchContent', searchValue);
    debouncedDispatchContent(searchValue);
  };

  return (
    <div>
      <form>
        <Controller
          render={({ field }) => (
            <TextField
              className={classes.formControl}
              {...field}
              type={inputFields.searchContent.type}
              id={inputFields.searchContent.id}
              label={inputFields.searchContent.label}
              placeholder={inputFields.searchContent.placeholder}
              onChange={onChangeHandler}
            />
          )}
          name="searchContent"
          control={control}
          defaultValue={inputFields.searchContent.defaultValue}
        />
      </form>
    </div>
  );
};

export default SearchForm;
