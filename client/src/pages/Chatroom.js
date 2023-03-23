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

import { getChatroomById, modifyText } from '../api/chat';
import MyText from '../components/MyText';

// import SendMessage from './chat/SendMessage';
// import { getAllChats } from '../api/chat';

export default function Chatroom() {
// for backend mocking
  // try hardcoding chatId for now bc we only have one chat
  // const { chatId } = useParams();
  const senderId = 1;
  const [text, setText] = useState([]);
  const [currentMembersIds, setCurrentMembersIds] = useState([]);
  const message = useRef('');
  const listNum = useRef(1);
  // next time, I have to enter id as a prop, depending on where user clicks
  useEffect(() => {
    async function getChatroomByIdWrapper() {
      const response = await getChatroomById(1);
      // console.log('Chat by id', response);
      setText(response.texts);
      setCurrentMembersIds(response.currentMembersIds);
      return response;
    }
    getChatroomByIdWrapper();
  });

  // console.log('currentext', text);
  // console.log('text length', text.length);
  // console.log('currentmems', currentMembersIds);

  // input change event handler
  const handleInputText = (e) => {
    message.current = e.target.value; // update the reference
    // console.log('value', e.target.value);
  };

  const modifyTextOnServer = async (textData, membersData) => {
    // console.log('text input', message);
    const response = await modifyText(1, textData, membersData);
  };

  // I NEED TO GETCH id, and currentMembersIds array TOO
  // AND REPLACE THE WHOLE CHAT
  const handleSendText = (e) => {
    // update the login state
    const modifiedTextData = [];
    text.forEach((element) => {
      modifiedTextData.push(element);
    });
    // console.log('new message', message);
    const modifiedData = {
      senderId,
      content: message.current,
    };
    modifiedTextData.push(modifiedData);
    // console.log('modifiedTextData', modifiedTextData);
    modifyTextOnServer(modifiedTextData, currentMembersIds);
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
          <Grid item xs={12}>
            <Typography variant="h5" className="header-message" style={{ color: 'white' }}>
              All Messages
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container component={Paper} className={classes.chatSection}> */}
        <Grid
          container
          component={Paper}
          style={{
            color: 'white',
            backgroundColor: '#0096FF',
            padding: '5px',
            height: '780px',
          }}
        >
          <Grid item xs={3}>
            {/* FOR PROFILE OF USER */}
            {/* <Grid item xs={3} className={classes.borderRight500}> */}
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              <ListItem button key="GraceThang">
                <ListItemIcon>
                  <Avatar alt="Grace Thang" src="chat/profileimg/grace.JPG" />
                </ListItemIcon>
                <ListItemText primary="Grace Thang" />
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="outlined-basic-email" label="Search" variant="outlined" style={{ color: 'white', backgroundColor: '#D9D9D9', borderRadius: '5px' }} fullWidth />
            </Grid>
            <Divider />
            {/* FOR CREATING THE CHAT LIST */}
            <List style={{ color: 'white', backgroundColor: '#0096FF' }}>
              <ListItem button key="NickyWong" style={{ color: 'white', backgroundColor: '#F0F0F0' }}>
                <ListItemIcon>
                  <Avatar alt="Nicky Wong" src="/images/nick.jpeg" />
                </ListItemIcon>
                <ListItemText primary="Nicky Wong" style={{ color: 'black' }}>Nicky Wong</ListItemText>
                <ListItemText secondary="online" align="right" />
              </ListItem>
              <ListItem button key="Iain Li">
                <ListItemIcon>
                  <Avatar alt="Iain Li" src="chat/profileimg/iain.png" />
                </ListItemIcon>
                <ListItemText primary="Iain Li">Iain Li</ListItemText>
              </ListItem>
              <ListItem button key="LindaShen">
                <ListItemIcon>
                  <Avatar alt="Linda Shen" src="chat/profileimg/linda.jpeg" />
                </ListItemIcon>
                <ListItemText primary="Linda Shen">Linda Shen</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            {/* <List className={classes.messageArea}> */}
            <List style={{ color: 'white', backgroundColor: '#F0F0F0', height: '680px' }}>
              {/* TEXT LIST OF TEXTS -> how do I make it retrievable instead? */}
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
