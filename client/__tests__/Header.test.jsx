import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header';
import AppContext from '../lib/app-context';

describe('Tests for the header component', () => {
  describe('Tests for when a user is signed in', () => {

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

    test('It renders an image in the corner when user is signed in', () => {
      const headerImg = screen.getByTestId('header-img');

      expect(headerImg).toBeInTheDocument();
      expect(headerImg.src).toContain('/images/sit.webp');
    });

    test('It renders a sign-out button when the user is signed in', () => {
      const signOutButton = screen.getByTestId('sign-out-button');

      expect(signOutButton).toBeInTheDocument();
      expect(signOutButton).toHaveTextContent('Sign Out');
    });

  });
});
