import axios from 'axios';

export const BASE_URL = 'https://jsonplaceholder.typicode.com';
export const HOMEPAGE_ENDPOINT = '/todos';

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const fetchTodos = async () => {
  const response = await axiosInstance.get(HOMEPAGE_ENDPOINT);
  return response.data;
};
