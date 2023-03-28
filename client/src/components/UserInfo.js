/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';
import EditField from './EditField';

export default function UserInfo({
  userId, userEmail, userName, userMajor, userVenmo, userYear, userNumber, userBio,
}) {
  const navigate = useNavigate();
  function handleSignOut() {
    navigate('/forms');
  }

  // Milestone 4 Edit user fields
  // eslint-disable-next-line no-shadow
  async function updateUser(userId, updatedData) {
    console.log('Updating user with ID', userId, 'and data', updatedData);
    try {
      const response = await fetch(`http://localhost:3004/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const [userInfo, setUserInfo] = useState({
    userId,
    userName,
    userEmail,
    userNumber,
    userYear,
    userMajor,
    userVenmo,
    userBio,
  });

  useEffect(() => {
    setUserInfo({
      userName,
      userEmail,
      userNumber,
      userYear,
      userMajor,
      userVenmo,
      userBio,
    });
  }, [userEmail, userName, userMajor, userNumber, userVenmo, userYear, userBio]);

  async function handleValueChange(field, newValue) {
    // Update the local state
    setUserInfo({ ...userInfo, [field]: newValue });
    console.log(`"${field}" updated to "${newValue}"`);

    // Prepare the updatedData object with correct field names
    const updatedData = { ...userInfo, [field]: newValue };
    const correctFieldNames = {
      userName: 'name',
      userEmail: 'email',
      userNumber: 'number',
      userYear: 'year',
      userMajor: 'major',
      userVenmo: 'venmo',
      userBio: 'bio',
    };

    const dataWithCorrectFieldNames = Object.keys(updatedData).reduce((acc, key) => {
      acc[correctFieldNames[key] || key] = updatedData[key];
      return acc;
    }, {});
    try {
      await updateUser(userId, dataWithCorrectFieldNames);
    } catch (error) {
      console.error('Error updating field', error);
    }
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
        <EditField field="username" value={userInfo.userName} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('email')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Email:</b>
        {' '}
        <EditField field="email" value={userInfo.userEmail} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('email')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Number:</b>
        {' '}
        <EditField field="number" value={userInfo.userNumber} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('number')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Year:</b>
        {' '}
        <EditField field="year" value={userInfo.userYear} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('year')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Major:</b>
        {' '}
        <EditField field="major" value={userInfo.userMajor} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('major')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Venmo:</b>
        {' '}
        <EditField field="venmo" value={userInfo.userVenmo} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('venmo')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Bio:</b>
        {' '}
        <EditField field="bio" value={userInfo.userBio} onValueChange={handleValueChange} />
        {/* <button type="button" onClick={() => editField('bio')}>Edit</button> */}
      </Typography>
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
    </Box>
  );
}
