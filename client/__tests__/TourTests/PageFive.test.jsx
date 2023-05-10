import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageFive from '../../components/tour-components/page-five';
import AppContext from '../../lib/app-context';

describe('Tests for the tour component', () => {
  describe('Tests for Page Five of the tour component', () => {
    beforeEach(() => {
      const endTour = jest.fn();
      render(
        <AppContext.Provider value={{ endTour }}>
          <PageFive />
        </AppContext.Provider>
      );
    });

    test('It renders a message in the message box', () => {
      const pageFiveText = screen.getByTestId('page-five-text');

      expect(pageFiveText).toBeInTheDocument();
    });

    test('It renders a get started button', () => {
      const getStartedButton = screen.getByTestId('get-started-button');

      expect(getStartedButton).toBeInTheDocument();
      expect(getStartedButton).toHaveTextContent('Get Started!');
    });
  });
});
