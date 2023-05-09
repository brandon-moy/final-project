import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDeck from '../components/modal-components/newdeck';

describe('Tests for a modal component', () => {
  describe('Tests for the NewDeck modal component', () => {
    beforeEach(() => {
      render(
        <NewDeck />
      );
    });
    test('The modal should display the title of the form', () => {
      const modalHeader = screen.getByTestId('new-deck-header');

      expect(modalHeader).toBeInTheDocument();
      expect(modalHeader).toHaveTextContent('Create New Deck');
    });
  });
});
