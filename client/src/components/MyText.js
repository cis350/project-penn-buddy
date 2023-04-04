/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
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
import { getChatroomById } from '../api/chat';

function textRow(props) {
  return (
    <ListItem key="1">
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align="right" primary={props.texts.content} style={{ color: '#0096FF' }} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

const rightText = (content, index) => (
  <ListItem key={index}>
    <Grid container>
      <Grid item xs={12}>
        <ListItemText align="right" primary={content} style={{ color: '#0096FF' }} />
      </Grid>
    </Grid>
  </ListItem>
);

const leftText = (content, index) => (
  <ListItem key={index}>
    <Grid container>
      <Grid item xs={12}>
        <ListItemText align="left" primary={content} style={{ color: '#0096FF' }} />
      </Grid>
    </Grid>
  </ListItem>
);

const genText = (t, index, currUserId) => {
  if (t.userId === currUserId) {
    console.log('is user');
    rightText(t.content, index);
  } else {
    console.log('is not user');
    leftText(t.content, index);
  }
};

export default function MyText({ text, currMembersId, userId }) {
  return (
    <div>
      {
      text
        // .filter((t, index) => {
        //   if (t.userId === userId) {
        //     // .map((t, index) => (
        //     <ListItem key={index}>
        //       <Grid container>
        //         <Grid item xs={12}>
        //           <ListItemText align="right" primary={t.content} style={{ color: '#0096FF' }} />
        //         </Grid>
        //       </Grid>
        //     </ListItem>;
        //     // ))
        //   } else {
        //     // .map((t, index) => (
        //     <ListItem key={index}>
        //       <Grid container>
        //         <Grid item xs={12}>
        //           <ListItemText align="left" primary={t.content} style={{ color: '#0096FF' }} />
        //         </Grid>
        //       </Grid>
        //     </ListItem>;
        //     // ))
        //   }
        // })
        .map((t, index) => (
          // <div>
          //   {genText(t, index, userId)}
          // </div>
          // to create the separate components depending on t.userId == currentUserId
          // myText vs OtherText
          <ListItem key={index}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText align="right" style={{ color: 'black' }} primary={t.userId} />
                <ListItemText align="right" primary={t.content} style={{ color: '#0096FF' }} />
              </Grid>
            </Grid>
          </ListItem>
        ))
    }
    </div>
  );
}
