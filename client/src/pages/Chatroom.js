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
  const [ownerId, setOwnerId] = useState(0);
  const [location, setLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [modeTransport, setModeTransport] = useState('');
  const [departPlace, setDepartPlace] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currCapacity, setCurrCapacity] = useState(0);
  const [currMemberIds, setCurrMemberIds] = useState([]);
  const [group, setGroup] = useState([]);
  const [membership, setMembership] = useState(currMemberIds.includes(userId));

  const currChatId = useRef(0);
  // const fullName = name.concat(lastName);

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate('/activityfeed');
  };

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks

  // use timeOut
  // call the backend after a set amount of time (100 or 1000 millisecond)

  useEffect(() => {
    // use setINterval to call it every x seconds
    // refresh your UI component -> useEffect
    // need a callback, the value change

    // const interval = setInterval(() => {
    //   console.log('This will run every second!');
    //   getAllChatroomWrapper();
    // }, 1000);
    // return () => clearInterval(interval);
    // console.log('entered useEffect');

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
    getAllChatroomWrapper();

    // async function getGroupByIdWrapper() {
    //   console.log('UserId in Post', userId);
    //   console.log('GroupId in Post', groupId);
    //   const response = await getGroupById(groupId);
    //   // console.log('response', response);
    //   setGroup(response);
    //   setOwnerId(response.ownerId);
    //   setLocation(response.location);
    //   setDepartDate(response.departDate);
    //   setModeTransport(response.modeTransport);
    //   setDepartPlace(response.departPlace);
    //   setMaxCapacity(response.maxCapacity);
    //   setCurrCapacity(response.currCapacity);
    //   setCurrMemberIds(response.currMemberIds);
    // }
    // // run the wrapper function
    // getGroupByIdWrapper();
    // convertIdToName();
  }, [chatrooms.length]);
  const handleChangeChat = (c) => {
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

  const handleExitChatroom = async (e) => {
    console.log('cr currId', currChatId.current);
    const r2 = await getChatroomById(currChatId.current);
    setCurrentMembersIds(r2.currentMembersIds);
    setText(r2.texts);
    setChatname(r2.chatName);
    // console.log("clicked");
    const modifiedChatData = [];
    chatrooms.forEach((element) => {
      // console.log("currChatId", currChatId.current);
      // console.log("element id", element._id);
      if (currChatId.current === element._id) {
        // console.log('chatname chatroom.js', chatName);
        // console.log("entered if");
        // console.log("text in leavec", text);
        // console.log("members leavec", currentMembersIds);
        // console.log("chatname leavec", chatName);
        // console.log("userId leavec", userId);

        const memFiltered = currentMembersIds.filter((item) => item.toString() !== userId);
        // console.log("WHY ARENT U WORKING", memFiltered);
        setCurrentMembersIds(memFiltered);

        //   // console.log('modifiedData', modifiedData);
        //   changeChatroom(modifiedData);
        // console.log("chats leavec", chatrooms);
        // const modifiedData = {
        //   text,
        //   currentMembersIds,
        //   chatName,
        // };
        changeChatroom(currChatId.current, chatName, text, memFiltered, groupId);
        setChatrooms(chatrooms.filter(
          (chat) => (chat.id !== currChatId.current),
        ));
        // console.log("chats leavec filtered", chatrooms);
        // console.log("members leavec filtered", currentMembersIds);
        // might have to fix this later
        currChatId.current = 0;
      }
    });
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
      // returns correct thing but the values i mod data IS NOT RIgzht
      // console.log('response', response);
      setGroup(response);
      setOwnerId(response.ownerId);
      // console.log(ownerId);
      setLocation(response.location);
      setDepartDate(response.departDate);
      setModeTransport(response.modeTransport);
      setDepartPlace(response.departPlace);
      setMaxCapacity(response.maxCapacity);
      setCurrCapacity(response.currCapacity);
      setCurrMemberIds(response.currMemberIds);
      // console.log('current members cr', response.currMemberIds);
      // console.log('current cap cr', response.currCapacity);

      setMembership(false);
      // console.log('membership', membership);
      // console.log('group', group);
      // MODIFIED IT CORRECTLY NOW
      // DO I NEED TO RELOAD?
      // OH, I HAVE TO EDIT CHATROOM ACCORDINGLY TOo
      const modifiedData = {
        id: groupId,
        ownerId: response.ownerId,
        location: response.location,
        departDate: response.departDate,
        modeTransport: response.modeTransport,
        departPlace: response.departPlace,
        maxCapacity: response.maxCapacity,
        currCapacity: response.currCapacity - 1,
        currMemberIds: response.currMemberIds.filter((item) => item !== userId),
      };
      // CHANGES MADE TO GROUP
      setCurrMemberIds(currMemberIds.filter((item) => item !== userId));
      setCurrCapacity(currCapacity - 1);
      // console.log('new total cr', chatrooms);
      // console.log("called");
      // console.log('modifiedData', modifiedData);
      modifyGroupOnServer(modifiedData);

      // NOW WE HAVE TO MAKE CHANGES TO CHATROOMS
      const modifiedChatData = {
        id: currChatId.current,
        chatName,
        texts: text,
        currentMembersIds: currMemberIds,
        groupId,
      };
      // console.log('modified chat data', modifiedData);

      // currMemberIds is the filtered one from groups
      const r2 = await changeChatroom(currChatId.current, chatName, text, currMemberIds, groupId);

      // setChatrooms(chatrooms.filter(
      //   (chat) => (chat.id !== currChatId.current),
      // ));
      // OKAY IT WORKS NOW BUT WE HAVE TO REFRESH -> TRY SET INTERVAL
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
                  {/* ASK PROF HOW TO CHANGE NAME OF CHAT */}
                  {c.chatName}
                  {/* {c._id} */}
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
