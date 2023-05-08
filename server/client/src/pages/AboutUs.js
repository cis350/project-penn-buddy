/* eslint-disable max-len */
import React from 'react';
import {
  Container, Box, Avatar, Typography, Grid, Stack, Button, Rating,
} from '@mui/material';
import NavbarLogin from '../components/NavbarLogin';

export default function AboutUs({ name }) {
  return (
    <Box sx={{ mx: 10 }}>
      <Typography variant="h3" align="center">
        About Us
      </Typography>
      <Typography variant="h4" align="center">
        What problem is your system trying to solve?
      </Typography>
      <Typography variant="h7" align="center">
        Oftentimes, Penn students send messages in GroupMe chats with over five-hundred students asking if anyone wants to ride to or from the airport together. However, this tactic is often inefficient, since there are many group chats to keep track of and messages often go unread. Due to this, many students end up traveling alone. This problem not only impacts college students, who must pay higher transportation costs, but also negatively affects the environment, due to higher volumes of trips and increased vehicle exhaust.
        Therefore, we are creating a platform, Penn Buddy, that will match Penn students who are traveling to similar places around similar times together, making their searches more convenient, organized, and efficient. Penn students will be able to find a ‘travel buddy’ with someone who shares the same interests and hobbies as them, such as food, sports, and entertainment. Not only will individuals have the opportunity to create new friendships at Penn, but they are saving on transportation costs by traveling to and from a desired location together.
      </Typography>
      <Typography variant="h4" align="center">
        Why is it important to solve this problem?
      </Typography>
      <Typography variant="h7" align="center">
        Roughly one-fifth of U.S greenhouse gas emissions stem from vehicle exhaust. With Penn Buddy, students have the opportunity to not only save on transportation costs and create new friendships, but also be a contributor to tackling our world’s larger, most pressing issue of climate change. This sustainable method of transportation will reduce individuals’ carbon footprints and dramatically decrease the harmful emissions that enter our Earth’s atmosphere. Furthermore, Penn Buddy will foster a supportive and safe environment for individuals who do not want to travel alone, and it is also an efficient way for college students to save money.
      </Typography>
      <Typography variant="h4" align="center">
        Who will benefit from solving it?
      </Typography>
      <Typography variant="h7" align="center">
        The entire Penn population will benefit. Not only students, but professors and faculty can all utilize this platform. Given Penn’s diverse population, the demand for traveling is always high, especially during breaks. The Penn population can thus save money and make more valuable (and potentially lifelong) connections by sharing a ride with their travel buddy!
      </Typography>
    </Box>
  );
}
