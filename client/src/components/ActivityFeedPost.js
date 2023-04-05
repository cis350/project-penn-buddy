/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button, Rating,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import MemberCard from './MemberCard';
import { getUserById } from '../api/users';

export default function ActivityFeedPost({
  ownerId, location, departDate, modeTransport, departPlace,
  maxCapacity, currCapacity, currMemberIds, groupId, rating,
}) {
  const navigate = useNavigate();

  function handleOpen() {
    navigate(`/group/${groupId}`);
  }

  const [ratingScore, setUserRating] = useState([]);

  const average = (array) => {
    const inter = array.reduce((a, b) => (a + b)) / (array.length);
    return inter;
  };

  useEffect(() => {
    async function getUserByIdWrapper() {
      const response = await getUserById(ownerId);
      const ratingArr = response.rating;
      setUserRating(average(ratingArr));
    }
    // run the wrapper function
    getUserByIdWrapper();
    // should add a dependency
  });

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#F0F0F0',
            width: '700px',
            height: '346px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: 2,
          }}
        >
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item sx={{ flexGrow: 1 }}>
              <MemberCard key={ownerId} userId={ownerId} />
              <br />
              <div>
                Rating:
                {' '}
                {ratingScore}
              </div>
            </Grid>
            <Grid item xs={6} justify="flex-end">
              <Stack className="location" direction="row" spacing={3} alignItems="center">
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpen}
                  >
                    View Post Details
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h6">
                  {currCapacity}
                  /
                  {maxCapacity}
                  {' '}
                  people
                </Typography>
                <Typography variant="h7">
                  {maxCapacity - currCapacity}
                  {' '}
                  spots remaining
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack className="location" direction="row" spacing={3} alignItems="center">
                <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: 50 }} />
                <Stack spacing={1}>
                  <Typography variant="h6">{location}</Typography>
                  <Typography variant="h7">Location</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack className="location" direction="row" spacing={3} alignItems="center">
                <DirectionsCarFilledOutlinedIcon color="secondary" sx={{ fontSize: 50 }} />
                <Stack spacing={1}>
                  <Typography variant="h6">{modeTransport}</Typography>
                  <Typography variant="h7">Mode of Transportation</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack className="location" direction="row" spacing={3} alignItems="center">
                <AccessTimeOutlinedIcon color="secondary" sx={{ fontSize: 50 }} />
                <Stack spacing={1}>
                  <Typography variant="h6">{departDate}</Typography>
                  <Typography variant="h7">Time to Depart</Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack className="location" direction="row" spacing={3} alignItems="center">
                <LogoutOutlinedIcon color="secondary" sx={{ fontSize: 50 }} />
                <Stack spacing={1}>
                  <Typography variant="h6">{departPlace}</Typography>
                  <Typography variant="h7">Departing Spot</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
