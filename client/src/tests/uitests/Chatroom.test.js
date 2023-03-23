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

import Chatroom from '../../pages/Chatroom';
import MyText from '../../components/MyText';
import { getChatroomById, modifyText } from '../../api/chat';
import { rootURL } from "../../utils/utils";

describe('test that all message field is in document', () => {
  test('test that all message fieldis in the document', async () => {
    // render the component
    const { getChatroom } = render(
      <MemoryRouter>
        <Chatroom />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const allMessage = screen.getByText(/All Messages/);
    expect(allMessage).toBeInTheDocument();
  });
});

describe('test that all enter a message is in document', () => {
  test('test that all enter a message in the document', async () => {
    // render the component
    const { getChatroom } = render(
      <MemoryRouter>
        <Chatroom />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const enter = screen.getByLabelText('Enter a message...');
    expect(enter).toBeInTheDocument();
  });
});

describe('test that user name is in document', () => {
  test('test that user name is in document', async () => {
    // render the component
    const { getChatroom } = render(
      <MemoryRouter>
        <Chatroom />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const user = screen.getByText(/Nicky/);
    expect(user).toBeInTheDocument();
  });
});

describe('test that Linda is in document', () => {
  test('test that Linda is in document', async () => {
    // render the component
    const { getChatroom } = render(
      <MemoryRouter>
        <Chatroom />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const userL = screen.getByText(/Linda Shen/);
    expect(userL).toBeInTheDocument();
  });
});

describe('test that Iain is in document', () => {
  test('test that Iain is in document', async () => {
    // render the component
    const { getChatroom } = render(
      <MemoryRouter>
        <Chatroom />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const userI = screen.getByText(/Iain Li/);
    expect(userI).toBeInTheDocument();
  });
});
