import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../app';

test('should render app', () => {
  render(<App />);
  const appElement = screen.getByTestId('test-1');
  expect(appElement).toBeInTheDocument();
  expect(appElement).toHaveTextContent('Sorry, an unexpected error occured. Please try again later!');
});
