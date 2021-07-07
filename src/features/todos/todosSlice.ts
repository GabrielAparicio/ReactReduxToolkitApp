import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { fetchTodos } from '../../services/apiService';

export type TodoField = 'title';

export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
}

type TodosResponse = Todo[];

interface TodosState {
  todos: {
    byIds: {
      [key: string]: Todo;
    };
    todosIds: string[];
    itemsPerGroup: number;
    numberOfGroups: number;
    groupNumber: number;
    hasMore: boolean;
  };
  status: 'idle' | 'loading' | 'failed';
}

export const fetchTodosThunk = createAsyncThunk('todos/fetch', async () => {
  const response = await fetchTodos();
  return response as unknown as TodosResponse;
});

// Using normalization to define the state
const initialState: TodosState = {
  todos: {
    byIds: {},
    todosIds: [],
    itemsPerGroup: 15,
    numberOfGroups: 0,
    groupNumber: 0,
    hasMore: false,
  },
  status: 'idle',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getMoreItems(state) {
      if (state.todos.groupNumber < state.todos.numberOfGroups) state.todos.groupNumber++;
      state.todos.hasMore = state.todos.groupNumber < state.todos.numberOfGroups;
    },
    resetState(state) {
      state.todos = {
        byIds: {},
        todosIds: [],
        itemsPerGroup: 15,
        numberOfGroups: 0,
        groupNumber: 0,
        hasMore: false,
      };
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.status = 'loading';
        state.todos = {
          byIds: {},
          todosIds: [],
          itemsPerGroup: 15,
          numberOfGroups: 0,
          groupNumber: 0,
          hasMore: false,
        };
      })
      .addCase(fetchTodosThunk.fulfilled, (state, { payload: todos }) => {
        state.status = 'idle';
        state.todos.todosIds = todos.map((todo) => todo.id);
        todos.forEach((todo) => {
          state.todos.byIds[todo.id] = todo;
        });
        state.todos.numberOfGroups = Math.ceil(todos.length / state.todos.itemsPerGroup);
        state.todos.groupNumber = state.todos.numberOfGroups > 0 ? 1 : 0;
        state.todos.hasMore = state.todos.numberOfGroups > 1;
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.status = 'failed';
        state.todos = {
          byIds: {},
          todosIds: [],
          itemsPerGroup: 15,
          numberOfGroups: 0,
          groupNumber: 0,
          hasMore: false,
        };
      });
  },
});

// Selectors
export const selectTodosIds = (state: RootState) => state.todos.todos.todosIds;
export const selectTodosMap = (state: RootState) => state.todos.todos.byIds;
export const selectStatus = (state: RootState) => state.todos.status;
export const selectGroupNumber = (state: RootState) => state.todos.todos.groupNumber;
export const selectItemsPerGroup = (state: RootState) => state.todos.todos.itemsPerGroup;
export const selectHasMore = (state: RootState) => state.todos.todos.hasMore;

// Actions
export const { getMoreItems } = todosSlice.actions;

export default todosSlice.reducer;
