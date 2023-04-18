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

// // connection to the DB

// describe('POST /Chatroom endpoint tests', () => {
//   beforeAll(async () => {
//     // connect to the db
//     mongo = await connect();
//     // get the db
//     db = mongo.db();
//     // send the request to the API and collect the response
//     chatResponse = await request(webapp).post('/Chatroom')
//       .send('texts=[{userId:1, content:Hello}, {userId:2, content:Hi},
// {userId:3, content:Hey}]&currentMembersIds=[1,2,3]');
//   });

//   /**
//  * After running the tests, we need to remove any test data from the DB
//  * We need to close the mongodb connection
//  */
//   afterAll(async () => {
//     // we need to clear the DB
//     try {
//       await deleteTestDataFromDB(db, 'testChatroom');
//       await mongo.close(); // the test  file connection
//       await closeMongoDBConnection(); // the express connection
//     } catch (err) {
//       return err;
//     }
//   });

//   /**
//  * Status code and response type
//  */
//   test('the status code is 201 and response type', () => {
//     expect(chatResponse.status).toBe(201); // status code
//     expect(chatResponse.type).toBe('application/json');
//   });

//   /**
//  * response body
//  */
//   test('the new chatroom is in the returned data', () => {
//     // expect the id of the new student to not be undefined
//     console.log('returned data id', JSON.parse(chatResponse.text).data.id);
//     expect(JSON.parse(chatResponse.text).data.id).not.toBe(undefined);
//   });

//   test('The new chatroom is in the database', async () => {
//     const insertedUser = await db.collection('Chatrooms').findOne({ name: 'testCharoom' });
//     // expect(insertedUser.name).toEqual('testuser');
//   });

//   test('missing a field (email) 404', async () => {
//     const res = await request(webapp).post('/student/')
//       .send('name=testuser&major=cis');
//     expect(res.status).toEqual(404);
//   });
// });
