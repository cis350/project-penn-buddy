import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import { makeStyles } from '@mui/styles';
import {
  Paper, Grid, Box, Divider, TextField, Typography,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Fab,
  createTheme, Stack, Button, ThemeProvider,
  AppBar, Toolbar,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import {
  getChatroomById, modifyText, getAllChatroom, deleteChatroom,
} from '../api/chat';
import MyText from '../components/MyText';
import { getUserById } from '../api/users';
import ChatDisplay from '../components/ChatDisplay';

// import SendMessage from './chat/SendMessage';
// import { getAllChats } from '../api/chat';

export default function Chatroom({ userId, name }) {
// for backend mocking
  // try hardcoding chatId for now bc we only have one chat
  // const { chatId } = useParams();
  const [text, setText] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentMembersIds, setCurrentMembersIds] = useState([]);
  // const [currMembersName, setCurrMembersName] = useState([]);
  const [filteredCr, setFiltered] = useState([]);
  // let memName be an array of array
  // memName[i] has i-th chat's name of everyone

  const message = useRef('');
  const listNum = useRef(1);
  const currChatId = useRef(1);
  // const fullName = name.concat(lastName);

  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate('/activityfeed');
  };

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks
  useEffect(() => {
    async function getAllChatroomWrapper() {
      const response = await getAllChatroom();
      setChatrooms(response);
      setFiltered(chatrooms.filter(
        (chat) => chat.currentMembersIds.includes(userId),
      ));
      const r2 = await getChatroomById(currChatId.current);
      setCurrentMembersIds(r2.currentMembersIds);
      // setCurrMembersName(r2.currentMembersIds);
    }
    getAllChatroomWrapper();
    // convertIdToName();
  }, [chatrooms.length]);

  // const idToNameFunction = (c) => {
  //   currentMembersIds.forEach((id) => {
  //     const r3 = getUserById(id);
  //     // console.log('members name ', user.user.name);
  //     console.log('user', user);
  //     currMembersName.push(user.name);
  //   });
  //   console.log('group members', currMembersName);
  // }
  const handleChangeChat = (c) => {
    currChatId.current = c.c.id;
  };

  const handleExitChatroom = (e) => {
    const modifiedChatData = [];
    chatrooms.forEach((element) => {
      if (currChatId.current === element.id) {
        deleteChatroom(currChatId.current);
        setChatrooms(chatrooms.filter(
          (chat) => (chat.id !== currChatId.current),
        ));
        // might have to fix this later
        currChatId.current = 1;
      }
    });
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
              <Button variant="contained" color="secondary" style={{ left: '90%' }} onClick={handleExitChatroom}>Leave chatroom</Button>
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
              filteredCr.map((c, index) => (
                <ListItem
                  button
                  data-testid="chatNames"
                  id={c.id}
                  onClick={() => handleChangeChat({ c })}
                >
                  {c.id}
                </ListItem>
              ))
            }
            </List>
          </Grid>
          <ChatDisplay chatId={currChatId} userId={userId} />
        </Grid>
      </div>
    </div>
  );
}
