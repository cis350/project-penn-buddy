/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import MyPost from './MyPost';
import OtherPost from './OtherPost';
import { getGroupById } from '../api/groups';

export default function Post({ name, userId }) {
  const { groupId } = useParams();
  const [ownerId, setOwnerId] = useState(0);
  const [location, setLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [modeTransport, setModeTransport] = useState('');
  const [departPlace, setDepartPlace] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currCapacity, setCurrCapacity] = useState(0);
  const [currMemberIds, setCurrMemberIds] = useState([]);

  useEffect(() => {
    // wrapper function
    async function getGroupByIdWrapper() {
      const response = await getGroupById(groupId);
      setOwnerId(response.id);
      setLocation(response.location);
      setDepartDate(response.departDate);
      setModeTransport(response.modeTransport);
      setDepartPlace(response.departPlace);
      setMaxCapacity(response.maxCapacity);
      setCurrCapacity(response.currCapacity);
      setCurrMemberIds(response.currMemberIds);
    }
    // run the wrapper function
    getGroupByIdWrapper();
  });

  if (userId === ownerId) {
    return (
      <MyPost
        ownerId={ownerId}
        location={location}
        departDate={departDate}
        modeTransport={modeTransport}
        departPlace={departPlace}
        maxCapacity={maxCapacity}
        currCapacity={currCapacity}
        currMemberIds={currMemberIds}
      />
    );
  }
  return (
    <div>
      <OtherPost
        ownerId={ownerId}
        location={location}
        departDate={departDate}
        modeTransport={modeTransport}
        departPlace={departPlace}
        maxCapacity={maxCapacity}
        currCapacity={currCapacity}
        currMemberIds={currMemberIds}
      />
    </div>

  );
}
