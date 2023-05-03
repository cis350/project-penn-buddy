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
import AboutUs from './pages/AboutUs';
import Chatroom from './pages/Chatroom';
import EditPost from './pages/EditPost';
import Register from './pages/Register';
import LoginDraft from './pages/LoginDraft';
import EditProfile from './pages/EditProfile';

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

  const [login, setLogin] = useState(sessionStorage.getItem('app-token') !== null);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

  if (login === false) {
    // console.log(login);
    // console.log(name);
    // console.log(userId);
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavbarLogin />
          <Routes>
            <Route path="" element={<LoginDraft setLogin={setLogin} setUserId={setUserId} setName={setName} />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/register" element={<Register setLogin={setLogin} setUserId={setUserId} setName={setName} />} />
          </Routes>
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
          <Route path="/home" element={<HomePage name={name} />} />
          <Route path="/group/:groupId" element={<Post name={name} userId={userId} />} />
          <Route path="/profile" element={<Profile userId={userId} setLogin={setLogin} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/newpost" element={<CreatePost userId={userId} />} />
          <Route path="/History" element={<History userId={userId} />} />
          <Route path="/activityfeed" element={<ActivityFeed />} />
          <Route path="/chatroom" element={<Chatroom userId={userId} name={name} />} />
          <Route path="/editpost/:groupId" element={<EditPost userId={userId} />} />
          <Route path="/editprofile" element={<EditProfile userId={userId} />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
