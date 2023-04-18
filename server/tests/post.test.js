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
  isInArray, testUser, testGroup, insertTestDataToDB,
  deleteTestDataFromDB,
} = require('./testUtils');

let mongo;
let db;
// leep track of id of test user
let testUserID;
let testGroupID;

let groupResponse;
let userResponse;

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
