/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Container, Box, FormGroup, FormControlLabel, Checkbox, Stack, TextField, Button,
} from '@mui/material';

export default function ActivityFeedPost({
  selectedLocations, setSelectedLocations, selectedDate,
  setSelectedDate, setLocationKeyword, locationKeyword,
}) {
  const [inputDate, setInputDate] = useState('');
  const [inputLocation, setLocation] = useState('');
  const [checkedLocations, setCheckedLocations] = useState({});

  const handleDateChange = (event) => {
    setInputDate(event.target.value);
  };

  const handleLocationKeywordChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = () => {
    if (inputLocation === '') {
      setLocationKeyword(null);
    } else {
      setLocationKeyword(inputLocation);
    }
    if (inputDate === '') {
      setSelectedDate(null);
    } else {
      const datePattern = /^(0[1-9]|1[0-2])[-](0[1-9]|[12][0-9]|3[01])[-](19|20)[0-9]{2}$/;
      if (datePattern.test(inputDate)) {
        setSelectedDate(inputDate);
      } else {
        alert('Please enter a valid date in the format MM-DD-YYYY');
      }
    }
  };

  const handleReset = () => {
    setLocationKeyword(null);
    setSelectedDate(null);
    const empty = new Set();
    setSelectedLocations(empty);
    setCheckedLocations({});
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    const newCheckedLocations = { ...checkedLocations, [value]: checked };
    setCheckedLocations(newCheckedLocations);

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
            height: '480px',
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
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="JFK Airport" checked={checkedLocations["JFK Airport"] || false} onChange={handleCheckboxChange} />} label="JFK Airport" />
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="EWR Airport" checked={checkedLocations["EWR Airport"] || false} onChange={handleCheckboxChange} />} label="EWR Airport" />
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="PHL Airport" checked={checkedLocations["PHL Airport"] || false} onChange={handleCheckboxChange} />} label="PHL Airport" />
                <FormControlLabel control={<Checkbox style={{ color: '#0096FF' }} value="TTN Airport" checked={checkedLocations["TTN Airport"] || false} onChange={handleCheckboxChange} />} label="TTN Airport" />
              </FormGroup>
            </Stack>
            <div>
              <h4 style={{ margin: '10px 0 5px 0' }}>Other Destinations:</h4>
            </div>
            <TextField
              id="outlined-basic"
              label="Destination"
              variant="outlined"
              size="small"
              value={inputLocation}
              onChange={handleLocationKeywordChange}
            />
            <div>
              <h4 style={{ margin: '10px 0 5px 0' }}>Trip Date:</h4>
            </div>
            <TextField
              id="outlined-basic"
              label="MM-DD-YYYY"
              variant="outlined"
              size="small"
              value={inputDate}
              onChange={handleDateChange}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              style={{ marginTop: '10px' }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              style={{ marginTop: '25px', backgroundColor: '#EA3C3C' }}
            >
              Reset Filters
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
