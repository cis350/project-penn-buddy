/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Grid, Stack, Button, ListItem, TextField,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';
import { getAllUsers, getUserById, loginUser } from '../api/users';
import { usernameExists } from '../api/login';

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
      console.log('User login', response.filter((item) => item.name === name1)[0]._id.toString());
      setUserId(response.filter((item) => item.name === name1)[0]._id.toString());
      setTempId(response.filter((item) => item.name === name1)[0]._id.toString());
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
      const exists = await getUserById(tempId);
      console.log('exists?', exists);
      if (exists != null) {
        const user = await getUserById(tempId);
        if (user.password === password) {
          // const token = await loginUser(name1);
          // sessionStorage.setItem('app-token', token);
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
            label="Password"
            variant="filled"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <div className="center">
          <Button type="submit" variant="contained" color="primary" onClick={() => login()}>
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
