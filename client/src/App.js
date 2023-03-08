/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, {
  useState, useRef, useLocalStorage, useEffect,
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
import { getAllUsers } from './api/users';

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
  // Please change later. Now, we obtain userId from the name user inputs in
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    // wrapper function
    async function getAllUsersWrapper() {
      const response = await getAllUsers();
      // console.log('User login', response.filter((item) => item.name === name.current)[0]);
      setUserId(response.filter((item) => item.name === name.current)[0].id);
      // console.log('current userId', userId.current);
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
            <TextField id="standard-required" label="Name" variant="outlined" onChange={handleChangeName} />
            <Button variant="contained" color="primary" onClick={handleClickLogin}>Login</Button>
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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  );

  // );
}

export default App;
