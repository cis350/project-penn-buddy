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

export default function MyText({ text }) {
  // loop text.map, create the rows
  // create a list of elements
  // consider using the student table

  // const makeTexts = () => {
  //   const textArray = [];
  //   console.log('make text', text);
  //   text.forEach((element) => {
  //     textArray.push(element.content);
  //   });
  //   console.log('text array', textArray);
  //   return textArray;
  // };

  // const texts = makeTexts();
  return (
    <div>
      {
      text.map((t, index) => (
        <ListItem key={index}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary={t.content} style={{ color: '#0096FF' }} />
            </Grid>
          </Grid>
        </ListItem>
      ))
    }
    </div>
  );
}
