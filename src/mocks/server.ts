import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL, HOMEPAGE_ENDPOINT } from '../services/apiService';
import mockedTodos from './mockedTodos';

const server = setupServer(
  rest.get(`${BASE_URL}${HOMEPAGE_ENDPOINT}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedTodos));
  })
);

export { server, rest };