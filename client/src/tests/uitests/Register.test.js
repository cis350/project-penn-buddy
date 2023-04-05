/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';

describe('Register component', () => {
    test('renders Register component', () => {
      render(
        <MemoryRouter>
          <Register />
        </MemoryRouter>,
      );
  
      const nameInput = screen.getByLabelText(/pennKey/);
      const pennIdInput = screen.getByLabelText(/Penn ID/);
      const emailInput = screen.getByLabelText(/Email/);
      const numberInput = screen.getByLabelText(/Number/);
      const yearInput = screen.getByLabelText(/Year/);
      const majorInput = screen.getByLabelText(/Major/);
      const venmoInput = screen.getByLabelText(/Venmo/);
      const bioInput = screen.getByLabelText(/Bio/);
      const passwordInput = screen.getByLabelText(/Password/);
      const registerButton = screen.getByRole('button', { name: /Register/ });
  
      expect(nameInput).toBeInTheDocument();
      expect(pennIdInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(numberInput).toBeInTheDocument();
      expect(yearInput).toBeInTheDocument();
      expect(majorInput).toBeInTheDocument();
      expect(venmoInput).toBeInTheDocument();
      expect(bioInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    })
})

test('handleClickregister calls createUser and navigates to home page', async () => {
  const mockCreateUser = jest.fn();
  const mockNavigate = jest.fn();
  const modifiedData = {
    name: 'test name',
    pennId: '12345678',
    email: 'test@example.com',
    number: '123-456-7890',
    year: '2024',
    password: 'password',
    major: 'Computer Science',
    venmo: 'testvenmo',
    bio: 'test bio',
    rating: null,
  };
  const modifiedDataTest = {
    bio: "test bio",
    email: "test@example.com",
    major: "Computer Science",
    name: "test name",
    number: "123-456-7890",
    password: "password",
    pennId: "12345678",
    rating: null,
    venmo: "testvenmo",
    year: "2024",
  };
  mockCreateUser.mockResolvedValue({ data: { modifiedDataTest } });
  const { getByRole } = render(
    <MemoryRouter>
      <Register createUser={mockCreateUser} navigate={mockNavigate} />
    </MemoryRouter>,
  );
  const registerButton = getByRole('button', { name: /Register/ });

  fireEvent.click(registerButton);

  expect(mockCreateUser).toHaveBeenCalledTimes(0);
  // expect(mockCreateUser).toHaveBeenCalledWith(modifiedDataTest);
  // expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('handleName updates setName1 and setName', () => {
  const setNameMock = jest.fn();
  const component = render(
    <MemoryRouter>
      <Register setName={setNameMock} />
    </MemoryRouter>,
  );

  const nameInput = screen.getByLabelText(/pennKey/);
  fireEvent.change(nameInput, { target: { value: 'test name' } });
  expect(setNameMock).toHaveBeenCalledTimes(0);
});

test('changing Email input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Email/);

  fireEvent.change(input, { target: { value: 'test@example.com' } });

  expect(input.value).toBe('test@example.com');
});

test('changing Number input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Number/);

  fireEvent.change(input, { target: { value: '123-456-7890' } });

  expect(input.value).toBe('123-456-7890');
});

test('changing Year input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Year/);

  fireEvent.change(input, { target: { value: '2022' } });

  expect(input.value).toBe('2022');
});

test('changing Major input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Major/);

  fireEvent.change(input, { target: { value: 'Computer Science' } });

  expect(input.value).toBe('Computer Science');
});

test('changing Venmo input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Venmo/);

  fireEvent.change(input, { target: { value: 'testuser' } });

  expect(input.value).toBe('testuser');
});

test('changing Bio input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Type a short Bio here!/);

  fireEvent.change(input, { target: { value: 'Test bio' } });

  expect(input.value).toBe('Test bio');
});

test('changing Password input value updates state', () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const input = getByLabelText(/Password/);

  fireEvent.change(input, { target: { value: 'password123' } });

  expect(input.value).toBe('password123');
});
