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
    console.log('getGroupById response:', response.data.data);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Change a group by groupId
 */
export const changeGroup = async (groupId, newGroup) => {
  try {
    const response = await axios.put(`${rootURL}/group/${groupId}`, newGroup);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Create a group by groupId
 */
export const createGroup = async (newGroup) => {
  try {
    const response = await axios.post(`${rootURL}/group`, newGroup);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Get all groups
 */
export const getAllGroups = async () => {
  try {
    const response = await axios.get(`${rootURL}/group`);
    console.log('getAllGroups response:', response.data.data);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Delete groups
 */
export const deleteGroupById = async (groupId) => {
  try {
    const response = await axios.delete(`${rootURL}/group/${groupId}`);
    return response.data.data;
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 * Delete all groups for ownerId
 */
export const deleteGroupsByOwnerId = async (userId) => {
  try {
    const response = await axios.get(`${rootURL}/group`);
    const allGroups = response.data.data;
    const groupsToDelete = allGroups.filter((group) => group.ownerId === userId);

    await Promise.all(groupsToDelete.map(async (group) => {
      await axios.delete(`${rootURL}/group/${group.id}`);
    }));
  } catch (err) {
    console.log('error', err.message);
  }
};
