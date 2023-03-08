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

import Post from '../pages/Post';
import { getGroupById } from '../api/groups';
import { rootURL } from "../utils/utils";

// const allGroups = [
//   {
//     id: 1,
//     ownerId: 1,
//     location: "PHL Airport",
//     departDate: "2023-08-29T09:12:33.001Z",
//     modeTransport: "Uber/Lyft XL",
//     departPlace: "The Radian",
//     maxCapacity: 4,
//     currCapacity: 3,
//     currMemberIds: [
//       1,
//       3,
//       2,
//     ],
//   },
//   {
//     id: 2,
//     ownerId: 3,
//     location: "EWR Airport",
//     departDate: "2023-07-03T17:22:00.001Z",
//     modeTransport: "Uber/Lyft XL",
//     departPlace: "Lauder",
//     maxCapacity: 4,
//     currCapacity: 2,
//     currMemberIds: [
//       3,
//       4,
//     ],
//   },
//   {
//     id: 3,
//     ownerId: 2,
//     location: "JFK Airport",
//     departDate: "2023-03-14T15:00:00.001Z",
//     modeTransport: "Uber/Lyft",
//     departPlace: "Hill",
//     maxCapacity: 3,
//     currCapacity: 3,
//     currMemberIds: [
//       2,
//       3,
//       1,
//     ],
//   },
// ];

// const mockAxios = new MockAdapter(axios);
// mockAxios.onGet(`${rootURL}/group/3`).reply(200, allGroups[2]);

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
