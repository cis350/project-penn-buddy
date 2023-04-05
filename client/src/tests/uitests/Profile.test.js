/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Profile from '../../pages/Profile';
import { getUserById } from '../../api/users';
import { rootURL } from "../../utils/utils";
import Post from "../../pages/Post";

test('test that Welcome is in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} setLogin={true} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Welcome to Your Profile!/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Welcome in the document 2', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Welcome to Your Profile!/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Username in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Username:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Email in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Email:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Number in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Number:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Year in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Year:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Major in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Major:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Venmo in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Venmo:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Bio in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Bio:/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Signout button in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <Profile userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Sign Out/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});
