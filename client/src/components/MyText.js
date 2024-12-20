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
import { getUserById } from '../api/users';

// function textRow(props) {
//   return (
//     <ListItem key="1">
//       <Grid container>
//         <Grid item xs={12}>
//           <ListItemText align="right" primary={props.texts.content}
// style={{ color: '#0096FF' }} />
//         </Grid>
//       </Grid>
//     </ListItem>
//   );
// }

// const rightText = (content, index) => (
//   <ListItem key={index}>
//     <Grid container>
//       <Grid item xs={12}>
//         <ListItemText align="right" primary={content} style={{ color: '#0096FF' }} />
//       </Grid>
//     </Grid>
//   </ListItem>
// );

// const leftText = (content, index) => (
//   <ListItem key={index}>
//     <Grid container>
//       <Grid item xs={12}>
//         <ListItemText align="left" primary={content} style={{ color: '#0096FF' }} />
//       </Grid>
//     </Grid>
//   </ListItem>
// );

// const genText = (t, index, currUserId) => {
//   if (t.userId === currUserId) {
//     console.log('is user');
//     rightText(t.content, index);
//   } else {
//     console.log('is not user');
//     leftText(t.content, index);
//   }
// };

export default function MyText({
  text, currMembersId, userId, name,
}) {
  // console.log('text mytext', text);
  // console.log('currmembersid mytext', currMembersId);
// maybe i should add another field to text to be name
  // const name = r.name;
  return (
    <div>
      {
      text
        .map((t, index) => (
          // <div>
          //   {genText(t, index, userId)}
          // </div>
          // to create the separate components depending on t.userId == currentUserId
          // myText vs OtherText
          <ListItem key={index}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText data-testid="text-content" align="right" style={{ color: 'black' }} primary={t.name} />
                <ListItemText data-testid="sender" align="right" primary={t.content} style={{ color: '#0096FF' }} />
              </Grid>
            </Grid>
          </ListItem>
        ))
    }
    </div>
  );
}
