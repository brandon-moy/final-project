import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTwo from '../components/tour-components/page-two';

describe('Tests for the tour component', () => {
  describe('Tests for page one of the tour component', () => {
    beforeEach(() => {
      render(
        <PageTwo />
      );
    });

    test('It should render a display for the New Folder button', () => {
      const newFolder = screen.getByTestId('new-folder');

      expect(newFolder).toBeInTheDocument();
      expect(newFolder).toHaveTextContent('New Folder');
    });

    test('It should render arrows pointing to the New Folder test', () => {
      const pointArrows = screen.getByTestId('point-arrows');

      expect(pointArrows).toBeInTheDocument();
    });

    test('It should render instructions text on creating a folder', () => {
      const pageTwoInstructions = screen.getByTestId('page-two-instructions');

      expect(pageTwoInstructions).toBeInTheDocument();
    });
  });
});
