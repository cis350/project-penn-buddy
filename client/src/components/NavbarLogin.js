/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  AppBar, Button, Toolbar, Typography, Stack, Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavbarLogin() {
  const navigate = useNavigate();

  function handleHome() {
    navigate('/');
  }

  function handleAboutUs() {
    navigate('/aboutus');
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
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleHome}>Home</Button>
          <Button color="inherit" sx={{ color: 'black' }} onClick={handleAboutUs}>About Us</Button>
          <Button color="inherit" sx={{ color: 'black' }}>How We Work</Button>
        </Stack>
      </Toolbar>
    </AppBar>

  );
}
