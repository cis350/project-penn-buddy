/* eslint-disable no-console */
/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

require('dotenv').config();

// import ObjectID
const { ObjectId } = require('mongodb');

// create a new express app
const webapp = express();
// const session = require('cookie-session');
const session = require('cookie-session');
// support parsing of application/json type post data
const bodyParser = require('body-parser');
const { authenticateUser } = require('./utils/auth');

// enable cors
webapp.use(cors());

webapp.use(session({
  name: 'session',
  keys: 'key1',
  maxAge: 100000000,
}));

webapp.use(bodyParser.json());

// configure express to parse request bodies
webapp.use(express.urlencoded({ extended: true }));

// import the db function
const dbLib = require('./DbOperations');

// root endpoint route
webapp.get('/', (req, res) => {
  res.json({ message: 'Server started and is running on this port.' });
});

/**
* Login endpoint
* The name is used to log in
*/
webapp.post('/login', (req, resp) => {
  // check that the name was sent in the body
  if (!req.body.name || req.body.name === '') {
    resp.status(401).json({ error: 'empty or missing name' });
    return;
  }
  // authenticate the user
  try {
    const token = authenticateUser(req.body.name);
    console.log('token in server.js', token);
    resp.status(201).json({ apptoken: token });
  } catch (err) {
    resp.status(401).json({ error: 'hey I am an error' });
  }
});

