import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteForm from '../../components/modal-components/deletecard';

describe('Tests for a modal component', () => {
  describe('Tests for the delete card modal form', () => {
    beforeEach(() => {
      render(
        <DeleteForm />
      );
    });

    test('It should render a warning header', () => {
      const deleteCardHeader = screen.getByTestId('delete-card-header');

      expect(deleteCardHeader).toBeInTheDocument();
      expect(deleteCardHeader).toHaveTextContent('Are you sure you want to delete this card?');
    });

    test('The form should have cancel and confirm buttons', () => {
      const cancelDelete = screen.getByTestId('cancel-delete');
      const confirmDelete = screen.getByTestId('confirm-delete');

      expect(cancelDelete).toBeInTheDocument();
      expect(cancelDelete).toHaveTextContent('Cancel');
      expect(confirmDelete).toBeInTheDocument();
      expect(confirmDelete).toHaveTextContent('Continue');
    });
  });
});
