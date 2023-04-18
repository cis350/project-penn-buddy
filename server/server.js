/* eslint-disable no-console */
/**
 * Express webserver / controller
 */

// import express
const express = require('express');

// import the cors -cross origin resource sharing- module
const cors = require('cors');

// import ObjectID
const { ObjectId } = require('mongodb');

// create a new express app
const webapp = express();

// enable cors
webapp.use(cors());

// support parsing of application/json type post data
const bodyParser = require('body-parser');

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
 * route implementation GET /user
 * Testing done
 */
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
 * route implementation add user Login
 
webapp.post('/api/login', async (req, resp) => {
  if (!req.body.name || req.body.name.length === 0) {
    resp.status(401).json({ error: 'pennKey not provided' });
    return;
  }
  if (!req.body.password || req.body.password.length === 0) {
    resp.status(401).json({ error: 'password not provided' });
    return;
  }
  try {
    const result = await dbLib.getUserById(req.params.id);
    // req.session.name = result.name;
    resp.status(200).json({ message: 'successfully logged in', data: result });
  } catch (err) {
    resp.status(401).json({ error: 'could not find user' });
  }
});
*/

/**
 * route implementation add user signup
 */
 webapp.post('/user', async (req, res) => {
  console.log('POST a acc');
  console.log('POST register req body print:', req.body);
  /*
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
  } */
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
      rating: null,
      password: req.body.password,
    };
    const result = await dbLib.createUser(newUser);
    // req.session.pennid = result.pennid;
    // req.session.firstname = result.firstname;
    // req.session.lastname = result.lastname;
    res.status(201).json({ message: 'successfully added user', data: result });
  } catch (err) {
    res.status(400).json({ error: 'could not add user' });
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
  console.log('GET a group by ID');
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
  console.log('UPDATE a group');
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

// export the webapp// export the webapp
module.exports = webapp;
