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
import MyText from "./MyText";
import { getUserById } from '../api/users';

// import SendMessage from './chat/SendMessage';
// import { getAllChats } from '../api/chat';

export default function ChatDisplay({ userId, chatId }) {
// for backend mocking
  // try hardcoding chatId for now bc we only have one chat
  // const { chatId } = useParams();
  const [text, setText] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [currentMembersIds, setCurrentMembersIds] = useState([]);
  const [currMembersName, setCurrMembersName] = useState([]);
  const [filteredCr, setFiltered] = useState([]);
  const [render, setRender] = useState(false);
  // let memName be an array of array
  // memName[i] has i-th chat's name of everyone

  const message = useRef('');
  const listNum = useRef(1);
  const currChatId = chatId.current;

  // const fullName = name.concat(lastName);

  // const [currChatId, setCurrChatId] = React.useState(1);

  // next time, I have to enter id as a prop, depending on where user clicks
  useEffect(() => {
    async function getAllTextsWrapper() {
      const r2 = await getChatroomById(currChatId);
      setText(r2.texts);
      setCurrentMembersIds(r2.currentMembersIds);
      setCurrMembersName(r2.currentMembersIds);
    }
    getAllTextsWrapper();
  });

  // display texts accordingly
  // input change event handler
  const handleInputText = (e) => {
    message.current = e.target.value; // update the reference
  };

  const modifyTextOnServer = async (textData, membersData) => {
    // console.log('text input', message);
    const response = await modifyText(currChatId, textData, membersData);
  };

  const handleSendText = (e) => {
    // update the login state
    // setRender(!render);
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

  return (
    <Grid item xs={9}>
      <List style={{ color: 'white', backgroundColor: '#F0F0F0', height: '680px' }}>
        <MyText data-testid="textData" text={text} currMembersId={currentMembersIds} userId={userId} />
      </List>
      <Divider />
      <Grid container style={{ color: 'white', backgroundColor: '#D9D9D9', padding: '20px' }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Enter a message..." fullWidth onChange={handleInputText} />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add"><SendIcon data-testid="send" onClick={handleSendText} /></Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}
