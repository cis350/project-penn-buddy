/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, {
  useState, useRef, useEffect,
} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  CssBaseline, createTheme, TextField, Stack, Button, Typography,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import NavbarLogin from './components/NavbarLogin';
import Post from './pages/Post';
import Profile from './pages/Profile';
import UserInfo from './components/UserInfo';
import CreatePost from './pages/CreatePost';
import { getAllUsers } from './api/users';
import ActivityFeed from './pages/ActivityFeed';
import History from './pages/History';
import ActivityFeedPost from './components/ActivityFeedPost';

function App() {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        dark: '#969696',
      },
      secondary: {
        main: '#0096FF',
      },
      warning: {
        main: '#EA3C3C',
      },
      info: {
        main: '#0096FF',
      },
      button: {
        textTransform: 'none',
      },
    },
    typography: {
      fontFamily: 'DM Sans',
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      },
      h5: {
        fontWeight: 600,
      },
    },
  });

  const [login, setLogin] = useState(false);
  const name = useRef('');
  // Please change this part & useEffect later. Now, we obtain userId from the name user inputs in.
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pennId, setPennId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
  };

  useEffect(() => {
    // wrapper function
    async function getAllUsersWrapper() {
      const response = await getAllUsers();
      // console.log('User login', response.filter((item) => item.name === name.current)[0]);
      setUserId(response.filter((item) => item.name === name.current)[0].id);
      // console.log('current userId', response.filter((item) => item.name === name.current)[0].id);
    }
    // run the wrapper function
    getAllUsersWrapper();
  }, [login]);

  const handleClickLogin = (e) => {
    setLogin(true);
  };

  const handleChangeName = (e) => {
    name.current = e.target.value;
  };

  if (login === false) {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavbarLogin />
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="filled"
                required
                onChange={handleChangeName}
              />
              <TextField
                label="Last Name"
                variant="filled"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Penn ID"
                variant="filled"
                required
                value={pennId}
                onChange={(e) => setPennId(e.target.value)}
              />
              <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div>
              <Button type="submit" variant="contained" color="primary" onClick={handleClickLogin}>
                login
              </Button>
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary" onClick={handleClickLogin}>
                Register
              </Button>
            </div>
          </Stack>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage name={name.current} />} />
          <Route path="/group/:groupId" element={<Post name={name.current} userId={userId} />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="/newpost" element={<CreatePost userId={userId} />} />
          <Route path="/History" element={<History userId={userId} />} />
          <Route path="" element={<UserInfo />} />
          <Route path="/activityfeed" element={<ActivityFeed />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  );

  // );
}

export default App;
