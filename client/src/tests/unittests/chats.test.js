import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllUsers, getUserById } from '../../api/users';
import { rootURL } from "../../utils/utils";
import {
  getAllChatroom, getChatroomById, createNewChatroom, deleteChatroom,
} from '../../api/chat';

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);
// WILL HAVE TO EDIT THIS

const allChats = [{
  id: 1,
  texts: [
    {
      userId: 2,
      content: "welcome to chat 5",
    },
    {
      userId: 2,
      content: "welcome to chat ",
    },
    {
      userId: 2,
      content: "hello",
    },
    {
      userId: 2,
      content: "hello aain",
    },
    {
      userId: 2,
      content: "helloooo",
    },
    {
      userId: 2,
      content: "helloooooooo",
    },
    {
      userId: 2,
      content: "he",
    },
    {
      userId: 2,
      content: "chatroom 1",
    },
  ],
  currentMembersIds: [
    2,
  ],
},
{
  id: 2,
  texts: [
    {
      userId: 3,
      content: "welcome to chatroom 2",
    },
    {
      userId: 1,
      content: "I like cis 3500!",
    },
    {
      userId: 1,
      content: "hello",
    },
    {
      userId: 1,
      content: "where do we go",
    },
    {
      userId: 4,
      content: "send message",
    },
  ],
  currentMembersIds: [
    1,
    3,
  ],
},
{
  id: 3,
  texts: [
    {
      userId: 4,
      content: "welcome to chatroom 3",
    },
    {
      userId: 1,
      content: "chat with Linda",
    },
    {
      userId: 1,
      content: "hello i like eatibng",
    },
    {
      userId: 1,
      content: "My name is Grace!",
    },
    {
      userId: 2,
      content: "helloooooooo",
    },
    {
      userId: 2,
      content: "chatroom 3",
    },
  ],
  currentMembersIds: [
    1,
    3,
    2,
  ],
},
{
  id: 5,
  texts: [
    {
      userId: 2,
      content: "hello chat room 5",
    },
    {
      userId: 2,
      content: "chatroom 2",
    },
  ],
  currentMembersIds: [
    2,
  ],
},
{
  id: 4,
  texts: [
    {
      userId: 2,
      content: "hello chat room 4",
    },
  ],
  currentMembersIds: [
    1,
    2,
  ],
},
];

describe('the api returned correct data of all chats', () => {
  mockAxios.onGet(`${rootURL}/user`).reply(200, allChats);
  test('chatId 1 is in the returned chat', async () => {
    const response = await getAllChatroom();
    expect(response[0].id).toBe(1);
  });
});

describe('the api returned correct data of chat id 2', () => {
  mockAxios.onGet(`${rootURL}/user/2`).reply(200, allChats[1]);
  test('Grace is the returned user', async () => {
    const data = await getChatroomById(2);
    expect(data.currentMembersIds).toBe([1, 3]);
  });
});
