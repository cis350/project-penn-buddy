/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the backend
 */

/**
 * Get a group based on groupId
 */
export const getGroupHistory = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/history?id=1`);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};
