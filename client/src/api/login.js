/* eslint-disable */
import axios from "axios";
import { rootURL } from "../utils/utils";

/**
 * Get a user based on groupId
 */
 export const usernameExists = async (name) => {
    const response = await axios.post(`${rootURL}/checkuser`);
    if (response.data.message === 'username exist') {
      return true;
    }
    return false;
};

export async function getUser(pennid, password) {
  const response = await axios.post(`${rootURL}/api/login`, {
    pennid: `${pennid}`,
    password: `${password}`,
  });
  return response.data.data;
}
