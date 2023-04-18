/* eslint-disable consistent-return */
/* eslint-disable no-console */
// this is a node app, we must use commonJS modules/ require
// the names of the functions come from the operationId field
/**
 * This module implements model queries functions
 * the names of the functions come from the operationId field
 * in the API documentation
 */

// import the mongodb driver
const { MongoClient } = require('mongodb');

// import ObjectID
const { ObjectId } = require('mongodb');

// the mongodb server URL
const dbURL = 'mongodb+srv://penn-buddy:penn-buddy@cluster-cis-3500.nmrmxlg.mongodb.net/Penn-Buddy?retryWrites=true&w=majority';

/**
 * MongoDB database connection
 * It will be exported so we can close the connection
 * after running our tests
 */
let MongoConnection;
// connection to the db
const connect = async () => {
  // always use try/catch to handle any exception
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )); // we return the entire connection, not just the DB
    // check that we are connected to the db
    // console.log(`connected to db: ${MongoConnection.db().databaseName}`);
    return MongoConnection;
  } catch (err) {
    console.log('Error', err.message);
  }
};

/**
 *
 * @returns the database attached to this MongoDB connection
 */
const getDB = async () => {
  // test if there is an active connection
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

/**
 *
 * Close the mongodb connection
 */
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').find({}).toArray();
    // print the results
    // console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Get user by ID
 */
const getUserById = async (userID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').findOne({ _id: new ObjectId(userID) });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Add user when register
 */
const createUser = async(newUser) => {
  try {
    const db = await getDB();
    const result = db.collection('user').insertOne(newUser);
    console.log(`Created User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/* UPDATE a student (PUT /student/:id)
 */
const changeUser = async (userID, newUser) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').updateOne(
      { _id: new ObjectId(userID) },
      { $set: newUser },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Check if user exists in Login
 */
const usernameExists =  async(db, newUser) => {
  try {
    const result = await db.collection('user').findOne({ pennid: newUser.pennid });
    if (!result) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error('failed checking username');
  }
};

/**
 * Delete user by ID
 */
const deleteUser = async (userId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').deleteOne(
      { _id: new ObjectId(userId) },
    );
    // print the result
    console.log(`Deleted User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Get all groups
 */
const getAllGroups = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('group').find({}).toArray();
    // print the results
    console.log(`Groups: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Get group by ID
 */
const getGroupById = async (groupID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('group').findOne({ _id: new ObjectId(groupID) });
    // print the result
    // console.log(`Group: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Create a new group / POST
 */
const createGroup = async (newGroup) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('group').insertOne(newGroup);
    console.log(`Created Group: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Update group by passing in new student object
 */
const changeGroup = async (groupID, newGroup) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('group').updateOne(
      { _id: new ObjectId(groupID) },
      { $set: newGroup },
    );
    console.log('post-changeGroup group', db.collection('group').find({}).toArray());
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Delete group by ID
 */
const deleteGroupById = async (groupID) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('group').deleteOne(
      { _id: new ObjectId(groupID) },
    );
    // print the result
    console.log(`Deleted Group: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

// functions to deal with chatroom

/**
 * Get all chatrooms
 */
const getAllChatrooms = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Chatroom').find({}).toArray();
    // print the results
    console.log(`Chatroom: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Get group by ID
 */
const getChatroomById = async (chatId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Chatroom').findOne({ _id: new ObjectId(chatId) });
    // print the result
    // console.log(`Group: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Update chatroom by passing in new chatroom object
 */
// might have to update how I originally update it
// now would have to update text when I create newChat

const changeChatroom = async (chatId, newChat) => {
  try {
    // get the db
    const db = await getDB();
    console.log('chatid db', chatId);
    console.log('new chat db', newChat);
    const result = await db.collection('Chatroom').updateOne(
      { _id: new ObjectId(chatId) },
      { $set: newChat },
    );
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * Delete chatroom by ID
 */
const deleteChatroom = async (chatId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('Chatroom').deleteOne(
      { _id: new ObjectId(chatId) },
    );
    // print the result
    console.log(`Deleted Group: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

/**
 * CREATE a new student (HTTP POST /student)
 * https://app.swaggerhub.com/apis/ericfouh/StudentsRoster_App/1.0.0#/students/addStudent
 * @param {newChatroom}   the new student object
 * @returns the id of the new student
 */
const createNewChatroom = async (newChatroom) => {
  // get the db
  try {
    console.log('new chatroom', newChatroom);
    const db = await getDB();
    const result = await db.collection('Chatroom').insertOne(newChatroom);
    console.log(`Created chatroom: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

module.exports = {
  connect,
  closeMongoDBConnection,
  getAllUsers,
  getUserById,
  createUser,
  changeUser,
  getAllGroups,
  getGroupById,
  changeGroup,
  createGroup,
  deleteGroupById,
  deleteUser,
  getAllChatrooms,
  getChatroomById,
  changeChatroom,
  deleteChatroom,
  createNewChatroom,
};
