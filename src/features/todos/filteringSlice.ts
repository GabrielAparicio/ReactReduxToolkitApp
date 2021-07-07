import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export type VisibilityFilters = 'all' | 'completed' | 'incomplete';

interface FilteringState {
  currentFilter: VisibilityFilters;
}

const initialState: FilteringState = {
  currentFilter: 'all',
};

const filteringSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setCurrentFilter(state, action: PayloadAction<VisibilityFilters>) {
      state.currentFilter = action.payload;
    },
  },
});

// Selectors
export const selectCurrentFilter = (state: RootState) => state.filtering.currentFilter;

// Actions
export const { setCurrentFilter } = filteringSlice.actions;

export default filteringSlice.reducer;
