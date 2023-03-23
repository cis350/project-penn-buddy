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
      <CreatePost name="Nicky" userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/New Post/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that statement is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <CreatePost name="Nicky" userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Find your Travel Buddies!/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

// do UI testing for text boxes
