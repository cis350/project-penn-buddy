import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllUsers, getUserById } from '../../api/users';
import { rootURL } from "../../utils/utils";

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);
// WILL HAVE TO EDIT THIS

const allUsers = [
  {
    id: 1,
    name: "Nicky",
    email: "nickywon@wharton.upenn.edu",
    password: "nickypass123",
    venmo: "Nicky_Wong",
    rating: 5,
  },
  {
    id: 2,
    name: "Grace",
    email: "grace@upenn.edu",
    password: "grace555",
    venmo: "Grace_grace",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Iain",
    email: "iainli@gmail.com",
    password: "iaianchenli",
    venmo: "iain888",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Linda",
    email: "lindashen7@gmail.com",
    password: "linda777",
    venmo: "Linda_Shen_7",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Salam",
    email: "salamk@sas.upenn.edu",
    password: "salam12345",
    venmo: "Salam-Kar",
    rating: 4.2,
  },
];

describe('the api returned correct data of all users', () => {
  mockAxios.onGet(`${rootURL}/user`).reply(200, allUsers);
  test('Nicky is in the returned user', async () => {
    const data = await getAllUsers();
    expect(data[0].name).toBe('Nicky');
  });
});

describe('the api returned correct data of user id 2', () => {
  mockAxios.onGet(`${rootURL}/user/2`).reply(200, allUsers[1]);
  test('Grace is the returned user', async () => {
    const data = await getUserById(2);
    expect(data.name).toBe('Grace');
  });
});
