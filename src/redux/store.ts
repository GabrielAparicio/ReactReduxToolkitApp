import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import searchingReducer from '../features/todos/searchingSlice';
import filteringReducer from '../features/todos/filteringSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    searching: searchingReducer,
    filtering: filteringReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
