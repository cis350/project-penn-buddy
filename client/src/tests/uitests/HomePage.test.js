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
import HomePage from '../../pages/HomePage';
import AboutUs from '../../pages/AboutUs';

test('test that Hello is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/Hello/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});

test('test that Hello is in the document', () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <AboutUs />
    </MemoryRouter>,
  );
  // find the element by its role
  const LoginButton = screen.getByText(/About Us/);
  // assert that the element is in the document
  expect(LoginButton).toBeInTheDocument();
});
