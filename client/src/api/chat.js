/* eslint-disable consistent-return */
// HTTP client
import axios from "axios";
import { rootURL } from "../utils/utils";
/**
 * This module contains HTTP calls to the backend
 */

export const getChatroomById = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom/${id}`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
  }
};

export const getAllChatroom = async () => {
  try {
    const response = await axios.get(`${rootURL}/Chatroom`);
    return response.data;
  } catch (err) {
    // console.log('error', err.message);
  }
};
export const modifyText = async (id, texts, currentMembersIds) => {
  try {
    // console.log('chat room id is', id);
    const chatId = id.current;
    const response = await axios.put(`${rootURL}/Chatroom/${chatId}`, { id, texts, currentMembersIds });
    // OH, YOU HAVE TO INSERT A NEW TEXT ELEMENT
    // OR JUST REPLACE THE ARRAYYYY
    return response.data;
  } catch (err) {
    //   console.log('error', err.message);
  }
};

export const createNewChatroom = async (id, membersId) => {
  try {
    const chatId = id;
    const texts = [];
    const currentMembersIds = membersId;
    console.log('members id in chatjs', currentMembersIds);
    const response = await axios.post(`${rootURL}/Chatroom`, { id, texts, currentMembersIds });
    return response.data;
  } catch (err) {
    // console.log('error', err);
  }
};
