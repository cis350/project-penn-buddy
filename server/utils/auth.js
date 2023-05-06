/**
 * This module contains authentication and session functions
 */

// import JWT
const jwt = require('jsonwebtoken');

// import the env variables
require('dotenv').config();

// import DB function
const { getStudentByName } = require('../DbOperations');


/**
 * Create a JWT containing the username
 * @param {*} userid 
 * @returns the token
 */
const authenticateUser = (userid) => {

    try{
        const token = jwt.sign({username: userid}, process.env.KEY, {expiresIn: '10s'});
        console.log('token', token);
        return token;
    }catch(err){
        console.log('error', err.message);

    }
}

module.exports = { authenticateUser }