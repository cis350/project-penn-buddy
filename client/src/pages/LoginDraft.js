/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Grid, Stack, Button, ListItem, TextField,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';
import {
  getAllUsers, getUserById, loginUser, loginU,
} from '../api/users';
import {
  usernameExists, getUser, checkPassword, checkUserSession,
} from '../api/login';

function Login({
  setLogin, setUserId, setName,
}) {
  const [name1, setName1] = useState('');
  const [tempId, setTempId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickLogin = (e) => {
    // check username and password, if it's correct set login to true
    // if correct, setLogin to true, setUserId to userid
    // if password is correct, return userId to client
    // if not correct, do nothing
    // login();
    setLogin(true);
    navigate('/home');
  };

  const handlePennKey = (e) => {
    setName(e.target.value);
    setName1(e.target.value);
  };

  useEffect(() => {
    // wrapper function
    async function getAllUsersWrapper() {
      const response = await getAllUsers();
      console.log('name1:', name1);
      if (response.filter((item) => item.name === name1).length > 0) {
        setUserId(response.filter((item) => item.name === name1)[0]._id.toString());
        setTempId(response.filter((item) => item.name === name1)[0]._id.toString());
      }
      console.log('tempId', tempId);
    }
    // run the wrapper function
    getAllUsersWrapper();
  });

  async function login() {
    if (!name1 || !password) {
      setMessage('Fill in all required fields');
      setError(true);
    } else {
      setError(false);
      const token = await loginU(name1);
      // const exists = await getUserById(tempId);
      console.log('exists?', token);
      if (token || token != null) {
        // const user = await getUser(name1, password);
        const user = await loginUser(tempId);
        console.log('user?', user);
        if (user.password === password) {
          // const token = await loginUser(tempId);
          sessionStorage.setItem('app-token', token);
          sessionStorage.setItem('app-userId', user._id);
          sessionStorage.setItem('app-name', user.name);
          setLogin(true);
          navigate('/home');
        } else {
          setMessage('Incorrect password or incorrect username');
          setError(true);
        }
      } else {
        setMessage('user does not exist!');
        setError(true);
      }
    }
  }

  return (
    <div>
      <div className="login-box">
        <h3 className="center">Welcome to Penn Buddy!</h3>
        <FormGroup>
          <TextField
            id="namefield"
            label="pennKey"
            variant="filled"
            required
            data-testid="Name"
            onChange={handlePennKey}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            id="passwordfield"
            label="Password"
            variant="filled"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <div className="center">
          <Button id="loginbutton" type="submit" variant="contained" color="primary" onClick={() => login()}>
            Login
          </Button>
        </div>
        {error ? <div style={{ color: '#EA3C3C' }} className="errorTextStyle center">{message}</div> : null}
        <div>
          <br />
          <hr />
          <p className="center">
            Do you have an account yet?
            {' '}
            <Link to="/register">Click to Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

/* import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Typography, Grid, Stack, Button, ListItem,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';

function Login({ setLogin, setUserId }) {
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
}

export default function LoginDraft() {
  return (
    <div>
      <NavbarLogin />
      Hello
    </div>
  );
}
*/
