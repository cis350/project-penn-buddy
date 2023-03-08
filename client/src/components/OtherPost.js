/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostDetail from './PostDetail';

export default function OtherPost({
  ownerId, location, departDate, modeTransport,
  departPlace, maxCapacity, currCapacity, currMemberIds,
  groupId, userId, group, handleLeaveGroup, handleJoinGroup,
}) {
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
            {
              (currMemberIds.includes(userId)) ? <Button variant="contained" color="warning" onClick={handleLeaveGroup}>Leave Group</Button>
                : ((currCapacity < maxCapacity) && <Button variant="contained" color="secondary" onClick={handleJoinGroup}>Join Group</Button>)
            }
          </Stack>
        </Toolbar>
      </AppBar>
      <PostDetail
        ownerId={ownerId}
        location={location}
        departDate={departDate}
        modeTransport={modeTransport}
        departPlace={departPlace}
        maxCapacity={maxCapacity}
        currCapacity={currCapacity}
        currMemberIds={currMemberIds}
      />

    </div>

  );
}
