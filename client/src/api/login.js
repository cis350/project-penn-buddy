import axios from "axios";
import { rootURL } from "../utils/utils";
/**
 * Get a user based on groupId
 */

export async function usernameExists(name) {
  const response = await axios.post(`${rootURL}/user`, { name: `${name}` });
  if (response.data.message === 'username exist') {
    return true;
  }
  return false;
}

export async function getUser(name, password) {
  const response = await axios.post(`${rootURL}/user/login`, {
    name: `${name}`,
    password: `${password}`,
  });
  return response.data;
}

export async function checkPassword(pennid, password) {
  const response = await axios.post(`${rootURL}/api/checkPassword`, {
    pennid: `${pennid}`,
    password: `${password}`,
  });
  if (response.data.message === 'username exist') {
    return true;
  }
  return false;
}

export async function checkUserSession() {
  const response = await axios.get(`${rootURL}/check`);
  return response.data;
}
