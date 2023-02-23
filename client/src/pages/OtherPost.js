/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostDetail from '../components/PostDetail';

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
            <Button variant="contained" color="secondary">Join Group</Button>
            {/* If user is in the group already, display below
            <Button variant="contained" color="warning">Leave Group</Button> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <PostDetail />

    </div>

  );
}
