/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

test('test that Activity Feed is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/Activity Feed/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Activity Feed is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/Chat Room/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Activity Feed is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/My History/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Activity Feed is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/Create Post/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test user flow type name -> hit Login', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // fire the user event
  // find the textbox and type atlanta into it
  // click on the OK button
  await userEvent.click(screen.getByText('Activity Feed'));
  // check that My Profile is now is the document
  expect(screen.getByText(/Activity Feed/)).toBeInTheDocument();
});

test('test user flow type name -> hit Login', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  // fire the user event
  // find the textbox and type atlanta into it
  // click on the OK button
  await userEvent.click(screen.getByText('My History'));
  // check that My Profile is now is the document
  expect(screen.getByText(/My History/)).toBeInTheDocument();
});

// test('test user flow type name -> hit Login', async () => {
//   // render the component
//   const { getByLabelText } = render(
//     <MemoryRouter>
//       <Navbar />
//     </MemoryRouter>,
//   );
//   // fire the user event
//   // find the textbox and type atlanta into it
//   // click on the OK button
//   await userEvent.click(screen.getByText('Chat Room'));
//   // check that My Profile is now is the document
//   expect(screen.getByText(/All Messages/)).toBeInTheDocument();
// });
