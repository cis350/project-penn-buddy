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
    console.error('error', err.message);
  }
};

/**
 * Join/leave a group by userId
 */
export const modifyText = async (id, texts, currentMembersIds) => {
    try {
    //   console.log('tried adding into chat', id);
    //   console.log('tried adding text', texts);
    //   console.log('tried adding currMembs', currentMembersIds);
    //   this allows you to change Chatroom to ONLY include a text object -> WRONG
    //   const response = await axios.put(`${rootURL}/Chatroom/${id}`, newText);
      const response = await axios.put(`${rootURL}/Chatroom/${id}`, {id, texts, currentMembersIds});
      // OH, YOU HAVE TO INSERT A NEW TEXT ELEMENT
      // OR JUST REPLACE THE ARRAYYYY
      return response.data;
    } catch (err) {
    //   console.log('error', err.message);
    }
  };
  