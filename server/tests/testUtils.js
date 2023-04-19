/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/**
 * utility functions for testing
 */

/**
 * Adds a test student to the DB
 * @param {*} testData - the test data
 * @param {*} db - the database
 * @returns the id of the data
 */
const insertTestDataToDB = async (db, testData, collection) => {
  try {
    const result = await db.collection(collection).insertOne(testData);
    console.log('result', JSON.stringify(result));
    return result.insertedId;
  } catch (err) {
    console.log('Error', err.message);
  }
};

/**
 *
 * @param {*} db
 * @param {*} testData
 * @returns
 */
const deleteTestDataFromDB = async (db, testData, collection) => {
  try {
    const result = await db.collection(collection).deleteMany({ name: testData });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test data');
    } else {
      console.log('warning', 'test data was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

const deleteGroupTestDataFromDB = async (db, testlocation, collection) => {
  try {
    const result = await db.collection(collection).deleteMany({ location: testlocation });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test data');
    } else {
      console.log('warning', 'test data was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

/**
 *
 * @param {*} db
 * @param {*} testData
 * @returns
 */
const deleteChatTestDataFromDB = async (db, testMembers, collection) => {
  try {
    const result = await db.collection(collection).deleteMany({ currentMembersIds: testMembers });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted test data');
    } else {
      console.log('warning', 'test data was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

// test user
// define the test user
const testUser = {
  name: 'testUser',
  pennId: '1234567',
  email: 'nickywon@wharton.upenn.edu',
  number: '1234567891',
  year: 'Junior',
  major: 'CIS',
  venmo: 'Nicky_Wong',
  bio: 'I love CIS350 !',
  rating: [
    1,
    1,
    1,
    5,
  ],
  password: 'nickypass123',
};

// Intentionally add name to testGroup so that we can share
// the add/deleteToDB function with testUser
const testGroup = {
  ownerId: 1,
  location: 'testLocation',
  departDate: '12-12-2023 09:00',
  modeTransport: 'Helicopter',
  departPlace: 'Huntsman',
  maxCapacity: 7,
  currCapacity: 1,
  currMemberIds: [
    1,
  ],
};

const testChatroom = {
  texts: [
    {
      userId: 1,
      content: 'Hello',
    },
    {
      userId: 2,
      content: 'Hi',
    },
    {
      userId: 3,
      content: 'Hey',
    },
  ],
  currentMembersIds: [
    1,
    2,
    3,
  ],
};

/**
 * utility function to test if the id
 * of the test student is in the response (array)
 *
 * @param {*} arr
 * @param {*} val
 * @returns
 */
const isInArray = (arr, val) => {
  let value = false;
  arr.map((x) => {
    if (String(x._id) === String(val)) {
      value = true;
    }
  });
  return value;
};

// export the functions
module.exports = {
  insertTestDataToDB,
  deleteTestDataFromDB,
  deleteGroupTestDataFromDB,
  deleteChatTestDataFromDB,
  testUser,
  testGroup,
  testChatroom,
  isInArray,
};
