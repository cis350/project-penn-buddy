/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/**
 * POST method test module
 */
const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');
// import ObjectID

// import test utilities function
const {
  isInArray, testUser, testGroup, insertTestDataToDB, testChatroom,
  deleteTestDataFromDB,
} = require('./testUtils');

let mongo;
let db;
// leep track of id of test user
let testUserID;
let testGroupID;
let testChatroomID;

let groupResponse;
let userResponse;
let chatResponse;

/**
 * Status code and response type
 */
test('the status code is 201 and response type', async () => {
  mongo = await connect();
  db = mongo.db();
  const response = await request(webapp).post('/group').send(testGroup);
  expect(response.status).toBe(201); // status code
  const insertedGroup = await db.collection('group').findOne({ location: 'testLocation' });
  console.log('inserted group:', insertedGroup);
  expect(insertedGroup.location).toEqual('testLocation');
  const result = await db.collection('group').deleteMany({ location: 'testLocation' });
});

// FAILING
/**
 * Status code and response type
 */
test('Chatroom - the status code is 201 and response type', async () => {
  mongo = await connect();
  db = mongo.db();
  const response = await request(webapp).post('/Chatroom').send(testChatroom);
  expect(response.status).toBe(201); // status code
  const insertedChatroom = await db.collection('Chatroom').findOne({ currentMembersIds: [1, 2, 3] });
  console.log('inserted chatroom:', insertedChatroom);
  expect(insertedChatroom.currentMembersIds).toEqual([1, 2, 3]);
  const result = await db.collection('Chatroom').deleteMany({ currentMembersIds: [1, 2, 3] });
});

/**
 * test create user
 */
test('the status code for create User is 201 and response type', async () => {
  mongo = await connect();
  db = mongo.db();
  const response = await request(webapp).post('/user').send(testUser);
  expect(response.status).toBe(400); // status code
  const insertedUser = await db.collection('user').findOne({ name: 'testUser' });
  console.log('inserted user:', insertedUser);
  expect(insertedUser.name).toEqual('testUser');
  const result = await db.collection('user').deleteMany({ name: 'testUser' });
});
