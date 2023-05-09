import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

describe('Tests for the sign-in auth form', () => {
  describe('Testing the sign-up form', () => {
    beforeEach(() => {
      const addItem = jest.fn();
      render(
        <AppContext.Provider value={{ addItem }}>
          <AuthForm action='sign-up' />
        </AppContext.Provider>
      );
    });
    test('Renders the correct sign-up information', () => {
      const username = screen.getByLabelText(/username/i);
      const password = screen.getByLabelText(/password/i);
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
      const addItem = jest.fn();
      render(
        <AppContext.Provider value={{ addItem }}>
          <AuthForm action='sign-in' />
        </AppContext.Provider>
      );
    });
    test('Renders the correct sign-up information', () => {
      const username = screen.getByLabelText(/username/i);
      const password = screen.getByLabelText(/password/i);
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