// addUser login endpoint
webapp.post('/user/login', async (req, resp) => {
  if (!req.body.name || req.body.name.length === 0) {
    resp.status(401).json({ error: 'pennKey not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  try {
    const result = await dbLib.getUser(req.body.name);
    console.log('getUser', result);
    req.session.name = result.name;
    // req.session.firstname = result.firstname;
    // req.session.lastname = result.lastname;
    resp.status(200).json({ message: 'successfully logged in', data: result });
  } catch (err) {
    resp.status(401).json({ error: 'could not find user' });
  }
});

webapp.get('/user/login/:id', async (req, res) => {
  console.log('GET a user by ID');
  try {
    // get the data from the db
    const results = await dbLib.getUserById(req.params.id);
    req.session.name = results.name;
    // req.session.password = results.password;
    // req.session.pennId = results.pennId;
    if (results === undefined) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation GET /user
 * Testing done */
webapp.get('/user', async (req, resp) => {
  try {
    // get the data from the DB
    const user = await dbLib.getAllUsers();
    // send response
    resp.status(200).json({ data: user });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation add user signup
 */
webapp.post('/user', async (req, resp) => {
  console.log('POST a acc');
  console.log('POST register req body print:', req.body);
  if (!req.body.pennId || req.body.pennId.length === 0) {
    resp.status(401).json({ error: 'pennId not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  if (!req.body.name || req.body.name.length === 0) {
    resp.status(401).json({ error: 'name not provided' });
    return;
  }
  if (!req.body.email || req.body.email.length === 0) {
    resp.status(401).json({ error: 'email not provided' });
    return;
  }
  if (!req.body.number || req.body.number.length === 0) {
    resp.status(401).json({ error: 'number not provided' });
    return;
  }
  if (!req.body.year || req.body.year.length === 0) {
    resp.status(401).json({ error: 'year not provided' });
    return;
  }
  if (!req.body.major || req.body.major.length === 0) {
    resp.status(401).json({ error: 'major not provided' });
    return;
  }
  if (!req.body.venmo || req.body.venmo.length === 0) {
    resp.status(401).json({ error: 'venmo not provided' });
    return;
  }
  if (!req.body.bio || req.body.bio.length === 0) {
    resp.status(401).json({ error: 'bio not provided' });
    return;
  }
  try {
    const newUser = {
      name: req.body.name,
      pennId: req.body.pennId,
      email: req.body.email,
      number: req.body.number,
      year: req.body.year,
      major: req.body.major,
      venmo: req.body.venmo,
      bio: req.body.bio,
      rating: req.body.rating,
      password: req.body.password,
    };
    const result = await dbLib.createUser(newUser);
    req.session.name = result.name;
    req.session.pennId = result.pennId;
    resp.status(201).json({ message: 'successfully added user', data: result });
  } catch (err) {
    resp.status(400).json({ error: 'could not add user' });
  }
});

/**
 * route implementation GET /user/:id
 * TESTING NOT DONE!!!
 */
webapp.get('/user/:id', async (req, res) => {
  console.log('GET a user by ID');
  try {
    // get the data from the db
    const results = await dbLib.getUserById(req.params.id);
    // req.session.name = results.name;
    // req.session.pennId = results.pennId;
    if (results === undefined) {
      res.status(404).json({ error: 'unknown user' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/*
webapp.get('/login', async (req, resp) => {
  if (!req.body.name || req.body.name.length === 0) {
    resp.status(401).json({ error: 'pennKey not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  try {
    const result = await lib.getUser(db,{ name: req.body.name });
    req.session.name = result.name;
    req.session.pennId = result.pennId;
    resp.status(200).json({ message: 'successfully logged in', data: result });
  } catch (err) {
    resp.status(401).json({ error: 'could not find user' });
  }
}); */

/* NEW VER
webapp.post('/login', (req, resp)=>{
  // check that the name was sent in the body
  if(!req.body.name || req.body.name===''){
    resp.status(401).json({error: 'empty or missing name'});
    return;
  }
  // authenticate the user
  try{
    const token = authenticateUser(req.body.name);
    resp.status(201).json({apptoken: token});

  } catch(err){
    resp.status(401).json({error: 'hey I am an error'});
  }
}) */

/**
 * route implementation GET /group
 * Testing done
 */
webapp.get('/group', async (req, resp) => {
  try {
    // get the data from the DB
    const user = await dbLib.getAllGroups();
    // send response
    resp.status(200).json({ data: user });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /group/:id
 * Testing done
 */
webapp.get('/group/:id', async (req, res) => {
  // console.log('GET a group by ID');
  try {
    // get the data from the db
    const results = await dbLib.getGroupById(req.params.id);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown group' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation PUT /group/:id
 * Testing done
 */
webapp.put('/group/:id', async (req, res) => {
  // console.log('UPDATE a group');
  console.log('PUT group/id req body print:', req.body);
  const updatedGroup = {
    ownerId: new ObjectId(req.body.ownerId),
    location: req.body.location,
    departDate: req.body.departDate,
    modeTransport: req.body.modeTransport,
    departPlace: req.body.departPlace,
    maxCapacity: req.body.maxCapacity,
    currCapacity: req.body.currCapacity,
    currMemberIds: req.body.currMemberIds.map((x) => new ObjectId(x)),
  };
  try {
    const result = await dbLib.changeGroup(req.params.id, updatedGroup);
    console.log('changeGroup result', result);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation POST /group
 * TESTING NOT DONE
 */
webapp.post('/group', async (req, res) => {
  console.log('CREATE a group');
  console.log('POST group req body print:', req.body);
  try {
    const newGroup = {
      ownerId: new ObjectId(req.body.ownerId),
      location: req.body.location,
      departDate: req.body.departDate,
      modeTransport: req.body.modeTransport,
      departPlace: req.body.departPlace,
      maxCapacity: req.body.maxCapacity,
      currCapacity: req.body.currCapacity,
      currMemberIds: req.body.currMemberIds.map((x) => new ObjectId(x)),
    };
    const result = await dbLib.createGroup(newGroup);
    // send the response with the appropriate status code
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation PUT /user/:id
 * Testing NOT DONE!!
 */
webapp.put('/user/:id', async (req, res) => {
  console.log('UPDATE a user');
  console.log('PUT user/id req body print:', req.body);
  const updatedUser = {
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    year: req.body.year,
    major: req.body.major,
    bio: req.body.bio,
    venmo: req.body.venmo,
    pennId: req.body.pennId,
    rating: req.body.rating,
    password: req.body.password,
  };
  try {
    const result = await dbLib.changeUser(req.params.id, updatedUser);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation DELETE /student/:id
 */
webapp.delete('/group/:id', async (req, res) => {
  try {
    const result = await dbLib.deleteGroupById(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'group not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

/**
 * route implementation DELETE /user/:id
 */
webapp.delete('/user/:id', async (req, res) => {
  try {
    const result = await dbLib.deleteUser(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'user not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

// methods for dealing with chatroom's backend

/**
 * route implementation POST /Chatroom
 * testing NOT DONE
 */
webapp.post('/Chatroom', async (req, resp) => {
  // if (!req.body.id || !req.body.texts || !req.body.currentMembersIds) {
  //   resp.status(404).json({ message: 'missing info' });
  //   return;
  // }
  try {
    // create the new student object
    console.log('req id', req.body.id);
    console.log('req texts', req.body.texts);
    console.log('req members', req.body.currentMembersIds);
    console.log('req chatname', req.body.chatName);
    console.log('req groudId', req.body.groupId);
    console.log('DO I EVEN ENTER THIS?');

    const newChatroom = {
      _id: new ObjectId(req.body.id),
      chatName: req.body.chatName,
      texts: req.body.texts,
      currentMembersIds: req.body.currentMembersIds,
      groupId: req.body.groupId,
    };

    console.log('new chat s', newChatroom);
    const result = await dbLib.createNewChatroom(newChatroom);
    // const result = await dbLib.addChatroom(newChatroom);
    resp.status(201).json({ data: { id: result } });
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation PUT /group/:id
 * Testing done
 */
// isn't being ran
webapp.put('/Chatroom/:id', async (req, res) => {
  console.log('UPDATE a chatroom');
  console.log('PUT chatroom/id req body print:', req.body);
  const updatedChat = {
    // _id: new ObjectId(req.body.chatId),
    chatName: req.body.chatName,
    texts: req.body.texts,
    currentMembersIds: req.body.currentMembersIds,
    // CHECK
    groupId: req.body.groupId,
  };
  console.log('updated chat obj', updatedChat);
  try {
    const result = await dbLib.changeChatroom(req.params.id, updatedChat);
    // send the response with the appropriate status code
    console.log('UPDATE message', result);
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

/**
 * route implementation GET /chat
 * Testing NOT DONE
 */
webapp.get('/Chatroom', async (req, resp) => {
  console.log('entered');
  try {
    // get the data from the DB
    const chats = await dbLib.getAllChatrooms();
    console.log('chats from server', chats);
    // send response
    resp.status(200).json({ data: chats });
  } catch (err) {
    // send the error code
    resp.status(400).json({ message: 'There was an error' });
  }
});

/**
 * route implementation GET /group/:id
 * Testing NOT done
 */
webapp.get('/Chatroom/:id', async (req, res) => {
  // console.log('GET a chatroom by ID');
  try {
    // get the data from the db
    const results = await dbLib.getChatroomById(req.params.id);
    if (results === undefined) {
      res.status(404).json({ error: 'unknown chatroom' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// /**
//  * route implementation GET /group/:name
//  * Testing NOT done
//  */
// webapp.get('/Chatroom/:chatName', async (req, res) => {
//   // console.log('GET a chatroom by ID');
//   try {
//     // get the data from the db
//     const results = await dbLib.getChatroomByName(req.params.chatName);
//     if (results === undefined) {
//       res.status(404).json({ error: 'unknown chatroom' });
//       return;
//     }
//     // send the response with the appropriate status code
//     res.status(200).json({ data: results });
//   } catch (err) {
//     res.status(404).json({ message: 'there was error' });
//   }
// });

/**
 * route implementation DELETE /Chatroom/:id
 * testing NOT done
 */
webapp.delete('/Chatroom/:id', async (req, res) => {
  try {
    const result = await dbLib.deleteChatroom(req.params.id);
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'chat not in the system' });
      return;
    }
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: 'there was error' });
  }
});

// export the webapp// export the webapp
module.exports = webapp;
