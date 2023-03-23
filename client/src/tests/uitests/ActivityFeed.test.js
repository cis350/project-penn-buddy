import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivityFeed from '../../pages/ActivityFeed';
import ActivityFeedPost from '../../components/ActivityFeedPost';
import { getAllGroups } from '../../api/groups';

describe('test that Activity Feed is in document', () => {
  test('test that Activity Feed is in the document', async () => {
    // render the component
    const { getPost } = render(<ActivityFeed />);
    // assert that the element is in the document
    const postDetailsButton = screen.getByText(/Activity Feed/);
    expect(postDetailsButton).toBeInTheDocument();
  });
});
