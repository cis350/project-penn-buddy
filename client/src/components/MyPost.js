// /* eslint-disable react/jsx-no-bind */
// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable import/no-named-as-default */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, 
  IconButton, Rating, List, ListItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostDetail from './PostDetail';
import { createNewChatroom, getChatroomById } from '../api/chat';
import { getGroupById } from '../api/groups';

export default function MyPost({
  ownerId, location, departDate, modeTransport,
  departPlace, maxCapacity, currCapacity, currMemberIds, groupId, userId, group,
  handleDeleteGroup,
}) {
  const navigate = useNavigate();
  function handleClickBack() {
    navigate('/activityfeed');
  }

  function handleEditGroup() {
    navigate(`/editpost/${groupId}`);
  }

  const handleChatroom = async (e) => {
    const newTextData = [];
    // create currMembersId
    const r1 = await getGroupById(groupId);
    const memberIds = r1.currMemberIds;
    // check if the chatroom with said groupId already exists or not
    const existChat = await getChatroomById(groupId);
    if (typeof existChat === 'undefined') {
      const response = await createNewChatroom(groupId, memberIds);
    }
    navigate('/chatroom');
  };

  return (
    <div>
      <Stack direction="column">
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
              <Button variant="text" color="secondary" sx={{ flex: 1 }} onClick={handleClickBack}>Back to Activity Feed</Button>
            </Box>
            <Stack direction="row" spacing={3}>
              <Button variant="contained" color="warning" onClick={handleDeleteGroup}>Delete Group</Button>
              <Button variant="contained" color="secondary" onClick={handleEditGroup}>Edit Group</Button>
              <Button variant="contained" color="secondary" onClick={handleChatroom}>Go to Chatroom</Button>
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
      </Stack>
    </div>

  );
}
