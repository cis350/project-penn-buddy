import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createGroup } from '../api/groups';

function CreatePost({ userId }) {
  if (userId === null) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  const [ownerId, setOwnerId] = useState(0);
  const [location, setLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [modeTransport, setModeTransport] = useState('');
  const [departPlace, setDepartPlace] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currCapacity, setCurrCapacity] = useState(0);
  const [currMemberIds, setCurrMemberIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreatePost = async (e) => {
    const modifiedData = {
      ownerId: userId,
      location,
      departDate,
      modeTransport,
      departPlace,
      maxCapacity,
      currCapacity: 1,
      currMemberIds: [userId],
    };
    // console.log('postGroupdara', modifiedData);
    const response = await createGroup(modifiedData);
    navigate(`/activityfeed`);
  };

  return (
    <div>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1, fontWeight: 800, fontSize: '2.5rem',
        }}
        color="secondary"
        align="center"
      >
        New Post
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1, fontWeight: 800, fontSize: '1.8rem',
        }}
        color="secondary"
        align="center"
      >
        Find your travel buddies!
      </Typography>
      <form data-testid="Form" onSubmit={handleSubmit}>
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
            label="Location"
            variant="filled"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            data-testid="Time"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Depart Date"
            variant="filled"
            required
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            data-testid="Date"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Mode of Transportation"
            variant="filled"
            required
            value={modeTransport}
            onChange={(e) => setModeTransport(e.target.value)}
            data-testid="Mode of Transportation"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Depart Place"
            variant="filled"
            required
            value={departPlace}
            onChange={(e) => setDepartPlace(e.target.value)}
            data-testid="Departure"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Max Capacity"
            variant="filled"
            required
            onChange={(e) => setMaxCapacity(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
            type="submit"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </div>
      </form>
    </div>

  );
}
export default CreatePost;
