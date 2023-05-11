import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../pages/notfound';

describe('Should render not found page elements', () => {
  describe('Tests for individual elements on Not Found page', () => {
    beforeEach(() => render(<NotFound />));

    test('Renders the not found text on the page', () => {
      const apologyText = screen.getByTestId('not-found-text');
      expect(apologyText).toBeInTheDocument();
      expect(apologyText).toHaveTextContent('Sorry, we could not find the page you were looking for!');
    });

    test('Renders the not found image on the page', () => {
      const notFoundImage = screen.getByAltText('Not Found Image');
      expect(notFoundImage).toBeInTheDocument();
      // write test to not break if source material changes
      // have a container for an image, and test if the parent element exists
      expect(notFoundImage.src).toContain('/images/shocked.webp');
    });

    test('Renders the link to return to home page on screen', () => {
      const returnHomeLink = screen.getByTestId('not-found-return');
      expect(returnHomeLink).toBeInTheDocument();
      expect(returnHomeLink).toHaveTextContent('Return Home');
      expect(returnHomeLink.href).toContain('#');
    });
  });
});
