import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders basketball players title', () => {
  act(() => {
    render(<App />);
  });
  const titleElement = screen.getByText(/Basketball Players/i);
  expect(titleElement).toBeInTheDocument();
});
