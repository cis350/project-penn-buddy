/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box,
  Avatar, IconButton, Grid, Modal,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MemberCard from './MemberCard';
import Rating from './Rating';

export default function PostDetail({
  ownerId, location, departDate, modeTransport,
  departPlace, maxCapacity, currCapacity, currMemberIds, group,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Box className="postTab">
        <Stack direction="row" justifyContent="center">
          <MemberCard key={ownerId} userId={ownerId} />
          <Stack direction="row" spacing={5} alignItems="center">
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
                {
                  currMemberIds.map(
                    (currMemberId) => (
                      <div>
                        <Box key={currMemberId} sx={{ p: 1 }} />
                        <Stack direction="row">
                          <MemberCard key={currMemberId} userId={currMemberId} />
                          <Rating userId={currMemberId} />
                        </Stack>
                      </div>
                    ),
                  )
                }
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
                <Typography variant="h6">{location}</Typography>
                <Typography variant="h7">Location</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <DirectionsCarFilledOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">{modeTransport}</Typography>
                <Typography variant="h7">Mode of Transportation</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <AccessTimeOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">{departDate}</Typography>
                <Typography variant="h7">Time to Depart</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack className="location" direction="row" spacing={3} alignItems="center">
              <LogoutOutlinedIcon color="secondary" sx={{ fontSize: 70 }} />
              <Stack spacing={1}>
                <Typography variant="h6">{departPlace}</Typography>
                <Typography variant="h7">Departing Spot</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
