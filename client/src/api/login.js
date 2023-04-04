import axios from "axios";
import { rootURL } from "../utils/utils";

export async function usernameExists(pennid) {
  const response = await axios.post(`${rootURL}/api/check-user`, { pennid: `${pennid}` });
  if (response.data.message === 'username exist') {
    return true;
  }
  return false;
}

export async function getUser(pennid, password) {
  const response = await axios.post(`${rootURL}/api/login`, {
    pennid: `${pennid}`,
    password: `${password}`,
  });
  return response.data.data;
}
