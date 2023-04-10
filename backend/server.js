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
 * route implementation GET /group/:id
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
 */
webapp.put('/group/:id', async (req, res) => {
  console.log('UPDATE a group');
  try {
    const updatedGroup = {
      ownerId: new ObjectId(req.body.ownerId),
      location: req.body.location,
      departDate: req.body.departDate,
      modeTransport: req.body.modeTransport,
      departPlace: req.body.departPlace,
      maxCapacity: req.body.maxCapacity,
      currCapacity: req.body.currCapacity,
      currMemberIds: req.body.currMemberIds,
    };
    const result = await dbLib.changeGroup(req.params.id, updatedGroup);
    // send the response with the appropriate status code
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(404).json({ message: 'there was error' });
  }
});

// export the webapp// export the webapp
module.exports = webapp;
