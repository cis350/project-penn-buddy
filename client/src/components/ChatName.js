import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Paper, Grid, Box, Divider, TextField, Typography,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Fab,
  createTheme, Stack, Button, ThemeProvider,
  AppBar, Toolbar,
} from '@mui/material';

import {
  getChatroomById, modifyText, getAllChatroom, deleteChatroom,
} from '../api/chat';
import MyText from "./MyText";
import { getUserById } from '../api/users';

export default function ChatName({ chatrooms }) {
  async function idToNames(memIds) {
    const names = '';
    memIds.forEach(async (id) => {
      const user = await getUserById(id);
      console.log('user', user);
      const username = user.name;
      console.log('username', username);
      // names = names + username + ',';
    });
    return names;
  }

  return (
    {
    // chatrooms.map((c, index) => (
    //     <ListItem
    //       button
    //       id={c.id}
    //       onClick={() => handleChangeChat({ c })}
    //     >
    //       {idToNames(c.currentMembersIds)}
    //     </ListItem>
    // ))}
    }
  );
}
