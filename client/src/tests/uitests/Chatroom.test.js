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
        <Chatroom userId={1} name="Nicky" />
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
        <Chatroom userId={1} name="Nicky" />
      </MemoryRouter>,
    );
    // assert that the element is in the document
    const enter = screen.getByLabelText('Enter a message...');
    expect(enter).toBeInTheDocument();
  });
});

test('test navigation navbar login', async () => {
  // render the component
  const { getByLabelText } = render(
    <MemoryRouter>
      <Chatroom userId={1} name="Nicky" />
    </MemoryRouter>,
  );
  // fire the user event
  // find the textbox and type atlanta into it
  // click on the OK button
  await userEvent.click(screen.getByText(/Back to Activity Feed/));
  // check that My Profile is now is the document
  expect(screen.getByText(/Feed/)).toBeInTheDocument();
});

// describe('test that user name is in document', () => {
//   test('test that user name is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     // assert that the element is in the document
//     const user = screen.getByText(/Nicky/);
//     expect(user).toBeInTheDocument();
//   });
// });

// describe('search is in document', () => {
//   test('search is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const search = screen.getByLabelText(/Search/);
//     expect(search).toBeInTheDocument();
//   });
// });

// describe('send is in document', () => {
//   test('send is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const send = screen.getByTestId("send");
//     expect(send).toBeInTheDocument();
//   });
// });

// describe('chatNames is in document', () => {
//   test('chatNames is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const chatn = screen.getByTestId(/chatNames/);
//     expect(chatn).toBeInTheDocument();
//   });
// });

// // describe('text is in document', () => {
// //   test('text is in document', async () => {
// //     // render the component
// //     const { getChatroom } = render(
// //       <MemoryRouter>
// //         <Chatroom userId={1} name="Nicky" />
// //       </MemoryRouter>,
// //     );
// //     const text = screen.getByTestId(/textData/);
// //     expect(text).toBeInTheDocument();
// //   });
// // });

// describe('Nicky is in document', () => {
//   test('Nicky is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const chatn = screen.getByTestId(/Nicky/);
//     expect(chatn).toBeInTheDocument();
//   });
// });

// describe('text content is in document', () => {
//   test('text content is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const n = screen.getByText(/text-content/);
//     expect(n).toBeInTheDocument();
//   });
// });

// describe('sender info is in document', () => {
//   test('sender info is in document', async () => {
//     // render the component
//     const { getChatroom } = render(
//       <MemoryRouter>
//         <Chatroom userId={1} name="Nicky" />
//       </MemoryRouter>,
//     );
//     const senderId = screen.getByTextId(/sender/);
//     expect(senderId).toBeInTheDocument();
//   });
// });
