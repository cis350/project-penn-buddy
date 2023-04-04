/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Typography, Stack, Box, Avatar,
} from '@mui/material';
import { deleteUser } from '../api/users';

export default function UserInfo({
  userId, userName, userPennId, userEmail, userMajor,
  userVenmo, userYear, userNumber, userBio, setLogin,
}) {
  const navigate = useNavigate();
  function handleSignOut() {
    setLogin(false);
    navigate('/');
  }

  function handleEditProfile() {
    navigate(`/editprofile`);
  }

  async function handleDeleteUser() {
    await deleteUser(userId);
    setLogin(false);
    navigate('/');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid black',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <Avatar
        sx={{ width: 128, height: 128 }}
        src="/images/logo192.png"
      />
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Username:</b>
        {' '}
        {userName}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>PennID:</b>
        {' '}
        {userPennId}
        {/* <button type="button" onClick={() => editField('pennId')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Email:</b>
        {' '}
        {userEmail}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Number:</b>
        {' '}
        {userNumber}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Year:</b>
        {' '}
        {userYear}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Major:</b>
        {' '}
        {userMajor}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Venmo:</b>
        {' '}
        {userVenmo}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Bio:</b>
        {' '}
        {userBio}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => handleSignOut()}
          login={false}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
          type="submit"
        >
          Sign Out
        </Button>
        <Button
          onClick={() => handleDeleteUser()}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#FF9900', color: 'white', width: '200px' }}
          type="submit"
        >
          Delete User
        </Button>
      </Stack>
      <Button
        onClick={() => handleEditProfile()}
        variant="contained"
        color="secondary"
        style={{ backgroundColor: '#0096FF', color: 'white', width: '200px' }}
        type="submit"
      >
        Edit Profile
      </Button>
    </Box>
  );
}
