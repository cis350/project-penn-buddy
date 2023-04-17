// import supertest
const request = require('supertest');
// import the function to close the mongodb connection
const { closeMongoDBConnection, connect } = require('../DbOperations');

// import the express server
const webapp = require('../server');

// import test utilities function
const { deleteTestDataFromDB } = require('./testUtils');

// connection to the DB
let mongo;

describe('POST /Chatroom endpoint tests', () => {
  let db; // the db
  let response; // the response from our express server

  beforeAll(async () => {
    // connect to the db
    mongo = await connect();
    // get the db
    db = mongo.db();

    // send the request to the API and collect the response
    response = await request(webapp).post('/Chatroom')
      .send('texts=testtexts&currentMembersIds=testMembersIds');
  });

  /**
 * After running the tests, we need to remove any test data from the DB
 * We need to close the mongodb connection
 */
  afterAll(async () => {
    // we need to clear the DB
    try {
      await deleteTestDataFromDB(db, 'testchatroom');;
      await mongo.close(); // the test  file connection
      await closeMongoDBConnection(); // the express connection
    } catch (err) {
      return err;
    }
  });

  /**
 * Status code and response type
 */
  test('the status code is 201 and response type', () => {
    expect(response.status).toBe(201); // status code
    expect(response.type).toBe('application/json');
  });

  /**
 * response body
 */
  test('the new chatroom is in the returned data', () => {
    // expect the id of the new student to not be undefined
    console.log('returned data id', JSON.parse(response.text).data.id);
    expect(JSON.parse(response.text).data.id).not.toBe(undefined);
  });

  test('The new chatroom is in the database', async () => {
    const insertedUser = await db.collection('Chatrooms').findOne({ name: 'testcharoom' });
    expect(insertedUser.name).toEqual('testuser');
  });

  test('missing a field (email) 404', async () => {
    const res = await request(webapp).post('/student/')
      .send('name=testuser&major=cis');
    expect(res.status).toEqual(404);
  });
});
