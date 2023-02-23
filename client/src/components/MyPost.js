/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostDetail from './PostDetail';

export default function Post({ name }) {
  const { group_id } = useParams();

  return (
    <div>
      <AppBar
        className="postbar"
        position="static"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 0,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Toolbar>
          <ArrowBackIcon color="secondary" />
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="text" color="secondary" sx={{ flex: 1 }}>Back to Activity Feed</Button>
          </Box>
          <Stack direction="row" spacing={3}>
            <Button variant="contained" color="warning">Delete Group</Button>
            <Button variant="contained" color="secondary">Edit Group</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <PostDetail />

    </div>

  );
}
