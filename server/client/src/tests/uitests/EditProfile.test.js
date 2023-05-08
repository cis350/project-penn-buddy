/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import EditProfile from '../../pages/EditProfile';
import UserInfo from '../../components/UserInfo';

const mockUser = {
  id: 1,
  name: 'testuser',
  pennId: '12345',
  email: 'test@email.com',
  number: '1234567890',
  year: 'Sophomore',
  major: 'Computer Science',
  venmo: 'testvenmo',
  bio: 'Test bio',
  rating: '4.5',
  password: 'testpassword',
};

test('test that Update button in the document', () => {
  // render the component
  const { getProfile } = render(
    <MemoryRouter>
      <EditProfile userId={1} />
    </MemoryRouter>,
  );
  // find the element by its role
  const text = screen.getByText(/Update/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Edit Profile is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <EditProfile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Edit Profile/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test Find is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <EditProfile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByText(/Edit/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

test('test that Null is in the document', () => {
  // render the component
  const { getNewPost } = render(
    <MemoryRouter initialEntries={[`/user/1`]}>
      <EditProfile userId={null} />
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
      <EditProfile userId={1} />
    </MemoryRouter>,
  );
    // find the element by its role
  const text = screen.getByTestId(/Form/);
  // assert that the element is in the document
  expect(text).toBeInTheDocument();
});

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

test('renders UserInfo component', () => {
  render(
    <MemoryRouter>
      <UserInfo {...defaultProps} />
    </MemoryRouter>,
  );

  const usernameElement = screen.getByText(/Username/);
  const pennIdInput = screen.getByText(/PennID/);
  const emailInput = screen.getByText(/Email/);
  const numberInput = screen.getByText(/Number/);
  const yearInput = screen.getByText(/Year/);
  const majorInput = screen.getByText(/Major/);
  const venmoInput = screen.getByText(/Venmo/);
  const bioInput = screen.getByText(/Bio/);
  const editButton = screen.getByRole('button', { name: /Edit Profile/ });
  const signOutButton = screen.getByRole('button', { name: /Sign Out/ });
  const deleteUserButton = screen.getByRole('button', { name: /Delete User/ });

  expect(usernameElement).toBeInTheDocument();
  expect(pennIdInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(yearInput).toBeInTheDocument();
  expect(majorInput).toBeInTheDocument();
  expect(venmoInput).toBeInTheDocument();
  expect(bioInput).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
  expect(deleteUserButton).toBeInTheDocument();
});

test('test user profile -> click Edit Profile', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <EditProfile />
    </MemoryRouter>,
  );
  // fire the event
  // find the textbox and type atlanta into it
  await userEvent.click(screen.getByText(/Update/));
  // check that My Profile is now is the document
  expect(screen.getByText(/Update/)).toBeInTheDocument();
});
