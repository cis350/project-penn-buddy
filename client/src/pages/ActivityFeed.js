import React from 'react';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button,
} from '@mui/material';
import ActivityFeedPost from '../components/ActivityFeedPost';

function ActivityFeed() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#0096FF' }}>Activity Feed</h1>
      <Box mb={4}>
        <ActivityFeedPost />
      </Box>
      <Box mb={4}>
        <ActivityFeedPost />
      </Box>
      <Box mb={4}>
        <ActivityFeedPost />
      </Box>
    </div>
  );
}
export default ActivityFeed;
