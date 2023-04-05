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

import Rating from '../../components/Rating';
import Chatroom from '../../pages/Chatroom';
import { getChatroomById, modifyText } from '../../api/chat';
import { rootURL } from "../../utils/utils";

describe('star-rating is in document', () => {
  test('star-rating is in document', async () => {
    // render the component
    const { getRating } = render(
      <MemoryRouter>
        <Rating userId={1} />
      </MemoryRouter>,
    );
    const rating = screen.getByTestId(/rating/);
    expect(rating).toBeInTheDocument();
  });
});

describe('stars are in document', () => {
  test('stars are in document', async () => {
    // render the component
    const { getRating } = render(
      <MemoryRouter>
        <Rating userId={1} />
      </MemoryRouter>,
    );
    const star = screen.getAllByText(/stars/);
    expect(star).toBeInTheDocument();
  });
});

describe('star buttons are in document', () => {
  test('star buttons are in document', async () => {
    // render the component
    const { getRating } = render(
      <MemoryRouter>
        <Rating userId={1} />
      </MemoryRouter>,
    );
    const buttons = screen.getAllByText(/star-button/);
    expect(buttons).toBeInTheDocument();
  });
});
