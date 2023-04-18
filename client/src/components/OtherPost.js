/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostDetail from './PostDetail';
import {
  changeChatroom, createNewChatroom, getChatroomById, modifyChatMember,
} from '../api/chat';
import { getGroupById } from '../api/groups';

export default function OtherPost({
  ownerId, location, departDate, modeTransport,
  departPlace, maxCapacity, currCapacity, currMemberIds,
  groupId, userId, group, handleLeaveGroup, handleJoinGroup,
}) {
  const navigate = useNavigate();
  const handleChatroom = async (e) => {
    const newTextData = [];
    const r1 = await getGroupById(groupId);
    const memberIds = r1.currMemberIds;
    console.log('this is group id', groupId);
    const existChat = await getChatroomById(groupId.toString());
    if (existChat == null) {
      console.log('null');
      const response = await createNewChatroom(groupId, memberIds);
    // }
    } else {
      console.log('chat form', existChat);
      const t = existChat.texts;
      const membersId = existChat.currentMembersIds;
      membersId.push(userId);
      changeChatroom(groupId, t, membersId);
    }
    navigate('/chatroom');
  };
  function handleClickBack() {
    navigate('/activityfeed');
  }
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
            <Button variant="text" color="secondary" sx={{ flex: 1 }} onClick={handleClickBack}>Back to Activity Feed</Button>
          </Box>
          <Stack direction="row" spacing={3}>
            {
              (currMemberIds.includes(userId)) ? (
                <Stack direction="row" spacing={3}>
                  <Button variant="contained" color="warning" onClick={handleLeaveGroup}>Leave Group</Button>
                  <Button variant="contained" color="secondary" onClick={handleChatroom}>Go to Chatroom</Button>
                </Stack>
              )
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
