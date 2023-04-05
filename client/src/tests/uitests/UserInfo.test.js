/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserInfo from '../../components/UserInfo';
import * as userInfoModule from '../../api/users';
import * as groupInfoModule from '../../api/groups';

const defaultProps = {
  userId: 1,
  userName: 'testuser',
  userPennId: '12345',
  userEmail: 'test@email.com',
  userMajor: 'Computer Science',
  userVenmo: 'testvenmo',
  userYear: 'Sophomore',
  userNumber: '1234567890',
  userBio: 'Test bio',
  setLogin: () => {},
};

describe('test that user info is in document', () => {
  test('test that user info details button is in the document', async () => {
    // render the component
    const { getProfile } = render(
      <MemoryRouter>
        <UserInfo
          userName="Grace"
          userId="2"
          userPennId="123456"
          userEmail="grace@upenn.edu"
          userNumber="1234567891"
          userYear="Sophomore"
          userMajor="Computer Science"
          userVenmo="grace_venmoooo"
          userBio="I love CIS350 so so much!!!!"
        />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const signOutButton = screen.getByText(/Sign Out/);
    expect(signOutButton).toBeInTheDocument();
    const editProfileButton = screen.getByText(/Edit Profile/);
    expect(editProfileButton).toBeInTheDocument();
    const deleteUserButton = screen.getByText(/Delete User/);
    expect(deleteUserButton).toBeInTheDocument();
  });
});

test('test user profile -> click Delete User', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <UserInfo />
    </MemoryRouter>,
  );
  // fire the event
  // find the textbox and type atlanta into it
  await userEvent.click(screen.getByText(/Delete User/));
  // check that My Profile is now is the document
  expect(screen.getByText(/Delete User/)).toBeInTheDocument();
});

test('test user profile -> click Edit Profile', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <UserInfo />
    </MemoryRouter>,
  );
  // fire the event
  await userEvent.click(screen.getByText(/Edit Profile/));
  // check that My Profile is now is the document
  expect(screen.getByText(/Edit Profile/)).toBeInTheDocument();
});

// test('test user profile -> click Sign Out', async () => {
//   // render the component
//   const { getByLabelText } = render(
//     <MemoryRouter>
//       <UserInfo />
//     </MemoryRouter>,
//   );
//   await userEvent.click(screen.getByText(/Sign Out/));
//   // check that My Profile is now is the document
//   expect(screen.getByText(/Login/)).toBeInTheDocument();
// });

test('handleSignOut function', async () => {
  const mockSetLogin = jest.fn();
  const { getByText } = render(
    <MemoryRouter>
      <UserInfo {...defaultProps} setLogin={mockSetLogin} />
    </MemoryRouter>,
  );

  const signOutButton = getByText(/Sign Out/i);
  await userEvent.click(signOutButton);

  expect(mockSetLogin).toHaveBeenCalledWith(false);
});

test('handleDeleteUser function', async () => {
  const mockDeleteUser = jest.fn();
  const mockDeleteGroupsByOwnerId = jest.fn();
  const mockSetLogin = jest.fn();

  jest.spyOn(userInfoModule, 'deleteUser').mockImplementation(mockDeleteUser);
  jest.spyOn(groupInfoModule, 'deleteGroupsByOwnerId').mockImplementation(mockDeleteGroupsByOwnerId);

  const { getByText } = render(
    <MemoryRouter>
      <UserInfo {...defaultProps} setLogin={mockSetLogin} />
    </MemoryRouter>,
  );

  const deleteUserButton = getByText(/Delete User/i);
  await userEvent.click(deleteUserButton);

  expect(mockDeleteUser).toHaveBeenCalled();
  expect(mockDeleteGroupsByOwnerId).toHaveBeenCalled();

  userInfoModule.deleteUser.mockRestore();
  groupInfoModule.deleteGroupsByOwnerId.mockRestore();
});
