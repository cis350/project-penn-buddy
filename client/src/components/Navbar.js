/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  AppBar, Button, Toolbar, Typography, Stack,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  function handleActivity() {
    navigate('/group/1');
  }

  function handleActivityCR() {
    navigate('/chatroom');
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
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleActivity}>Activity Feed</Button>
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleActivityCR}>
            {/* <Link to="/chatroom"> */}
            Chat Room
            {/* </Link> */}
          </Button>
          <Button color="inherit" sx={{ color: 'black' }}>My History</Button>
          <Button color="inherit" sx={{ color: '#0096FF' }}>Create Post</Button>
          <Button
            color="inherit"
            sx={{ color: 'white', backgroundColor: '#EA3C3C' }}
            style={{
              minWidth: '110px',
            }}
          >
            My Profile
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>

  );
}
