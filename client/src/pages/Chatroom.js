import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// import { makeStyles } from '@mui/styles';
import {
  Paper, Grid, Box, Divider, TextField, Typography,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Fab,
  createTheme, Stack, Button, ThemeProvider,
  AppBar, Toolbar,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

import { getChatroomById, modifyText, getAllChatroom } from '../api/chat';
import MyText from '../components/MyText';
import { getUserById } from '../api/users';

// import SendMessage from './chat/SendMessage';
// import { getAllChats } from '../api/chat';

export default function Chatroom({ userId, name, lastName }) {
// for backend mocking
  // try hardcoding chatId for now bc we only have one chat
  // const { chatId } = useParams();
  const [text, setText] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentMembersIds, setCurrentMembersIds] = useState([]);
  const [currMembersName, setCurrMembersName] = useState([]);

  const message = useRef('');
  const listNum = useRef(1);
  const currChatId = useRef(1);
  const fullName = name.concat(lastName);

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks
  useEffect(() => {
    async function getAllChatroomWrapper() {
      const response = await getAllChatroom();
      setChatrooms(response);
      const r2 = await getChatroomById(currChatId.current);
      // console.log('second response', r2);
      setText(r2.texts);
      setCurrentMembersIds(r2.currentMembersIds);
      setCurrMembersName(r2.currentMembersIds);
      // //   return response;
      // console.log('text', text);
      // console.log('current members id', currentMembersIds);
      // console.log('all cr', response);
    }
    // async function convertIdToName() {
    //   console.log('curr mem id', currMembersName);
    //   currentMembersIds.forEach((id) => {
    //     const response = await getUserById(id);
    //     // console.log('members name ', user.user.name);
    //     console.log('user', user);
    //     currMembersName.push(user.name);
    //   });
    //   console.log('group members', currMembersName);
    // };
    getAllChatroomWrapper();
    // convertIdToName();
  });

  const handleChangeChat = (c) => {
    // console.log('chat id is ', c.c.id);
    currChatId.current = c.c.id;
  };

  // when i click on the button, I want to get its chatId
  // from there I fetch from the database all of the data

  // display texts accordingly
  // input change event handler
  const handleInputText = (e) => {
    message.current = e.target.value; // update the reference
    // console.log('value', e.target.value);
  };

  const modifyTextOnServer = async (textData, membersData) => {
    // console.log('text input', message);
    // console.log('mod text from ', currChatId);
    const response = await modifyText(currChatId, textData, membersData);
  };

  // I NEED TO GETCH id, and currentMembersIds array TOO
  // AND REPLACE THE WHOLE CHAT
  const handleSendText = (e) => {
    // update the login state
    // console.log('clicked');
    const modifiedTextData = [];
    text.forEach((element) => {
      modifiedTextData.push(element);
    });
    const modifiedData = {
      userId,
      content: message.current,
    };
    modifiedTextData.push(modifiedData);
    modifyTextOnServer(modifiedTextData, currentMembersIds);
  };

  const handleExitChatroom = (e) => {
    console.log('entered');
    console.log('chatrooms', chatrooms);
    const modifiedChatData = [];
    console.log('curr chat room', currChatId);
    chatrooms.forEach((element) => {
      console.log('chat id', element.id);
      if (element.id === currChatId) {
        console.log('entered if');
      }
      console.log('false');
      // console.log('add text', element);
      // modifiedTextData.push(element);
    });
    // // console.log('new message', message);
    // const modifiedData = {
    //   userId,
    //   content: message.current,
    // };
    // modifiedTextData.push(modifiedData);
    // // console.log('modifiedTextData', modifiedTextData);
    // modifyTextOnServer(modifiedTextData, currentMembersIds);
  };

  // convertIdToName();

  //   const classes = useStyles();
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        dark: '#969696',
      },
      secondary: {
        main: '#0096FF',
      },
      warning: {
        main: '#EA3C3C',
      },
      info: {
        main: '#0096FF',
      },
      button: {
        textTransform: 'none',
      },
    },
    typography: {
      fontFamily: 'DM Sans',
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      },
      h5: {
        fontWeight: 600,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
            <Button variant="text" color="secondary" sx={{ flex: 1 }}>Back to Activity Feed</Button>
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
              <Button variant="contained" color="secondary" style={{ left: '100%' }} onClick={handleExitChatroom}>x</Button>
            </Stack>
          </Grid>
        </Grid>
        {/* <Grid container component={Paper} className={classes.chatSection}> */}
        <Grid
          container
          component={Paper}
          style={{
            color: 'white', backgroundColor: '#0096FF', padding: '5px', height: '780px',
          }}
        >
          <Grid item xs={3}>
            {/* FOR PROFILE OF USER */}
            {/* <Grid item xs={3} className={classes.borderRight500}> */}
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              <ListItem button key="user name">
                <ListItemIcon>
                  <Avatar alt={fullName} src="chat/profileimg/grace.JPG" />
                </ListItemIcon>
                <ListItemText primary={fullName} />
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="outlined-basic-email" label="Search" variant="outlined" style={{ color: 'white', backgroundColor: '#D9D9D9', borderRadius: '5px' }} fullWidth />
            </Grid>
            <Divider />
            {/* FOR CREATING THE CHAT LIST */}
            {/* create a for loop to create the list */}
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              {
              chatrooms.map((c, index) => (
                <ListItem
                  button
                  onClick={() => handleChangeChat({ c })}
                >
                  {c.id}
                </ListItem>
              ))
            }
              {/* <ListItemText>
                {
              currMembersName.map((n, index) => {
                `${n},`;
              })
            }
              </ListItemText> */}
            </List>

            {/* create a function that can fetch names of users
            in the chat */}
            {/* instead of manually saying grace, have it pop up name of userId */}

            {/* <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              <ListItem
                button
                id="1"
                style={{ color: 'white', backgroundColor: '#F0F0F0' }}
                onClick={handleChangeChat(id)}
              >
                <ListItemIcon>
                  <Avatar alt="Nicky Wong" src="/images/nick.jpeg" />
                </ListItemIcon>
                <ListItemText primary="Nicky Wong" style={{ color: 'black' }}>
                Nicky Wong</ListItemText>
                <ListItemText secondary="online" align="right" />
              </ListItem>
              <ListItem button id="2">
                <ListItemIcon>
                  <Avatar alt="Iain Li" src="chat/profileimg/iain.png" />
                </ListItemIcon>
                <ListItemText primary="Iain Li">Iain Li</ListItemText>
              </ListItem>
              <ListItem button od="3">
                <ListItemIcon>
                  <Avatar alt="Linda Shen" src="chat/profileimg/linda.jpeg" />
                </ListItemIcon>
                <ListItemText primary="Linda Shen">Linda Shen</ListItemText>
              </ListItem>
            </List>
          */}
          </Grid>
          <Grid item xs={9}>
            <List style={{ color: 'white', backgroundColor: '#F0F0F0', height: '680px' }}>
              <MyText text={text} />
            </List>
            <Divider />
            <Grid container style={{ color: 'white', backgroundColor: '#D9D9D9', padding: '20px' }}>
              <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Enter a message..." fullWidth onChange={handleInputText} />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add"><SendIcon onClick={handleSendText} /></Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
