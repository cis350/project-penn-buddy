import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, AppBar, Button, Toolbar, Typography, Stack, Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Post() {
  const { group_id } = useParams();
  return (
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
          Depend on whether user is the group owner or not
          <Button variant="contained" color="secondary">Join Group</Button>
          <Button variant="contained" color="warning">Leave Group</Button>
        </Stack>
        {/* How to display different functions based on whether or not user is owner
        Do we need to pass down userId as a prop and check with the query from JSON? */}
      </Toolbar>
    </AppBar>
  );
}
