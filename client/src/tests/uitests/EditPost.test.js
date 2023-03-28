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

import EditPost from '../../pages/EditPost';
import { getGroupById } from '../../api/groups';
import { rootURL } from "../../utils/utils";

test('test that Edit Post is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Edit Post/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that null is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={null} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Loading/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Time is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Time/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Date is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Date/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Mode of Transportation is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Mode of Transportation/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Depart Place is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Depart Place/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Max Capacity is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Max Capacity/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Form is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/group/1`]}>
      <EditPost userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Form/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});
