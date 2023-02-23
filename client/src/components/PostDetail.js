/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MemberCard from './MemberCard';

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  if (name.split(' ').length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 48,
        height: 48,
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 48,
      height: 48,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function PostDetail() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Box className="postTab">
        <Stack direction="row" justifyContent="center">
          <MemberCard id="member-owner" name="Nicky" username="nickyktp" />
          <Stack direction="row" spacing={5} alignItems="center">
            <Stack spacing={1}>
              <Typography variant="h6">2/4 people</Typography>
              <Typography variant="h7">2 spots remaining</Typography>
            </Stack>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpen}
            >
              View members
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: '5px',
                boxShadow: 24,
                p: 4,
              }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h3">
                  Group Members
                </Typography>
                <Box sx={{ p: 1 }} />
                <MemberCard id="member-1" name="Grace" username="chanyat" />
                <Box sx={{ p: 1 }} />
                <MemberCard id="member-2" name="Grace" username="chanyat" />
              </Box>
            </Modal>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ p: 4 }} />
      <Container>
        <Grid container rowSpacing={6} columnSpacing={6}>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <LocationOnOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">Location</Typography>
                <Typography variant="h7">City, State</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <DirectionsCarFilledOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">Uber/Lyft XL</Typography>
                <Typography variant="h7">Mode of Transportation</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <AccessTimeOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">05:00 PM, December 22, 2023</Typography>
                <Typography variant="h7">Time to Depart</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <LogoutOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">The Radian</Typography>
                <Typography variant="h7">Departing Spot</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
