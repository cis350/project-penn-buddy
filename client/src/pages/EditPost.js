/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, TextField,
} from '@mui/material';
import MyPost from '../components/MyPost';
import OtherPost from '../components/OtherPost';
import { getGroupById, changeGroup } from '../api/groups';

export default function EditPost({ userId }) {
  if (userId === null) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  const { groupId } = useParams();

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

  const handleEditPost = async (e) => {
    const modifiedData = {
      id: groupId,
      ownerId,
      location,
      departDate,
      modeTransport,
      departPlace,
      maxCapacity,
      currCapacity,
      currMemberIds,
    };
    const response = await changeGroup(groupId, modifiedData);
    navigate(`/group/${groupId}`);
  };

  useEffect(() => {
    // wrapper function
    async function getGroupByIdWrapper() {
      console.log('UserId in Post', userId);
      const response = await getGroupById(groupId);
      // console.log('response', response);
      setOwnerId(response.ownerId);
      setLocation(response.location);
      setDepartDate(response.departDate);
      setModeTransport(response.modeTransport);
      setDepartPlace(response.departPlace);
      setMaxCapacity(response.maxCapacity);
      setCurrCapacity(response.currCapacity);
      setCurrMemberIds(response.currMemberIds);
    }
    // run the wrapper function
    getGroupByIdWrapper();
  }, []);

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
        Edit Post
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
            data-testid="Depart Place"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Max Capacity"
            variant="filled"
            required
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
            data-testid="Max Capacity"
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
            type="submit"
            data-testid="Post Button"
            onClick={handleEditPost}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
