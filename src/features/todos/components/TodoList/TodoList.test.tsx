import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { server, rest } from '../../../../mocks/server';
import { store } from '../../../../redux/store';
import TodoList from './TodoList';
import { BASE_URL, HOMEPAGE_ENDPOINT } from '../../../../services/apiService';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('TodoList component', () => {
  it('Renders successfully with a no empty list (big enough to perform scrolling)', async () => {
    const { getByText, findAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    // loading message is shown while API request is in progress
    const loadingMessage = getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();

    // check if the first 15 todo items are present (based on their indexes)
    const todoList = await findAllByText(/^\d+$/);
    expect(todoList).toHaveLength(15);

    // check if 15 more todo items are shown after scrolling
    fireEvent.scroll(window);
    const scrolledTodoList = await findAllByText(/^\d+$/);
    expect(scrolledTodoList).toHaveLength(30);
  });

  it('Renders successfully with an empty list', async () => {
    server.use(
      rest.get(`${BASE_URL}${HOMEPAGE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );

    const { getByText, findByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    // loading message is shown while API request is in progress
    const loadingMessage = getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();

    // no items message is shown
    const noItemsMessage = await findByText(/there are no items/i);
    expect(noItemsMessage).toBeInTheDocument();
  });

  it('Fails to render', async () => {
    server.use(
      rest.get(`${BASE_URL}${HOMEPAGE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { getByText, findByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    // loading message is shown while API request is in progress
    const loadingMessage = getByText(/loading.../i);
    expect(loadingMessage).toBeInTheDocument();

    // Let the user know that an error ocurred
    const wrongMessage = await findByText(/something went wrong/i);
    expect(wrongMessage).toBeInTheDocument();

    // Specific information about the error is shown
    const fetchingFailedMessage = await findByText(/fetching operation failed/i);
    expect(fetchingFailedMessage).toBeInTheDocument();

    // Retry button is present
    const tryAgainButton = await findByText(/try again/i);
    expect(tryAgainButton).toBeInTheDocument();
  });
});
