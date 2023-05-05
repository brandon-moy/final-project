import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header';
import AppContext from '../lib/app-context';

describe('Tests for the header component', () => {
  beforeEach(() => {
    const addItem = jest.fn({ user: true });
    render(
      <AppContext.Provider value={{ addItem }}>
        <Header />
      </AppContext.Provider>
    );
  });
  test('It renders a link to the home page', () => {
    const headerLink = screen.getByTestId('header-link');

    expect(headerLink).toBeInTheDocument();
    expect(headerLink).toHaveTextContent('StudyBuddy');
    expect(headerLink.href).toContain('#');
  });
});
