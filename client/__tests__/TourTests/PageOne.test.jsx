import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageOne from '../../components/tour-components/page-one';
import AppContext from '../../lib/app-context';

describe('Tests for the tour component', () => {
  describe('Tests for page one of the tour component', () => {
    beforeEach(() => {
      const endTour = jest.fn();
      render(
        <AppContext.Provider value={{ endTour }}>
          <PageOne />
        </AppContext.Provider>
      );
    });

    test('It should render a welcome header', () => {
      const welcomeHeader = screen.getByTestId('welcome-header');

      expect(welcomeHeader).toBeInTheDocument();
    });

    test('It should render yes and no options to take the tour', () => {
      const takeTour = screen.getByTestId('take-tour');
      const skipTour = screen.getByTestId('skip-tour');

      expect(takeTour).toBeInTheDocument();
      expect(takeTour).toHaveTextContent('Yes');
      expect(skipTour).toBeInTheDocument();
      expect(skipTour).toHaveTextContent('No');
    });
  });
});
