/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  AppBar, Button, Toolbar, Typography, Stack,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  function handleActivity() {
    navigate('/activityfeed');
  }

  // To view profile page, event handler
  function handleProfile() {
    navigate('/profile');
  }

  // To create a new post
  function handleNewPost() {
    navigate('/newpost');
  }

  function handleActivityCR() {
    navigate('/chatroom/0');
  }

  function handleHistory() {
    navigate('/History');
  }

  return (
    <AppBar
      className="appbar"
      position="static"
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 0,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1, fontWeight: 800, fontSize: '3.1rem',
          }}
          color="secondary"
        >
          Penn Buddy
        </Typography>
        <Stack direction="row" spacing={6}>
          <Button id="activityfeedbutton" color="inherit" sx={{ color: 'black' }} onClick={handleActivity}>Activity Feed</Button>
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleActivityCR}>
            Chat Room
          </Button>
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleHistory}>My History</Button>
          <Button color="inherit" sx={{ color: '#0096FF' }} onClick={handleNewPost}>Create Post</Button>
          <Button
            id="myprofilebutton"
            color="inherit"
            sx={{ color: 'white', backgroundColor: '#EA3C3C' }}
            style={{
              minWidth: '110px',
            }}
            onClick={handleProfile}
          >
            My Profile
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>

  );
}
