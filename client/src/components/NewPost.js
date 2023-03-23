/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  // eslint-disable-next-line max-len
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal, TextField,
} from '@mui/material';

function Post() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [transportation, setTransportation] = useState('');

  const handleNewPost = (e) => {
    e.preventDefault();
    console.log(time, date, destination, departure, transportation);
  };

  const navigate = useNavigate();
  function handleCreatePost() {
    navigate('/group/1');
  }

  return (
    <form onSubmit={handleNewPost}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        alignItems: 'center',
      }}
      >
        <TextField
          label="Time"
          variant="filled"
          required
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ marginBottom: '16px', width: '200px' }}
        />
        <TextField
          label="Date"
          variant="filled"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginBottom: '16px', width: '200px' }}
        />
        <TextField
          label="Destination"
          variant="filled"
          required
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginBottom: '16px', width: '400px' }}
        />
        <TextField
          label="Departure From"
          variant="filled"
          required
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          style={{ marginBottom: '16px', width: '400px' }}
        />
        <TextField
          label="Transportation Method"
          variant="filled"
          required
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
          style={{ marginBottom: '16px', width: '400px' }}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
          type="submit"
          onClick={() => handleCreatePost()}
        >
          Create Post
        </Button>
      </div>
    </form>

  );
}
export default Post;
