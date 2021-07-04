import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';

test('renders without crashing', () => {
    const { getByText } = render(<App />);
    const title = getByText(/Docler FE Homework/i);
    expect(title).toBeInTheDocument();
});
