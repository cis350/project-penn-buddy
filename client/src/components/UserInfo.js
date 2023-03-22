/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';

export default function UserInfo({
  userName, userEmail, userNumber, userYear,
  userMajor, userVenmo, userBio,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function editField(field) {
    const textField = document.createElement('input');
    const currentText = document.getElementById(`${field}-text`).textContent;
    textField.value = currentText;
    textField.addEventListener('blur', () => {
      const updatedText = textField.value;
      document.getElementById(`${field}-text`).textContent = updatedText;
      textField.parentNode.replaceChild(document.createTextNode(updatedText), textField);
    });
    document.getElementById(`${field}-text`).parentNode.replaceChild(textField, document.getElementById(`${field}-text`));
  }

  const navigate = useNavigate();
  function handleSignOut() {
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
        src="/images/pfp.png"
      />
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Linda Shen</b>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Email:</b>
        {' '}
        lshen7@sas.upenn
        <button type="button" onClick={() => editField('email')}>Edit</button>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Number:</b>
        {' '}
        (315) 572 - 6114
        <button type="button" onClick={() => editField('number')}>Edit</button>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Year:</b>
        {' '}
        Sophomore
        <button type="button" onClick={() => editField('year')}>Edit</button>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Major:</b>
        {' '}
        Econ/CS
        <button type="button" onClick={() => editField('major')}>Edit</button>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Venmo:</b>
        {' '}
        @lindashen
        <button type="button" onClick={() => editField('venmo')}>Edit</button>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'left' }}>
        <b>Bio:</b>
        {' '}
        I love to eat and sleep!
        <button type="button" onClick={() => editField('bio')}>Edit</button>
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
