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
export const getGroupById = async (groupId) => {
  try {
    const response = await axios.get(`${rootURL}/group/${groupId}`);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Join/leave a group by userId
 */
export const changeGroupMember = async (groupId, newGroup) => {
  try {
    const response = await axios.put(`${rootURL}/group/${groupId}`, newGroup);
    return response.data;
  } catch (err) {
    console.log('error', err.message);
  }
};