import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../pages/notfound';

test('Should render not found page elements', () => {
  render(<NotFound />);
  const apologyText = screen.getByTestId('not-found-text');
  expect(apologyText).toBeInTheDocument();
  expect(apologyText).toHaveTextContent('Sorry, we could not find the page you were looking for!');

  const notFoundImage = screen.getByAltText('Not Found Image');
  expect(notFoundImage).toBeInTheDocument();
  expect(notFoundImage.src).toContain('/images/shocked.webp');

  const returnHomeLink = screen.getByTestId('not-found-return');
  expect(returnHomeLink).toBeInTheDocument();
  expect(returnHomeLink).toHaveTextContent('Return Home');
  expect(returnHomeLink.href).toContain('#');
});
