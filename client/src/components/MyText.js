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

function textRow(props){
  return(
    <ListItem key="1">
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align="right" primary={props.texts.content} style={{ color: '#0096FF' }} />
        </Grid>
      </Grid>
    </ListItem>
  )
};

export default function MyText({ text }) {
  // loop text.map, create the rows
  // create a list of elements
  // consider using the student table

  const makeTexts = () => {
    const textArray = [];
    console.log('make text', text);
    text.forEach(element => {
      // textArray.push(<textRow props={element} />)
      // text.push(textRow(element.content));
      textArray.push(element.content);
    });
    console.log('text array', textArray);
    return textArray;
  };

  const texts = makeTexts();
  console.log('line 46', texts);
  console.log('norm text', text);
  return (
    <div>
    {
      text.map((t, index) => {
        return (
        <ListItem key={ index }>
        <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary={t.content} style={{ color: '#0096FF' }} />
            </Grid>
          </Grid>
       </ListItem>
        )
      })
    }
    </div>

    //       <ListItem key="1">
    //    <Grid container>
    //        <Grid item xs={12}>
    //          <ListItemText align="right" primary={texts} style={{ color: '#0096FF' }} />
    //        </Grid>
    //        <Grid item xs={12}>
    //          <ListItemText align="right" secondary="09:30" />
    //        </Grid>
    //      </Grid>
    //    </ListItem>
    //   {/* { texts } */}
    // </div>
    
    );
  // return (
  //   <div>
  //     <ListItem key="1">
  //       <Grid container>
  //         <Grid item xs={12}>
  //           <ListItemText align="right" primary="Hi Nicky! This is Grace and I am also traveling to Newark today. Would you like to join my group with another person?" style={{ color: '#0096FF' }} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <ListItemText align="right" secondary="09:30" />
  //         </Grid>
  //       </Grid>
  //     </ListItem>
  //     <ListItem key="2">
  //       <Grid container>
  //         <Grid item xs={12}>
  //           <ListItemText align="left" primary="Sure! That sounds great, thanks" style={{ color: 'black' }} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <ListItemText align="left" secondary="09:31" />
  //         </Grid>
  //       </Grid>
  //     </ListItem>
  //     <ListItem key="2_5">
  //       <Grid container>
  //         <Grid item xs={12}>
  //           <ListItemText align="left" primary="When are we leaving?" style={{ color: 'black' }} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <ListItemText align="left" secondary="09:31" />
  //         </Grid>
  //       </Grid>
  //     </ListItem>
  //     <ListItem key="3">
  //       <Grid container>
  //         <Grid item xs={12}>
  //           <ListItemText align="right" primary="Cool. I am good, let's catch up!" style={{ color: '#0096FF' }} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <ListItemText align="right" secondary="10:30" />
  //         </Grid>
  //       </Grid>
  //     </ListItem>
  //   </div>
}
