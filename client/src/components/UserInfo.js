/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';

export default function UserInfo({
  userName, userPennId, userEmail, userMajor, userVenmo, userYear, userNumber, userBio,
}) {
  // implemented during Milestone 4, users will be able to edit their own profile
  // function editField(field) {
  //  const textField = document.createElement('input');
  //  const currentText = document.getElementById(`${field}-text`).textContent;
  //  textField.value = currentText;
  //  textField.addEventListener('blur', () => {
  //    const updatedText = textField.value;
  //    document.getElementById(`${field}-text`).textContent = updatedText;
  //    textField.parentNode.replaceChild(document.createTextNode(updatedText), textField);
  //  });
  // eslint-disable-next-line max-len
  //  document.getElementById(`${field}-text`).parentNode.replaceChild(textField, document.getElementById(`${field}-text`));
  // }

  // milestone 4 logistics
  const navigate = useNavigate();
  function handleSignOut() {
    navigate('');
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
        src="/images/pfp.png"
      />
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Username:</b>
        {' '}
        {userName}
        {/* <button type="button" onClick={() => editField('email')}>Edit</button> */}
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
        {/* <button type="button" onClick={() => editField('email')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Number:</b>
        {' '}
        {userNumber}
        {/* <button type="button" onClick={() => editField('number')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Year:</b>
        {' '}
        {userYear}
        {/* <button type="button" onClick={() => editField('year')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Major:</b>
        {' '}
        {userMajor}
        {/* <button type="button" onClick={() => editField('major')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Venmo:</b>
        {' '}
        {userVenmo}
        {/* <button type="button" onClick={() => editField('venmo')}>Edit</button> */}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Bio:</b>
        {' '}
        {userBio}
        {/* <button type="button" onClick={() => editField('bio')}>Edit</button> */}
      </Typography>
    </Box>
  );
}
