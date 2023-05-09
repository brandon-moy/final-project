import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

describe('Tests for the sign-in auth form', () => {
  describe('Testing the sign-up form', () => {
    beforeEach(() => {
      const user = jest.fn({ user: false });
      render(
        <AppContext.Provider value={{ user }}>
          <AuthForm action='sign-up' />
        </AppContext.Provider>
      );
    });

    test('Renders the correct sign-up information', () => {
      const username = screen.getByTestId('auth-username');
      const password = screen.getByTestId('auth-password');
      const switchAuth = screen.getByTestId('switch-auth');
      const submitButton = screen.getByTestId('submit');

      expect(username).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(switchAuth).toBeInTheDocument();
      expect(switchAuth.href).toContain('sign-in');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Sign Up');
    });

  });

  describe('Testing the sign-in form', () => {
    beforeEach(() => {
      const user = jest.fn({ user: false });
      render(
        <AppContext.Provider value={{ user }}>
          <AuthForm action='sign-up' />
        </AppContext.Provider>
      );
    });

    test('Renders content for the sign-in form', () => {
      const username = screen.getByTestId('auth-username');
      const password = screen.getByTestId('auth-password');
      const switchAuth = screen.getByTestId('switch-auth');
      const submitButton = screen.getByTestId('submit');

      expect(username).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(switchAuth).toBeInTheDocument();
      expect(switchAuth.href).toContain('sign-up');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Sign In');
    });
  });
});
