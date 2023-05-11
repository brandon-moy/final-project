import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoCards from '../components/nocards';

describe('Test for no cards component', () => {
  describe('Tests for the page rendered when there are no cards saved', () => {
    beforeEach(() => {
      render(
        <NoCards deckId={1} />
      );
    });

    test('There should be a header and message on the no cards page', () => {
      const noCardsHeader = screen.getByTestId('no-cards-header');
      const noCardsMessage = screen.getByTestId('no-cards-message');

      expect(noCardsHeader).toBeInTheDocument();
      expect(noCardsMessage).toBeInTheDocument();
    });

    test('There should be a link to add cards', () => {
      const addCardsLink = screen.getByTestId('add-cards-link');

      expect(addCardsLink).toBeInTheDocument();
      expect(addCardsLink.href).toContain('add-card');
    });
  });
});
