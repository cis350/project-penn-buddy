/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/**
 * PUT method test module
 */
const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');
// import ObjectID

// import test utilities function
const {
  isInArray, testUser, testGroup, insertTestDataToDB, testChatroom,
  deleteTestDataFromDB, deleteGroupTestDataFromDB,
} = require('./testUtils');

let mongo;
let db;
// leep track of id of test user
let testUserID;
let testGroupID;
let testChatroomID;

/**
     * Make sure that the data is in the DB before running
     * any test
     * connect to the DB
     */
beforeEach(async () => {
  mongo = await connect();
  db = mongo.db();
  // add test user to mongodb
  testUserID = await insertTestDataToDB(db, testUser, 'user');
  testGroupID = await insertTestDataToDB(db, testGroup, 'group');
  testChatroomID = await insertTestDataToDB(db, testChatroom, 'Chatroom');
  console.log('testUserID', testUserID);
  console.log('testGroupID', testGroupID);
  console.log('testChatroomID', testChatroomID);
});

/**
 * Delete all test data from the DB
 * Close all open connections
 */
afterEach(async () => {
  await deleteTestDataFromDB(db, 'testUser', 'user');
  await deleteGroupTestDataFromDB(db, 'testLocation', 'group');
  await deleteTestDataFromDB(db, 'testChatroom', 'Chatroom');
  try {
    await mongo.close();
    await closeMongoDBConnection(); // mongo client that started server.
  } catch (err) {
    return err;
  }
});

test('Endpoint status code and response async/await', async () => {
  const res = await request(webapp).put(`/group/${testGroupID}`)
    .send(
      {
        ownerId: '6348acd2e1a47ca32e79f46f',
        location: 'testLocation',
        departDate: 'test',
        modeTransport: 'test',
        departPlace: 'test',
        maxCapacity: 'test',
        currCapacity: 'test',
        currMemberIds: ['6348acd2e1a47ca32e79f46f'],
      },
    );
  expect(res.status).toEqual(200);
  expect(res.type).toBe('application/json');
  // the database was updated
  const updatedUser = await db.collection('group').findOne({ _id: new ObjectId(testGroupID) });
  console.log('updatedUser', JSON.stringify(updatedUser));
  expect(updatedUser.location).toEqual('testLocation');
});

// test for updating profile information
test('PUT /user/:id - Endpoint status code and response async/await', async () => {
  const res = await request(webapp).put(`/user/${testUserID}`)
    .send(
      {
        name: 'testUser',
        email: 'test@example.com',
        number: '1234567890',
        year: '2023',
        major: 'Computer Science',
        bio: 'This is a test bio',
        venmo: 'test-venmo',
        pennId: '12345678',
        rating: 4.5,
        password: 'test-password',
      },
    );
  expect(res.status).toEqual(200);
  expect(res.type).toBe('application/json');
  // the database was updated
  const updatedUser = await db.collection('user').findOne({ _id: new ObjectId(testUserID) });
  console.log('updatedUser', JSON.stringify(updatedUser));
  expect(updatedUser.name).toEqual('testUser');
  expect(updatedUser.email).toEqual('test@example.com');
  expect(updatedUser.number).toEqual('1234567890');
  expect(updatedUser.year).toEqual('2023');
  expect(updatedUser.major).toEqual('Computer Science');
  expect(updatedUser.bio).toEqual('This is a test bio');
  expect(updatedUser.venmo).toEqual('test-venmo');
  expect(updatedUser.pennId).toEqual('12345678');
  expect(updatedUser.rating).toEqual(4.5);
  expect(updatedUser.password).toEqual('test-password');
});

// EDIT this
test('PUT chatroom - Endpoint status code and response async/await', async () => {
  const res = await request(webapp).put(`/Chatroom/${testChatroomID}`)
    .send(
      {
        // do I need id? "6348acd2e1a47ca32e79f46f",
        texts: [{ userId: '6348acd2e1a47ca32e79f46f', content: 'Hello' }],
        currentMembersIds: ['6348acd2e1a47ca32e79f46f'],
      },
    );
  expect(res.status).toEqual(200);
  expect(res.type).toBe('application/json');
  // the database was updated
  const updatedChatroom = await db.collection('Chatroom').findOne({ _id: new ObjectId(testChatroomID) });
  console.log('updatedChatroom', JSON.stringify(updatedChatroom));
  // modify this to match chatrooms
  // expect(updatedUser.location).toEqual('test');
});
