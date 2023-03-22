import React from 'react';
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MemberCard from './MemberCard';

export default function ActivityFeedPost({
  ownerId, location, departDate, modeTransport, departPlace,
  maxCapacity, currCapacity, currMemberIds, groupId,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                Group ID:
                {' '}
                {groupId}
              </Typography>
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
