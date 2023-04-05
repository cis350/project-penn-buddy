import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Grid, Stack, Button, ListItem, TextField,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';
import { getAllUsers } from '../api/users';
import { createUser } from '../api/register';

function Register({ setLogin, setUserId, setName }) {
  const [name1, setName1] = useState('');
  const [pennId, setPennId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userYear, setUserYear] = useState('');
  const [userMajor, setUserMajor] = useState('');
  const [userVenmo, setUserVenmo] = useState('');
  const [userBio, setUserBio] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  /*
  const [name1, setName1] = useState('');
  const [firstName, setfirstName] = useState('');
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(''); */

  const handleClickregister = async (e) => {
    // console.log(name1);
    const modifiedData = {
      name: name1,
      pennId,
      email: userEmail,
      number: userNumber,
      year: userYear,
      password,
      major: userMajor,
      venmo: userVenmo,
      bio: userBio,
      rating: null,
    };
    // console.log(modifiedData);
    const response = await createUser(modifiedData);
    navigate(`/`);
  };

  const handleName = (e) => {
    setName(e.target.value);
    setName1(e.target.value);
  };

  return (
    <div>
      <div className="login-box">
        <h3 className="center">Register To Use Penn Buddy!</h3>
        <FormGroup>
          <TextField
            label="pennKey"
            variant="filled"
            required
            value={name1}
            data-testid="Name"
            onChange={(e) => setName1(e.target.value)}
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
            label="Email"
            variant="filled"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Number"
            variant="filled"
            required
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Year"
            variant="filled"
            required
            value={userYear}
            onChange={(e) => setUserYear(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Major"
            variant="filled"
            required
            value={userMajor}
            onChange={(e) => setUserMajor(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Venmo"
            variant="filled"
            required
            value={userVenmo}
            onChange={(e) => setUserVenmo(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <TextField
            label="Type a short Bio here!"
            variant="filled"
            required
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary" onClick={handleClickregister}>
            Register
          </Button>
        </div>
        <div>
          <br />
          <hr />
          <p className="center">
            Already have an account yet?
            {' '}
            <Link to="/">Click to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

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
