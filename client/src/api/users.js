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
    console.log('GetAllUsers response:', response.data.data);
    return response.data.data;
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
    return response.data.data;
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
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Delete a user by userId
 */
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${rootURL}/user/${userId}`);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};
