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
    console.log(`connected to db: ${MongoConnection.db().databaseName}`);
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

const getUsers = async () => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('user').find({}).toArray();
    // print the results
    console.log(`Users: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
};

getUsers();

module.exports = {
  connect,
  closeMongoDBConnection,
};
