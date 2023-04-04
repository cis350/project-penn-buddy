/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { changeUser, getUserById } from '../api/users';

function Profile({ userId, setLogin }) {
  if (userId === null) {
    return <div>Loading...</div>;
  }
  console.log(userId);

  const [userName, setUserName] = useState('');
  const [userPennId, setPennId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userYear, setUserYear] = useState('');
  const [userMajor, setUserMajor] = useState('');
  const [userVenmo, setUserVenmo] = useState('');
  const [userBio, setUserBio] = useState('');

  const navigate = useNavigate();
  function handleSignOut() {
    setLogin(false);
    navigate('/');
  }

  useEffect(() => {
    async function getProfileInfoWrapper() {
      console.log('UserId in Profile', userId);
      const response = await getUserById(userId);
      console.log('Profile Info', response);
      console.log('pennId', response.pennId);
      setUserName(response.name);
      setPennId(response.pennId);
      setUserEmail(response.email);
      setUserVenmo(response.venmo);
      setUserNumber(response.number);
      setUserYear(response.year);
      setUserBio(response.bio);
      setUserMajor(response.major);
    }
    getProfileInfoWrapper();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Welcome to Your Profile!</h1>
      <UserInfo
        userName={userName}
        userPennId={userPennId}
        userEmail={userEmail}
        userNumber={userNumber}
        userYear={userYear}
        userMajor={userMajor}
        userVenmo={userVenmo}
        userBio={userBio}
      />
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
    </div>
  );
}
export default Profile;
