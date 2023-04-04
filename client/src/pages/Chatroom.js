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
import ChatName from '../components/ChatName';

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
  // let memName be an array of array
  // memName[i] has i-th chat's name of everyone

  const message = useRef('');
  const listNum = useRef(1);
  const currChatId = useRef(1);
  const fullName = name.concat(lastName);

  const navigate = useNavigate();
  function handleClickBack() {
    navigate('/activityfeed');
  }

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks
  useEffect(() => {
    async function getAllChatroomWrapper() {
      const response = await getAllChatroom();
      setChatrooms(response);
      console.log('total chatrooms', chatrooms);
      // chatrooms.filter((cr) => cr.currMemberIds.includes(userId));
      // console.log('filtered chatrooms', chatrooms);
      const r2 = await getChatroomById(currChatId.current);
      setText(r2.texts);
      setCurrentMembersIds(r2.currentMembersIds);
      setCurrMembersName(r2.currentMembersIds);
      console.log('curr mem id', currMembersName);
    }
    getAllChatroomWrapper();
    // convertIdToName();
  });

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
    // console.log('chat id is ', c.c.id);
    currChatId.current = c.c.id;
    // console.log('click handle change chat');
    // document.getElementById(toString(currChatId.current)).
    // style.cssText = 'background-color:#b2b2ff; color:#000000; 
    // border:1px solid #0c0800; font-size:22px;';
  };

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
    const modifiedChatData = [];
    chatrooms.forEach((element) => {
      if (currChatId.current === element.id) {
        deleteChatroom(currChatId.current);
        // might have to fix this later
        currChatId.current = 1;
      }
    });
  };

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
        {/* <Grid container component={Paper} className={classes.chatSection}> */}
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
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              {
              chatrooms.map((c, index) => (
                <ListItem
                  button
                  id={c.id}
                  onClick={() => handleChangeChat({ c })}
                >
                  {c.id}
                </ListItem>
              ))
            }
            </List>
          </Grid>
          <Grid item xs={9}>
            <List style={{ color: 'white', backgroundColor: '#F0F0F0', height: '680px' }}>
              <MyText text={text} currMembersId={currentMembersIds} userId={userId} />
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
