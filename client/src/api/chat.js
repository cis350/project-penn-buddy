/* eslint-disable consistent-return */
// HTTP client
import axios from "axios";
import { rootURL } from "../utils/utils";
/**
 * This module contains HTTP calls to the backend
 */

// change rootURL to 8080
// useEffect after useEffect plus the timer

export const getChatroomById = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom/${id}`);
    return response.data.data;
  } catch (err) {
    // console.error('error', err.message);
  }
};

export const getAllChatrooms = async () => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom`);
    // console.log('all chats .js', response.data.data);
    return response.data.data;
  } catch (err) {
    // console.log('error', err.message);
  }
};

export const changeChatroom = async (id, texts, currentMembersIds) => {
  try {
    const chatId = id;
    // console.log('chatId cc', chatId);
    const response = await axios.put(`${rootURL}/Chatroom/${chatId}`, { id, texts, currentMembersIds });
    // console.log('r message cc', response);
    return response.data.message;
  } catch (err) {
    //   console.log('error', err.message);
  }
};

export const modifyText = async (id, texts, currentMembersIds) => {
  try {
    const chatId = id;
    const response = await axios.put(`${rootURL}/Chatroom/${chatId}`, { id, texts, currentMembersIds });
    return response.data.data;
  } catch (err) {
    //   console.log('error', err.message);
  }
};

export const modifyChatMember = async (id, texts, currentMembersIds) => {
  try {
    const chatId = id;
    const response = await axios.put(`${rootURL}/Chatroom/${chatId}`, { id, texts, currentMembersIds });
    return response.data.data;
  } catch (err) {
    //   console.log('error', err.message);
  }
};

export const createNewChatroom = async (chatId, membersId) => {
  try {
    // console.log('chat id', chatId);
    // const _id = chatId
    const texts = [];
    const currentMembersIds = membersId;
    // console.log('_id', _id);
    // console.log('texts', texts);
    // console.log('members', currentMembersIds);
    const response = await axios.post(`${rootURL}/Chatroom`, {
      _id: `${chatId}`,
      // texts: `${texts}`,
      // currentMembersIds: `${currentMembersIds}`,
      texts,
      currentMembersIds,
    });
    // console.log('response chat.js', response);
    return response.data.data;
  } catch (err) {
    // console.log('error', err);
  }
};

export const deleteChatroom = async (id) => {
  try {
    const chatId = id;
    const response = await axios.delete(`${rootURL}/Chatroom/${chatId}`);
    return response.data.data;
  } catch (err) {
    // console.log('error', err);
  }
};
