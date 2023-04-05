/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, TextField,
} from '@mui/material';
import UserInfo from '../components/UserInfo';
import { getUserById, changeUser, getAllUsers } from '../api/users';

export default function EditProfile({ userId }) {
  if (userId === null) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();
  const [name, setUserName] = useState('');
  const [email, setUserEmail] = useState('');
  const [pennId, setPennID] = useState('');
  const [number, setUserNumber] = useState('');
  const [year, setUserYear] = useState('');
  const [major, setUserMajor] = useState('');
  const [venmo, setUserVenmo] = useState('');
  const [bio, setUserBio] = useState('');
  const [rating, setUserRating] = useState('');
  const [password, setUserPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditProfile = async (e) => {
    const modifiedData = {
      id: userId,
      name,
      pennId,
      email,
      number,
      year,
      major,
      venmo,
      bio,
      rating,
      password,
    };
    const response = await changeUser(userId, modifiedData);
    // go back to profile, information should be updated
    navigate(`/profile`);
  };

  useEffect(() => {
    // wrapper function
    async function getUserByIdWrapper() {
      console.log('UserId in Post', userId);
      const response = await getUserById(userId);
      // console.log('response', response);
      setUserName(response.name);
      setUserEmail(response.email);
      setPennID(response.pennId);
      setUserNumber(response.number);
      setUserYear(response.year);
      setUserMajor(response.major);
      setUserVenmo(response.venmo);
      setUserBio(response.bio);
      setUserRating(response.rating);
      setUserPassword(response.password);
    }
    // run the wrapper function
    getUserByIdWrapper();
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
        Edit Profile
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
            label="Username:"
            variant="filled"
            required
            data-testid="username"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Email:"
            variant="filled"
            required
            data-testid="email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Number:"
            variant="filled"
            required
            data-testid="number"
            value={number}
            onChange={(e) => setUserNumber(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Year:"
            variant="filled"
            required
            data-testid="year"
            value={year}
            onChange={(e) => setUserYear(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Major"
            variant="filled"
            required
            data-testid="major"
            value={major}
            onChange={(e) => setUserMajor(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Venmo"
            variant="filled"
            required
            data-testid="venmo"
            value={venmo}
            onChange={(e) => setUserVenmo(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <TextField
            label="Bio"
            variant="filled"
            required
            data-testid="bio"
            value={bio}
            onChange={(e) => setUserBio(e.target.value)}
            style={{ marginBottom: '16px', width: '400px' }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
            type="submit"
            onClick={handleEditProfile}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
