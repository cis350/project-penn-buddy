/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import MyPost from './MyPost';
import OtherPost from './OtherPost';

export default function Post({ name, userId }) {
  const { group_id } = useParams();
  return (
    <div>
      <MyPost />
      <OtherPost />
    </div>
  );
}
