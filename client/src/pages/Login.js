import React, { useState, useEffect } from 'react';
import {
  Container, FormGroup, FormControl, FormLabel, Typography, Grid, Stack, Button, ListItem,
} from '@mui/material';
// import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';

function Login( {setLogin,setUserId} ) {
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  
  function handleHome() {
    navigate('/');
  };

  /*
  const handleClickLogin = (e) => {
    // check username and password, if it's correct set login to true
    // if correct, setLogin to true, setUserId to userid
    // if password is correct, return userId to client
    // if not correct, do nothing
  };  */
  function handleUsername(e) {
    setPennId(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <NavbarLogin />
      <div className="login-box">
        <h3 className="center">Welcome!</h3>
        <FormGroup>
          <FormLabel> Penn ID </FormLabel>
          <FormControl type="text" onChange={(e) => handleUsername(e)} placeholder="Enter Penn ID" />
        </FormGroup>
        <br />
        <FormGroup>
          <FormLabel> Password </FormLabel>
          <FormControl type="text" onChange={(e) => handlePassword(e)} placeholder="Enter password" />
        </FormGroup>
        <br />
        {error ? <div className="errorTextStyle center">{message}</div> : null}
        <div>
          <div className="center">
            <Button onClick={handleClickLogin} className="btn-login">Log In</Button>
          </div>
          <br />
          <hr />
          <p className="center">
            Do you have an account already?
            {' '}
            <Link to="/signup">Click to Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
