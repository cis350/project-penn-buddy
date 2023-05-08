import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getAllGroups, getGroupById, deleteGroupById, changeGroup, createGroup,
} from '../../api/groups';
import { rootURL } from "../../utils/utils";

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);

const allGroups = [
  {
    id: 1,
    ownerId: 1,
    location: "PHL Airport",
    departDate: "2023-08-29T09:12:33.001Z",
    modeTransport: "Uber/Lyft XL",
    departPlace: "The Radian",
    maxCapacity: 4,
    currCapacity: 3,
    currMemberIds: [
      1,
      3,
      2,
    ],
  },
  {
    id: 2,
    ownerId: 3,
    location: "EWR Airport",
    departDate: "2023-07-03T17:22:00.001Z",
    modeTransport: "Uber/Lyft XL",
    departPlace: "Lauder",
    maxCapacity: 4,
    currCapacity: 2,
    currMemberIds: [
      3,
      4,
    ],
  },
  {
    id: 3,
    ownerId: 2,
    location: "JFK Airport",
    departDate: "2023-03-14T15:00:00.001Z",
    modeTransport: "Uber/Lyft",
    departPlace: "Hill",
    maxCapacity: 3,
    currCapacity: 3,
    currMemberIds: [
      2,
      3,
      1,
    ],
  },
];

describe('the api returned correct data of group 3', () => {
  mockAxios.onGet(`${rootURL}/group/3`).reply(200, allGroups[2]);
  test('Group 3 is returned', async () => {
    const data = await getGroupById(3);
    // console.log('Get group 3:', data);
    expect(data.location).toBe('JFK Airport');
  });
});

describe('modify group', () => {
  mockAxios.onPut(`${rootURL}/group/1`, { newGroup: "Hi" }).reply(200, 'Hi');
  test('Grace is the returned user', async () => {
    const data = await changeGroup("Hi");
    expect(data).toBe(undefined);
  });
});

describe('create group', () => {
  mockAxios.onPost(`${rootURL}/group/1`, { newGroup: "Hi" }).reply(200, 'Hi');
  test('Grace is the returned user', async () => {
    const data = await createGroup("Hi");
    expect(data).toBe(undefined);
  });
});

describe('the api returned correct data of all groups', () => {
  mockAxios.onGet(`${rootURL}/group`).reply(200, allGroups);
  test('Group 3 is returned', async () => {
    const data = await getAllGroups();
    expect(data[0].location).toBe('PHL Airport');
  });
});

describe('the api returned correct data of all groups', () => {
  mockAxios.onDelete(`${rootURL}/group/1`).reply(200, 'Delete');
  test('Group 1 is returned', async () => {
    const data = await deleteGroupById(1);
    expect(data).toBe('Delete');
  });
});
