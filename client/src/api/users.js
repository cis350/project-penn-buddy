/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the backend
 */

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${rootURL}/user`);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Get a user based on groupId
 */
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${rootURL}/user/${userId}`);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Change a user by userId
 */
export const changeUser = async (userId, newUser) => {
  try {
    const response = await axios.put(`${rootURL}/user/${userId}`, newUser);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Updates the rating array of a user
 */
// export const modifyRating = async (userId, newRating) => {
//   try {
//     // console.log('chat room id is', id);
//     const response = await axios.put(`${rootURL}/user/${userId}`, { newRating });
//     // OH, YOU HAVE TO INSERT A NEW TEXT ELEMENT
//     // OR JUST REPLACE THE ARRAYYYY
//     return response.data;
//   } catch (err) {
//     //   console.log('error', err.message);
//   }
// };
