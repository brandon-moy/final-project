import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteDeck from '../../components/modal-components/deletedeck';

describe('Tests for a modal component', () => {
  describe('Tests for the Delete Deck modal form component', () => {
    beforeEach(() => {
      const deck = jest.fn({ deckName: 'deck' });
      render(
        <DeleteDeck deck={deck} />
      );
    });

    test('It should render a warning message', () => {
      const deleteWarning = screen.getByTestId('delete-warning');

      expect(deleteWarning).toBeInTheDocument();
      expect(deleteWarning).toHaveTextContent('Deleting this deck will delete all flashcards associated with this deck!');
    });

    test('It should render a Cancel and Confirm button', () => {
      const cancelDelete = screen.getByTestId('cancel-delete');
      const confirmDelete = screen.getByTestId('confirm-delete');

      expect(cancelDelete).toBeInTheDocument();
      expect(cancelDelete).toHaveTextContent('Cancel');
      expect(confirmDelete).toBeInTheDocument();
      expect(confirmDelete).toHaveTextContent('Confirm');
    });
  });
});
