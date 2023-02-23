import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {
  CssBaseline, createTheme,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Post from './components/Post';

function App() {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/group/:group_id" element={<Post />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;
