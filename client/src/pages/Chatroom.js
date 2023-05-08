/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import { makeStyles } from '@mui/styles';
import {
  Paper, Grid, Box, Divider, TextField, Typography,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Fab,
  createTheme, Stack, Button, ThemeProvider,
  AppBar, Toolbar, unstable_composeClasses,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import {
  getChatroomById, getAllChatrooms, deleteChatroom, changeChatroom,
} from '../api/chat';
import { getGroupById, changeGroup, deleteGroupById } from '../api/groups';
import MyText from '../components/MyText';
import { getUserById } from '../api/users';
import ChatDisplay from '../components/ChatDisplay';

// import SendMessage from './chat/SendMessage';
// import { getAllChats } from '../api/chat';

export default function Chatroom({ userId, name }) {
// for backend mocking
  // try hardcoding chatId for now bc we only have one chat
  // CHATROOM PARAMS
  const [text, setText] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentMembersIds, setCurrentMembersIds] = useState([]);
  const [chatName, setChatname] = useState('');
  const [filteredCr, setFiltered] = useState([]);

  // GROUP PARAMS
  const { groupId } = useParams();

  const currChatId = useRef(0);
  const firstUpdate = useRef(true);
  // const fullName = name.concat(lastName);

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate('/activityfeed');
  };

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks

  // use timeOut
  // call the backend after a set amount of time (100 or 1000 millisecond)

  async function getAllChatroomWrapper() {
    // console.log('entered async');
    const response = await getAllChatrooms();
    // console.log('all chatrooms', response);
    setChatrooms(response);
    // CHECK WHY IT's NOT FILTERING CORRECTLY
    setFiltered(chatrooms.filter(
      (chat) => chat.currentMembersIds.includes(userId),
    ));
    // console.log('userId', userId.toString());
    // console.log('chat user is in', filteredCr);
    // console.log('currChat id', currChatId.current);
    if (currChatId.current !== 0) {
      // console.log('nonzero');
      const r2 = await getChatroomById(currChatId.current);
      setCurrentMembersIds(r2.currentMembersIds);
      setText(r2.texts);
      setChatname(r2.chatName);
      // console.log('chatname chatroom.js', chatName);
    }
    // setCurrMembersName(r2.currentMembersIds);
  }

  useEffect(() => {
    // use setINterval to call it every x seconds
    // refresh your UI component -> useEffect
    // need a callback, the value change

    if (firstUpdate.current) {
      firstUpdate.current = false;
      getAllChatroomWrapper(false);
    }

    const intervalID = setInterval(() => {
      getAllChatroomWrapper(true);
    }, 1000);
    return () => clearInterval(intervalID);

    // getAllChatroomWrapper();
  });
  const handleChangeChat = (c) => {
    // console.log('hcc', c.c._id);
    // console.log('hcc', c.c._id);
    currChatId.current = c.c._id;
    setChatname(c.c.chatName);
    setText(c.c.texts);
    setCurrentMembersIds(c.c.currentMembersIds);
    // groupId = c.c.groupId;
    // CHECK
    // console.log('group id handlecc', c.c.groupId);
    // console.log('hcc chatid', currChatId);
    // console.log('chatname here', chatName);
    navigate(`/chatroom/${c.c.groupId}`);
  };

  const modifyGroupOnServer = async (data) => {
    // console.log('membership at modification', membership);
    const response = await changeGroup(groupId, data);
  };

  const handleLeaveGroup = async (e) => {
    // console.log('UserId in Post', userId);
    // console.log('GroupId in Post', groupId);

    if (groupId !== 0) {
      const response = await getGroupById(groupId);

      const newCap = response.currCapacity - 1;
      const newMems = response.currMemberIds.filter((item) => item !== userId);

      const modifiedData = {
        id: groupId,
        ownerId: response.ownerId,
        location: response.location,
        departDate: response.departDate,
        modeTransport: response.modeTransport,
        departPlace: response.departPlace,
        maxCapacity: response.maxCapacity,
        currCapacity: newCap,
        currMemberIds: newMems,
      };
      // CHANGES MADE TO GROUP
      // console.log('modifiedData', modifiedData);
      modifyGroupOnServer(modifiedData);

      // NOW WE HAVE TO MAKE CHANGES TO CHATROOMS
      const modifiedChatData = {
        id: currChatId.current,
        chatName,
        texts: text,
        currentMembersIds: newMems,
        groupId,
      };
      // console.log('modified chat data', modifiedData);

      // currMemberIds is the filtered one from groups
      // console.log('curr mem id after delete', newMems);
      const r2 = await changeChatroom(currChatId.current, chatName, text, newMems, groupId);
      // getAllChatroomWrapper();
      // console.log('modified chat data', modifiedChatData);
      currChatId.current = 0;
    }
  };

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Chat Room</h1>
      </div>
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
        </Toolbar>
      </AppBar>
      <div style={{ color: '#0096FF' }}>
        <Grid
          container
          style={{
            color: 'white',
            backgroundColor: '#0096FF',
            padding: '20px',
            height: '100%',
          }}
        >
          <Grid item xs={10}>
            <Stack direction="row" spacing={3}>
              <Typography variant="h5" className="header-message" style={{ color: 'white' }}>
                All Messages
              </Typography>
              <Button variant="contained" color="secondary" style={{ left: '90%' }} onClick={handleLeaveGroup}>Leave chatroom</Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          component={Paper}
          style={{
            color: 'white', backgroundColor: '#0096FF', padding: '5px', height: '780px',
          }}
        >
          <Grid item xs={3}>
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              <ListItem button key="user name">
                <ListItemIcon>
                  <Avatar alt={name} src="chat/profileimg/grace.JPG" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="outlined-basic-email" label="Search" variant="outlined" style={{ color: 'white', backgroundColor: '#D9D9D9', borderRadius: '5px' }} fullWidth />
            </Grid>
            <Divider />
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              {
                // NOTE: WILL HAVE TO CHANGE CHATROOMS TO FILTERED CHATROOM LATER
              filteredCr.map((c) => (
                <ListItem
                  button
                  data-testid="chatNames"
                  id={c._id}
                  onClick={() => handleChangeChat({ c })}
                >
                  {c.chatName}
                </ListItem>
              ))
            }
            </List>
          </Grid>
          <ChatDisplay chatId={currChatId} userId={userId} chatName={chatName} name={name} />
        </Grid>
      </div>
    </div>
  );
}
