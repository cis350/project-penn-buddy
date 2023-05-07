/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the backend
*/
const setHeaders = () => {
  axios.defaults.headers.authorization = sessionStorage.getItem('app-token');
};

/**
 * This function authenticates the user
 * sends a POSt request to the login endpoint
 * returns the JWT

export const loginUser = async (username) => {
  try {
    const response = await axios.post(`${rootURL}/login`, `name=${username}`);
    // return the token
    return response.data.apptoken;
  } catch (err) {
    console.log('error', err.message);
  }
}; */

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
* This function authenticates the user
* sends a POSt request to the login endpoint
* returns the JWT
*/
export const loginU = async (name) => {
  try {
    const response = await axios.post(`${rootURL}/login`, { name });
    // return the token
    return response.data.apptoken;
  } catch (err) {
    console.log('error', err.message);
  }
};

export const loginUser = async (userId) => {
  try {
    const response = await axios.get(`${rootURL}/user/login/${userId}`);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
    throw err;
  }
};

/* export async function getUser(name, password) {
  const response = await axios.get(`${rootURL}/user/login`, {
    name: `${name}`,
    password: `${password}`,
  });
  return response.data.apptoken;
} */

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
