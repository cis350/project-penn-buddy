/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the backend
 */

/**
 * Create a group by groupId
 */
export const createUser = async (newUser) => {
  try {
    const response = await axios.post(`${rootURL}/user`, newUser);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};
