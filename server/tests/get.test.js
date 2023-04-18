/* eslint-disable consistent-return */
/* eslint-disable no-console */
/**
 * GET method test module
 */
const request = require('supertest');
const { ObjectId } = require('mongodb');
const { closeMongoDBConnection, connect } = require('../DbOperations');
const webapp = require('../server');
// import ObjectID

// import test utilities function
const {
  isInArray, testUser, insertTestDataToDB, deleteTestDataFromDB, deleteGroupTestDataFromDB,
  testGroup,
} = require('./testUtils');

let mongo;
let db;
// leep track of id of test user
let testUserID;
let testGroupID;

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
  console.log('testUserID', testUserID);
  console.log('testGroupID', testGroupID);
});

/**
 * Delete all test data from the DB
 * Close all open connections
 */
afterEach(async () => {
  await deleteTestDataFromDB(db, 'testUser', 'user');
  await deleteGroupTestDataFromDB(db, 'testLocation', 'group');
  try {
    await mongo.close();
    await closeMongoDBConnection(); // mongo client that started server.
  } catch (err) {
    return err;
  }
});

test('Get all users endpoint status code and data', async () => {
  const resp = await request(webapp).get('/user');
  expect(resp.status).toEqual(200);
  expect(resp.type).toBe('application/json');
  const studArr = JSON.parse(resp.text).data;
  // testStudent is in the response
  console.log('isInArray--->', isInArray(studArr, testUserID));
  expect(isInArray(studArr, testUserID)).toBe(true);
});

test('Get all groups endpoint status code and data', async () => {
  const resp = await request(webapp).get('/group');
  expect(resp.status).toEqual(200);
  expect(resp.type).toBe('application/json');
  const studArr = JSON.parse(resp.text).data;
  // testStudent is in the response
  console.log('isInArray--->', isInArray(studArr, testGroupID));
  expect(isInArray(studArr, testGroupID)).toBe(true);
});

test('Get a group endpoint status code and data', async () => {
  const resp = await request(webapp).get(`/group/${testGroupID}`);
  expect(resp.status).toEqual(200);
  expect(resp.type).toBe('application/json');
  const studArr = JSON.parse(resp.text).data;
  // testStudent is in the response
  console.log('Expected groupID', testGroupID);
  expect(JSON.stringify(studArr)).toBe(JSON.stringify({ _id: testGroupID, ...testGroup }));
});
