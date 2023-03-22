import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button,
} from '@mui/material';
import ActivityFeedPost from '../components/ActivityFeedPost';
import { getAllGroups } from '../api/groups';

function ActivityFeed() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // wrapper function
    async function getAllGroupsWrapper() {
      const response = await getAllGroups();
      // console.log('response', response);
      setGroups(response);
      console.log('all groups', response);
      // setOwnerId(response.ownerId);
      // setLocation(response.location);
      // setDepartDate(response.departDate);
      // setModeTransport(response.modeTransport);
      // setDepartPlace(response.departPlace);
      // setMaxCapacity(response.maxCapacity);
      // setCurrCapacity(response.currCapacity);
      // setCurrMemberIds(response.currMemberIds);
    }
    // run the wrapper function
    getAllGroupsWrapper();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Activity Feed</h1>
      {
        groups.map(
          (group) => (
            <Box mb={4}>
              <ActivityFeedPost
                ownerId={group.ownerId}
                location={group.location}
                departDate={group.departDate}
                modeTransport={group.modeTransport}
                departPlace={group.departPlace}
                maxCapacity={group.maxCapacity}
                currCapacity={group.currCapacity}
                currMemberIds={group.currMemberIds}
                groupId={group.id}
              />
            </Box>
          ),
        )
      }

    </div>
  );
}
export default ActivityFeed;
