// import React from 'react';
// import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import AppContext from '../lib/app-context';
// // import App from '../app';
// import AuthForm from '../components/auth-form';

// describe('Tests foer the form submit function', () => {
//   describe('Test for the sign up submit event', () => {
//     beforeEach(() => {
//       const isLoading = jest.fn();
//       const isError = jest.fn();
//       const completeLoading = jest.fn();
//       render(
//         <AppContext.Provider value={{ isLoading, isError, completeLoading }}>
//           {/* need to render App to gain access to spinner to locate and
//           await for spinner to disappear */}
//           <AuthForm />
//         </AppContext.Provider>
//       );
//     });

//     // should move to it's own file, test form and test form submit in different files
//     test('Successfully submits form data', async () => {
// const username = screen.getByRole('textbox', { name: 'Username' });
// const password = screen.getByTestId('auth-password');
//       const submitButton = screen.getByTestId('submit');

//       // RTL does not test state
//       fireEvent.change(username, { target: { value: 'bees@bees.com' } });
//       fireEvent.change(password, { target: { value: 'beepositive' } });
//       fireEvent.click(submitButton);

//       const spinner = screen.getByTestId('spinner');
//       await waitForElementToBeRemoved(spinner);
//     });
//   });
// });
