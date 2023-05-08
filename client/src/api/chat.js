/* eslint-disable consistent-return */
// HTTP client
import { unstable_composeClasses } from "@mui/material";
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

// // THIS IS NOT WORKING CHEKCKKK
// // check if I can do this
// name MUST BE UNIQUE
export const getChatroomByName = async (name) => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom?chatName=${name}`);
    return response.data.data;
  } catch (err) {
    // console.error('error', err.message);
  }
};

export const getAllChatrooms = async () => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom`);
    // console.log('all chats .js', response.data.data);
    // console.log('all chats .js', response.data.data);
    return response.data.data;
  } catch (err) {
    // console.log('error', err.message);
  }
};

export const changeChatroom = async (id, name, texts, currentMembersIds, groupId) => {
  try {
    const chatId = id;
    // console.log('name added', name);
    // console.log('id added', id);
    // console.log('text added', texts);
    // console.log('mems added', currentMembersIds);
    // console.log('group id added', groupId);
    const chatName = name;

    // console.log('chatId cc', chatId);
    const response = await axios.put(`${rootURL}/Chatroom/${id}`, {
      chatName, texts, currentMembersIds, groupId,
    });
    return response.data.message;
  } catch (err) {
    //   console.log('error', err.message);
  }
};

export const createNewChatroom = async (groupId, membersId, name) => {
  try {
    // console.log('chat id', chatId);
    // const _id = chatId
    const texts = [];
    const currentMembersIds = membersId;
    const chatName = name;
    // console.log('_id', _id);
    // console.log('texts', texts);
    // console.log('members', currentMembersIds);
    // console.log('create new chatroom with gid ', groupId);
    const response = await axios.post(`${rootURL}/Chatroom`, {
      chatName,
      texts,
      currentMembersIds,
      groupId,
    });
    // console.log('response chat.js', response.data.data);
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
