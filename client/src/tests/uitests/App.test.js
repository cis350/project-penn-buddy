/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import App from '../../App';

test('test that Login button is in the document', () => {
  // render the component
  const { getByLabelText } = render(<App />);
  // find the element by its role
  const LoginButton = screen.getByText(/Login/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Login button is in the document', () => {
  // render the component
  const { getByLabelText } = render(<App />);
  // find the element by its role
  const LoginButton = screen.getByText(/Register/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Home button is in the document', () => {
  // render the component
  const { getByLabelText } = render(<App />);
  // find the element by its role
  const okButton = screen.getByText(/Home/);
  // assert that the element is in the document
  expect(okButton).toBeInTheDocument();
});

test('test that About Us button is in the document', () => {
  // render the component
  const { getByLabelText } = render(<App />);
  // find the element by its role
  const okButton = screen.getByText(/About Us/);
  // assert that the element is in the document
  expect(okButton).toBeInTheDocument();
});

test('test that How We Work button is in the document', () => {
  // render the component
  const { getByLabelText } = render(<App />);
  // find the element by its role
  const okButton = screen.getByText(/How We Work/);
  // assert that the element is in the document
  expect(okButton).toBeInTheDocument();
});

// test('test that First Name is in the document', () => {
//   // render the component
//   const { getByLabelText } = render(<App />);
//   // find the element by its role
//   const firstNameInput = screen.getByLabelText('First Name');
//   // assert that the element is in the document
//   expect(firstNameInput).toBeInTheDocument();
// });

// // snapshot testing
// test('App matches snapshot', () => {
//   const component = renderer.create(<App />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('test user flow type name -> hit Login', async () => {
//   // render the component
//   render(<App />);
//   // fire the user event
//   // find the textbox and type atlanta into it
//   await userEvent.type(screen.getByRole('textbox'), 'Nicky');
//   // click on the OK button
//   await userEvent.click(screen.getByText('Login'));
//   // check that My Profile is now is the document
//   expect(screen.getByText(/My Profile/)).toBeInTheDocument();
// });
