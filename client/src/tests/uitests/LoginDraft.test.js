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
import Login from '../../pages/LoginDraft';

test('renders Login component', () => {
    const { getByLabelText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>,
      );
    // const { getByLabelText} = render(<Login />);
    const pennKey = screen.getByLabelText(/pennKey/);
    const pennId = screen.getByLabelText(/Penn ID/);
    const password = screen.getByLabelText(/Password/);
    const loginButton = screen.getByRole('button', { name: /Login/ });
    const registerLink = screen.getByRole('link', { name: /Click to Register/ });
  
    expect(pennKey).toBeInTheDocument();
    expect(pennId).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  test('handleClickLogin sets setLogin state to true', () => {
    const setLogin = jest.fn();
    const { getByRole } = render(
        <MemoryRouter>
           <Login setLogin={setLogin} />
        </MemoryRouter>,
      );
    const loginButton = getByRole('button', { name: /Login/ });
  
    fireEvent.click(loginButton);
  
    expect(setLogin).toHaveBeenCalledWith(true);
  });

  test('renders Login component', () => {
    render(
        <MemoryRouter>
           <Login />
        </MemoryRouter>,
      );
  });

  describe('test handleName function', () => {
    test('test that handleName updates name1 and name', () => {
      const setNameMock = jest.fn();
      const component = render(
        <MemoryRouter>
           <Login setName={setNameMock} />
        </MemoryRouter>,
      );
  
      const input = screen.getByLabelText(/pennKey/);
      fireEvent.change(input, { target: { value: 'test name' } });
  
      expect(setNameMock).toHaveBeenCalledTimes(1);
      expect(setNameMock).toHaveBeenCalledWith('test name');
  
      // Since `setName1` is not passed as a prop to Login, we can't test it directly.
      // However, we can test its value indirectly by checking the value of `name1` in useEffect.
    });
  });

  test('updates the Penn ID field on change', () => {
    render(
      <MemoryRouter>
        <Login setLogin={() => {}} setUserId={() => {}} setName={() => {}} />
      </MemoryRouter>
    );

    const pennIdInput = screen.getByLabelText(/Penn ID/);

    fireEvent.change(pennIdInput, { target: { value: '12345678' } });

    expect(pennIdInput.value).toBe('12345678');
  });

  test('updates the Password field on change', () => {
    render(
      <MemoryRouter>
        <Login setLogin={() => {}} setUserId={() => {}} setName={() => {}} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Password/);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

