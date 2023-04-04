import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Grid, Stack, Button, ListItem, TextField,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';
import { getAllUsers } from '../api/users';

function Login({ setLogin, setUserId, setName }) {
  const [name1, setName1] = useState('');
  const [firstName, setfirstName] = useState('');
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleClickLogin = (e) => {
    // check username and password, if it's correct set login to true
    // if correct, setLogin to true, setUserId to userid
    // if password is correct, return userId to client
    // if not correct, do nothing
    setLogin(true);
    navigate('/home');
  };

  const handleName = (e) => {
    setName(e.target.value);
    setName1(e.target.value);
  };

  useEffect(() => {
    // wrapper function
    async function getAllUsersWrapper() {
      const response = await getAllUsers();
      // console.log('name1:', name1);
      // console.log('User login', response);
      setUserId(response.filter((item) => item.name === name1)[0].id);
      // console.log('current userId', response.filter((item) => item.name === name.current)[0].id);
    }
    // run the wrapper function
    getAllUsersWrapper();
  });

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
            onChange={handleName}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Penn ID"
            variant="filled"
            required
            value={pennId}
            onChange={(e) => setPennId(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary" onClick={handleClickLogin}>
            Login
          </Button>
        </div>
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
