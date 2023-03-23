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

import Post from '../../pages/Post';
import { getGroupById } from '../../api/groups';
import { rootURL } from "../../utils/utils";

describe('test that back button is in document', () => {
  test('test that back button is in the document', async () => {
    // render the component
    const { getPost } = render(
      <MemoryRouter initialEntries={[`/group/3`]}>
        <Post name="Nicky" userId={1} />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const backButton = screen.getByText(/Back to Activity Feed/);
    expect(backButton).toBeInTheDocument();
  });
});

test('test that Location is in the document', () => {
  // render the component
  const { getPost } = render(
    <MemoryRouter initialEntries={[`/group/3`]}>
      <Post name="Nicky" userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Location/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Mode of Transportation is in the document', () => {
  // render the component
  const { getPost } = render(
    <MemoryRouter initialEntries={[`/group/3`]}>
      <Post name="Nicky" userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Mode of Transportation/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

describe('test that back button is in document', () => {
  test('test that back button is in the document', async () => {
    // render the component
    const { getPost } = render(
      <MemoryRouter initialEntries={[`/group/3`]}>
        <Post name="Nicky" userId={null} />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const backButton = screen.getByText(/Loading/);
    expect(backButton).toBeInTheDocument();
  });
});
