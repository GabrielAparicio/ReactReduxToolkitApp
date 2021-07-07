import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { store } from '../../redux/store';
import Homepage from './Homepage';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Homepage component', () => {
  it('Renders successfully', async () => {
    const {
      getByText,
      getAllByText,
      getByPlaceholderText,
      findAllByText,
      getByTestId,
      findByText,
    } = render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    // Shows the homepage header
    const homepageHeader = getByText(/todos/i);
    expect(homepageHeader).toBeInTheDocument();

    // Search input is shown
    const searchInput = getByPlaceholderText(/keyword.../i);
    expect(searchInput).toBeInTheDocument();

    // Select control is shown
    const selectControl = getByTestId('filter-select');
    expect(selectControl).toBeInTheDocument();

    // Check if the first 15 todo items are present (based on their indexes)
    const todoList = await findAllByText(/^\d+$/);
    expect(todoList).toHaveLength(15);

    // Check if 15 more todo items are shown after scrolling
    fireEvent.scroll(window);
    const scrolledTodoList = await findAllByText(/^\d+$/);
    expect(scrolledTodoList).toHaveLength(30);

    // Showing completed todos
    userEvent.selectOptions(selectControl, 'completed');
    const completedTodos = await findAllByText(/^\d+$/);
    expect(completedTodos).toHaveLength(16);

    // Showing incomplete todos
    userEvent.selectOptions(selectControl, 'incomplete');
    const incompleteTodos = await findAllByText(/^\d+$/);
    expect(incompleteTodos).toHaveLength(14);

    // Showing all todos again
    userEvent.selectOptions(selectControl, 'all');
    const allTodos = await findAllByText(/^\d+$/);
    expect(allTodos).toHaveLength(30);

    // Showing the corresponding todos after typing 'sit' in the search input
    userEvent.type(searchInput, 'sit');
    await waitFor(() => {
      const searchedTodoList = getAllByText(/^\d+$/);
      expect(searchedTodoList).toHaveLength(2);
    });

    // Showing the corresponding message when there are no results
    userEvent.type(searchInput, 'whatever');
    const noResultMessage = await findByText(/no result for the given search parameters/i);
    expect(noResultMessage).toBeInTheDocument();
  });
});
