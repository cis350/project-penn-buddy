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
  isInArray, testUser, testGroup, insertTestDataToDB,
  deleteTestDataFromDB, deleteGroupTestDataFromDB,
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

test('Endpoint status code and response async/await', async () => {
  const res = await request(webapp).put(`/group/${testGroupID}`)
    .send(
      {
        ownerId: "6348acd2e1a47ca32e79f46f",
        location: "testLocation",
        departDate: "test",
        modeTransport: "test",
        departPlace: "test",
        maxCapacity: "test",
        currCapacity: "test",
        currMemberIds: ["6348acd2e1a47ca32e79f46f"],
      },
    );
  expect(res.status).toEqual(200);
  expect(res.type).toBe('application/json');
  // the database was updated
  const updatedUser = await db.collection('group').findOne({ _id: new ObjectId(testGroupID) });
  console.log('updatedUser', JSON.stringify(updatedUser));
  expect(updatedUser.location).toEqual('testLocation');
});
