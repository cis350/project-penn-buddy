/* eslint-disable max-len */
import React from 'react';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar,
  IconButton, Rating, List, ListItem,
} from '@mui/material';

export default function HomePage({ name }) {
  return (
    <div>
      <Box sx={{ mx: 10 }}>
        <Typography variant="h3" align="center">
          Hello,
          {' '}
          {name}
        </Typography>
        <Typography variant="h4" align="center">
          What is Penn Buddy?
        </Typography>
        <Typography variant="h7" align="center">
          Penn Buddy is a platform designed for Penn students who are traveling alone or looking to meet new people. To join our platform, users will need to verify themselves through their Penn email. This application will resemble a search engine platform where you can input information about your “source” and “destination” as well as the date and time at which you are planning to commute there. For instance, users can insert their flight information to search for and connect with other users who are heading to and from the places around the same time.

          We are planning to also expand its functions, such that this platform also connects users through other events like dining together or just any event that users can benefit from having more people join.

          Users will also have a profile page where they can write information about themselves: name, age, year, major, as well as venmo handle. We want to incorporate a convenient bill-splitting widget or feature that would allow students to more easily split rides or meals. In addition, to ensure that users do pay their share in the end and display appropriate behaviors; we will also add ratings to their accounts–similar to how Uber has ratings for their drivers and riders.

        </Typography>
      </Box>
    </div>

  );
}
