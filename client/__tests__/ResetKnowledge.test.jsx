import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetKnowledge from '../components/modal-components/resetknowledge';

describe('Tests for a modal component', () => {
  describe('Tests for the reset knowledge form component', () => {
    beforeEach(() => {
      const deck = jest.fn({ deckName: 'test' });
      render(
        <ResetKnowledge deck={deck} />
      );
    });

    test('The form should render a header', () => {
      const resetHeader = screen.getByTestId('reset-header');

      expect(resetHeader).toBeInTheDocument();
      expect(resetHeader).toHaveTextContent('Are you sure you want to reset this deck?');
    });

    test('The form should render a warning message', () => {
      const resetWarning = screen.getByTestId('reset-warning');

      expect(resetWarning).toBeInTheDocument();
    });

    test('The form should render a confirm and cancel button', () => {
      const cancelButton = screen.getByTestId('cancel-button');
      const confirmButton = screen.getByTestId('confirm-button');

      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveTextContent('Cancel');
      expect(confirmButton).toBeInTheDocument();
      expect(confirmButton).toHaveTextContent('Confirm');
    });
  });
});
