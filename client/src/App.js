/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState, useRef } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  CssBaseline, createTheme, TextField, Stack, Button, Typography,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Post from './pages/Post';

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
  const userId = useRef('');

  const handleClickLogin = (e) => {
    setLogin(!login);
  };

  const handleChangeName = (e) => {
    name.current = e.target.value;
  };

  const handleChangeUserId = (e) => {
    userId.current = e.target.value;
  };

  if (login === false) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1, fontWeight: 800, fontSize: '3.1rem',
          }}
          align="center"
          color="secondary"
        >
          Penn Buddy
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <TextField id="standard-required" label="Name" variant="outlined" onChange={handleChangeName} />
          <TextField id="standard-required" label="UserId" variant="outlined" onChange={handleChangeUserId} />
          <Button variant="contained" color="primary" onClick={handleClickLogin}>Login</Button>
        </Stack>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage name={name.current} />} />
        <Route path="/group/:group_id" element={<Post name={name.current} userId={userId.current} />} />
      </Routes>
    </ThemeProvider>
  );

  // );
}

export default App;
