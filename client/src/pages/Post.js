/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Button, Container, Toolbar, Typography, Stack, Box, Avatar, IconButton,
} from '@mui/material';
import OtherPost from '../components/OtherPost';
import MyPost from '../components/MyPost';
import { getGroupById, changeGroup, deleteGroupById } from '../api/groups';
import {
  changeChatroom, createNewChatroom, getChatroomById, getChatroomByName, getAllChatrooms,
  deleteChatroom,
} from '../api/chat';
import { getUserById } from '../api/users';

export default function Post({ name, userId }) {
  if (userId === null) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  const { groupId } = useParams();
  const [ownerId, setOwnerId] = useState(0);
  const [location, setLocation] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [modeTransport, setModeTransport] = useState('');
  const [departPlace, setDepartPlace] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currCapacity, setCurrCapacity] = useState(0);
  const [currMemberIds, setCurrMemberIds] = useState([]);
  const [group, setGroup] = useState([]);
  const [membership, setMembership] = useState(currMemberIds.includes(userId));

  const modifyGroupOnServer = async (data) => {
    // console.log('membership at modification', membership);
    const response = await changeGroup(groupId, data);
  };

  const deleteGroupOnServer = async () => {
    const response = await deleteGroupById(groupId);
    navigate('/activityfeed');
  };

  const handleDeleteGroup = (e) => {
    // MADE EDITS HERE: when you delete group, chat is deleted too
    // should be leave chatroom instead
    deleteChatroom(groupId);
    deleteGroupOnServer();
  };

  const handleLeaveGroup = (e) => {
    setMembership(false);
    // console.log('membership', membership);
    // console.log('group', group);
    const modifiedData = {
      id: groupId,
      ownerId,
      location,
      departDate,
      modeTransport,
      departPlace,
      maxCapacity,
      currCapacity: currCapacity - 1,
      currMemberIds: currMemberIds.filter((item) => item !== userId),
    };
    setCurrMemberIds(currMemberIds.filter((item) => item !== userId));
    setCurrCapacity(currCapacity - 1);
    // console.log('modifiedData', modifiedData);
    modifyGroupOnServer(modifiedData);
  };

  const handleJoinGroup = (e) => {
    // setMembership(true);
    // console.log('membership', membership);
    // console.log('group', group);
    const modifiedData = {
      id: groupId,
      ownerId,
      location,
      departDate,
      modeTransport,
      departPlace,
      maxCapacity,
      currCapacity: currCapacity + 1,
      currMemberIds: [...currMemberIds, userId],
    };
    setCurrMemberIds([...currMemberIds, userId]);
    setCurrCapacity(currCapacity + 1);
    // console.log('modifiedData', modifiedData);
    modifyGroupOnServer(modifiedData);
  };

  // chat functions
  const handleGoToChatroom = async (e) => {
    const r2 = await getUserById(ownerId);
    const postOwner = r2.name;
    const postLoc = location;
    const chatName = postOwner.concat(' Group to ', postLoc);
    console.log('chat name is ', chatName);
    const allChats = await getAllChatrooms();
    // console.log('check response', allChats.response);
    console.log('all chats most', allChats);
    // const targetChatId = 0;
    const exist = Object.values(allChats).filter(
      (chat) => (chat.chatName === chatName),
    );
    console.log('does it exist', exist);
    // const existChat = await getChatroomByName(chatName);
    if (exist.length === 0) {
      console.log('no chat exist');
      const response = await createNewChatroom(groupId, currMemberIds, chatName);
    // }
    } else {
      console.log('exist is', exist);
      const id = exist[0]._id;
      // const r3 = await getChatroomByName(chatName);
      // const id = r3._id;
      console.log('chatid', id);
      Object.values(allChats).forEach((c) => {
        if (c.chatName === chatName) {
          console.log('chat c ', c);
          const t = c.texts;
          const membersId = c.currentMembersIds;
          console.log('before pushing', membersId);
          membersId.push(userId);
          console.log(groupId);
          console.log('new mem id post', membersId);
          // ID IS UNDEFINED
          changeChatroom(id, chatName, t, membersId, groupId);
        }
      });
    }
    navigate(`/chatroom/${groupId}`);
  };

  useEffect(() => {
    // wrapper function
    async function getGroupByIdWrapper() {
      console.log('UserId in Post', userId);
      console.log('GroupId in Post', groupId);
      const response = await getGroupById(groupId);
      // console.log('response', response);
      setGroup(response);
      setOwnerId(response.ownerId);
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
  }, []);

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
        groupId={groupId}
        userId={userId}
        group={group}
        handleDeleteGroup={handleDeleteGroup}
        handleGoToChatroom={handleGoToChatroom}
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
        groupId={groupId}
        userId={userId}
        group={group}
        handleLeaveGroup={handleLeaveGroup}
        handleJoinGroup={handleJoinGroup}
        handleGoToChatroom={handleGoToChatroom}
      />
    </div>
  );
}
