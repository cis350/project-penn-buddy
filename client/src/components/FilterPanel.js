/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {
  Container, Box, FormGroup, FormControlLabel, Checkbox, Stack, TextField,
} from '@mui/material';

export default function ActivityFeedPost({ selectedLocations, setSelectedLocations }) {
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    const newSelectedLocations = new Set(selectedLocations);

    if (checked) {
      newSelectedLocations.add(value);
    } else {
      newSelectedLocations.delete(value);
    }

    setSelectedLocations(newSelectedLocations);
  };
  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#F0F0F0',
            width: '320px',
            height: '400px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: 2,
          }}
        >
          <Stack>
            <div>
              <h2 style={{ margin: '3px 0 15px 0' }}>Filter by:</h2>
              <h4 style={{ margin: '0 0 5px 0' }}>Main Airports:</h4>
            </div>
            <Stack direction="row" spacing={2}>
              <FormGroup>
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="JFK Airport" onChange={handleCheckboxChange} />} label="JFK Airport" />
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="EWR Airport" onChange={handleCheckboxChange} />} label="EWR Airport" />
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="PHL Airport" onChange={handleCheckboxChange} />} label="PHL Airport" />
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="TTN Aiport" onChange={handleCheckboxChange} />} label="TTN Airport" />
              </FormGroup>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
