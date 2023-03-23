/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table, TableCell, TableBody, TableContainer, TableHead, TableRow, Paper, Container,
} from '@mui/material';
import { createTheme } from "@mui/material/styles";
import MyPost from '../components/MyPost';
import OtherPost from '../components/OtherPost';
import { getGroupById, changeGroupMember } from '../api/groups';
import { getGroupHistory } from '../api/historydata';

/*
function createData(number, location, time, transportation, depart) {
  return {
    number, location, time, transportation, depart,
  };
}*/
  export default function History({id}) {
    // const [location, setLocation] = useState('');
    // const [departDate, setDepartDate] = useState('');
    // const [modeTransport, setModeTransport] = useState('');
    // const [departPlace, setDepartPlace] = useState('');
    const [allHistory, setallHistory] = useState([]);

    useEffect(() => {
        // wrapper function
        async function getHistoryByIdWrapper() {
          const response = await getGroupHistory(id.current);
          setallHistory(response)
          console.log('response', response);
          /*setLocation(response.location);
          setDepartDate(response.departDate);
          setModeTransport(response.modeTransport);
          setDepartPlace(response.departPlace);*/
        }
        // run the wrapper function
        getHistoryByIdWrapper();
      }, []);
    
        return (
            <TableContainer component={Paper} theme={createTheme}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Destination</TableCell>
                  <TableCell align="right">Depart Time</TableCell>
                  <TableCell align="right">Transportation Mode</TableCell>
                  <TableCell align="right">Depart Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { allHistory.map((row) => (
                  <TableRow key={row.number}>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.departDate}</TableCell>
                    <TableCell align="right">{row.modeTransport}</TableCell>
                    <TableCell align="right">{row.departPlace}</TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>    
        );
  };

/*


const rows = [
  createData(1, "JFK", "5:15", "uber", "Penn"),
  createData(2, "LGA", "5:50", "uber", "Harnwell"),
  createData(3, "PIA", "15:15", "lyft", "Radian"),
  createData(4, "Fishtown", "16:20", "uber", "Bookstore"),
  createData(5, "JFK", "9:10", "private car", "Hill"),
];

export default function History() {
  return (
  <TableContainer component={Paper} theme={createTheme}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Trip</TableCell>
          <TableCell align="right">Destination</TableCell>
          <TableCell align="right">Depart Time</TableCell>
          <TableCell align="right">Transportation Mode</TableCell>
          <TableCell align="right">Depart Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.number}>
            <TableCell component="th" scope="row">
              {row.number}
            </TableCell>
            <TableCell align="right">{row.location}</TableCell>
            <TableCell align="right">{row.time}</TableCell>
            <TableCell align="right">{row.transportation}</TableCell>
            <TableCell align="right">{row.depart}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );  
}*/
