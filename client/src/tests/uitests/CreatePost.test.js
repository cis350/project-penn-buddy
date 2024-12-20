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

import CreatePost from '../../pages/CreatePost';
import { getGroupById } from '../../api/groups';
import { rootURL } from "../../utils/utils";

test('test that New Post is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <CreatePost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Create Post/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test Find is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <CreatePost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Find/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Null is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <CreatePost userId={null} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Loading/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Form is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <CreatePost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Form/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});
