import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageFour from '../../components/tour-components/page-four';

describe('Tests for the tour component', () => {
  describe('Tests for Page Four of the tour component', () => {
    beforeEach(() => {
      render(
        <PageFour />
      );
    });

    test('It should render the header title', () => {
      const tourTitle = screen.getByTestId('tour-title');

      expect(tourTitle).toBeInTheDocument();
      expect(tourTitle).toHaveTextContent('StudyBuddy');
    });

    test('It should render arrows to point to the title', () => {
      const pointArrows = screen.getByTestId('point-arrows');

      expect(pointArrows).toBeInTheDocument();
    });

    test('It should render instructions to return to home screen', () => {
      const pageFourInstructions = screen.getByTestId('page-four-instructions');

      expect(pageFourInstructions).toBeInTheDocument();
      expect(pageFourInstructions.textContent).toContain('clicking the title');
      expect(pageFourInstructions.textContent).toContain('home screen');
    });
  });
});
