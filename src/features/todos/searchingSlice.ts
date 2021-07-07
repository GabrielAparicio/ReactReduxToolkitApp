import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { TodoField } from './todosSlice';

interface SearchingState {
  field: TodoField;
  content: string;
}

const initialState: SearchingState = {
  field: 'title',
  content: '',
};

const searchingSlice = createSlice({
  name: 'searching',
  initialState,
  reducers: {
    setSearchingField(state, action: PayloadAction<TodoField>) {
      state.field = action.payload;
    },
    setSearchingContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
  },
});

// Selectors
export const selectSearchingField = (state: RootState) => state.searching.field;
export const selectSearchingContent = (state: RootState) => state.searching.content;

// Actions
export const { setSearchingContent, setSearchingField } = searchingSlice.actions;

export default searchingSlice.reducer;
