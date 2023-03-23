/**
* @jest-environment jsdom
*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
// import testing library functions
import {
  render, screen, cleanup, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserInfo from '../../components/UserInfo';

describe('test that time box is in document', () => {
  test('test that time box is in the document', async () => {
    // render the component
    const { getHistory } = render(
      <MemoryRouter>
        <UserInfo
          userName="free"
          userEmail="free"
          userNumber="free"
          userYear="free"
          userMajor="free"
          userVenmo="free"
          userBio="free"
        />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const dest = screen.getByText(/Username:/);
    expect(dest).toBeInTheDocument();
  });
});
