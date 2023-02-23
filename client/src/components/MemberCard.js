/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton, Grid, Modal,
} from '@mui/material';

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
        width: 60,
        height: 60,
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 50,
      height: 50,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function MemberCard({ name, username }) {
  return (
    <Stack direction="row" sx={{ flexGrow: 1 }} spacing={3} alignItems="center">
      <Avatar {...stringAvatar(name)} />
      <Stack spacing={0}>
        <Typography variant="h5" component="div">{name}</Typography>
        <Typography variant="h7" color="primary.dark">
          @
          {username}
        </Typography>
      </Stack>
    </Stack>
  );
}
