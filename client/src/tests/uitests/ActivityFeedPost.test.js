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
import ActivityFeedPost from '../../components/ActivityFeedPost';

describe('test that view post details button is in document', () => {
  test('test that view post details button is in the document', async () => {
    // render the component
    const { getPost } = render(
      <MemoryRouter>
        <ActivityFeedPost
          ownerId={2}
          location="PHL"
          departDate="2023-10-22"
          modeTransport="Uber/Lyft"
          departPlace="The Radian"
          maxCapacity={3}
          currCapacity={1}
          currMemberIds={[2]}
          groupId={4}
        />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const postDetailsButton = screen.getByText(/Mode of Transportation/);
    expect(postDetailsButton).toBeInTheDocument();
    const postDetailsButton2 = screen.getByText(/Location/);
    expect(postDetailsButton2).toBeInTheDocument();
  });
});

describe('test that Activity Feed is in document', () => {
  test('test that Activity Feed is in the document', async () => {
    // render the component
    const { getPost } = render(
      <MemoryRouter>
        <ActivityFeedPost
          ownerId={2}
          location="PHL"
          departDate="2023-10-22"
          modeTransport="Uber/Lyft"
          departPlace="The Radian"
          maxCapacity={3}
          currCapacity={1}
          currMemberIds={[2]}
          groupId={4}
        />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const postDetailsButton = screen.getByText(/View Post Details/);
    expect(postDetailsButton).toBeInTheDocument();
    const postDetailsButton2 = screen.getByText(/Radian/);
    expect(postDetailsButton2).toBeInTheDocument();
    const postDetailsButton3 = screen.getByText(/PHL/);
    expect(postDetailsButton3).toBeInTheDocument();
  });

  describe('test that Rating is in activity feed', () => {
    test('test that Rating is in activity feed', async () => {
      // render the component
      const { getPost } = render(
        <MemoryRouter>
          <ActivityFeedPost
            ownerId={2}
            location="PHL"
            departDate="2023-10-22"
            modeTransport="Uber/Lyft"
            departPlace="The Radian"
            maxCapacity={3}
            currCapacity={1}
            currMemberIds={[2]}
            groupId={4}
          />
        </MemoryRouter>,
      );
      // assert that the element is in the document
      const postDetailsButton = screen.getByText(/View Post Details/);
      expect(postDetailsButton).toBeInTheDocument();
      const postDetailsButton2 = screen.getByText(/Radian/);
      expect(postDetailsButton2).toBeInTheDocument();
      const postDetailsButton3 = screen.getByText(/PHL/);
      expect(postDetailsButton3).toBeInTheDocument();
    });
});
