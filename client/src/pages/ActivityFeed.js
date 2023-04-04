import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button,
} from '@mui/material';
import ActivityFeedPost from '../components/ActivityFeedPost';
import FilterPanel from '../components/FilterPanel';
import { getAllGroups } from '../api/groups';

function ActivityFeed() {
  const [groups, setGroups] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);
  const [locationKeyword, setLocationKeyword] = useState(null);

  useEffect(() => {
    // wrapper function
    async function getAllGroupsWrapper() {
      const response = await getAllGroups();
      setGroups(response);
    }
    // run the wrapper function
    getAllGroupsWrapper();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Activity Feed</h1>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <FilterPanel
          sx={{ position: 'fixed', left: 0 }}
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          locationKeyword={locationKeyword}
          setLocationKeyword={setLocationKeyword}
        />
        <Box sx={{ marginLeft: '10px' }}>
          {
            groups
              .filter(
                (group) => (selectedLocations.size === 0 || selectedLocations.has(group.location)),
              )
              .filter((group) => {
                if (!selectedDate) return true;

                const groupDate = group.departDate.trim().split(' ')[0];
                return groupDate === selectedDate;
              })
              .filter((group) => {
                if (!locationKeyword) return true;
                return group.location.toLowerCase().includes(locationKeyword.toLowerCase());
              })
              .map(
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
        </Box>
      </Box>
    </div>
  );
}
export default ActivityFeed;
