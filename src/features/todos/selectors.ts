import { createSelector } from '@reduxjs/toolkit';
import {
  selectTodosMap,
  selectTodosIds,
  selectGroupNumber,
  selectItemsPerGroup,
} from './todosSlice';
import { selectSearchingContent, selectSearchingField } from './searchingSlice';
import { selectCurrentFilter } from './filteringSlice';

export const selectTodosArray = createSelector(
  [selectTodosMap, selectTodosIds],
  (todosMap, todosIds) => {
    return todosIds.map((todoId) => todosMap[todoId]);
  }
);

export const selectNumberOfItems = createSelector(
  [selectItemsPerGroup, selectGroupNumber],
  (itemsPerGroup, groupNumber) => itemsPerGroup * groupNumber
);

export const selectTodos = createSelector(
  [
    selectTodosArray,
    selectNumberOfItems,
    selectSearchingField,
    selectSearchingContent,
    selectCurrentFilter,
  ],
  (todosArray, numberOfItems, searchingField, searchingContent, currentFilter) => {
    const groupedTodos = todosArray.slice(0, numberOfItems);

    const searchedTodos = searchingContent
      ? groupedTodos.filter((todo) =>
          todo[searchingField].toLowerCase().includes(searchingContent.toLowerCase())
        )
      : groupedTodos;

    switch (currentFilter) {
      case 'all':
        return searchedTodos;
      case 'completed':
        return searchedTodos.filter((todo) => todo.completed);
      case 'incomplete':
        return searchedTodos.filter((todo) => !todo.completed);
      default:
        return searchedTodos;
    }
  }
);
