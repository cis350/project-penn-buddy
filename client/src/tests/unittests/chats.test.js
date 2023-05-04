import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllUsers, getUserById } from '../../api/users';
import { rootURL } from "../../utils/utils";
import {
  getAllChatrooms, getChatroomById, createNewChatroom, deleteChatroom, modifyText,
} from '../../api/chat';

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);
// WILL HAVE TO EDIT THIS

const allChats = [
  {
    id: 1,
    texts: [
      {
        senderId: 2,
        content: "hello",
      },
      {
        senderId: 1,
        content: "My name is Grace!",
      },
      {
        senderId: 1,
        content: "Let's carpool!",
      },
      {
        senderId: 1,
        content: "Yo",
      },
      {
        userId: 1,
        content: "hihi",
      },
      {
        userId: 1,
        content: "grace",
      },
    ],
    currentMembersIds: [
      1,
      2,
    ],
  },
];

describe('the api returned correct data of all chats', () => {
  mockAxios.onGet(`${rootURL}/Chatroom`).reply(200, allChats);
  test('chatId 1 is in the returned chat', async () => {
    const response = await getAllChatrooms();
    expect(response[0].id).toBe(1);
  });
});

describe('the api returned correct data of chat id 2', () => {
  mockAxios.onGet(`${rootURL}/Chatroom/1`).reply(200, allChats[0]);
  test('Grace is the returned user', async () => {
    const data = await getChatroomById(1);
    expect(data.id).toBe(1);
  });
});

describe('delete chat', () => {
  mockAxios.onDelete(`${rootURL}/Chatroom/1`).reply(200, 'Hi');
  test('Grace is the returned user', async () => {
    const data = await deleteChatroom(1);
    expect(data).toBe('Hi');
  });
});

describe('modify text chat', () => {
  mockAxios.onPut(`${rootURL}/Chatroom/1`, { id: 1, texts: "Hi", currentMembersIds: 123 }).reply(200, 'Hi');
  test('Grace is the returned user', async () => {
    const data = await modifyText(1, "Hi", 123);
    expect(data).toBe('Hi');
  });
});
