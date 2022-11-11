import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';

const Form = ({ userId, setUserId, token, setToken, setRefetch, refetch }) => {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState('');
  const [clothingType, setType] = useState('');
  // const [user, setUser] = useState('');

  console.log(token, 'token');
  console.log(userId, 'userId');
  function onSubmit() {
    // send post request to server containing state
    if (name && weather && clothingType) {
      console.log(name, clothingType, weather);
      console.log(name, clothingType, weather);
      fetch(`/clothes/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name, // name of clothing as string
          weather, // Sunny, Rainy, Cold, Hot
          clothingType, // 'top' or 'bottom'
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('fetch clothes response', response);
          setRefetch(true);
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    }
  }

  return (
    <Box>
      <Typography component='h6' sx={{ mb: 1 }}>
        Describe your new piece:
        <Input
          type='text'
          value={name}
          minLength='1'
          size='20'
          placeholder='apple bottom jeans 🍎'
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </Typography>

      <Typography component='h6' sx={{ mb: 1 }}>
        Is your new piece:
      </Typography>

      <Typography component='h6' sx={{ mb: 1 }}>
        <input
          type='radio'
          id='top'
          name='new_piece'
          value='Top'
          onClick={() => setType('top')}
        />
        Top
      </Typography>
      <Typography component='h6' sx={{ mb: 1 }}>
        <input
          type='radio'
          id='bottom'
          name='new_piece'
          value='Bottom'
          onClick={() => setType('bottom')}
        />
        Bottom
      </Typography>
      <Typography component='h6' sx={{ mb: 1 }}>
        What is the weather like when you wear this?
        <FormControl
          size='small'
          sx={{
            ml: 1,
            minWidth: 90,
            backgroundColor: '#f7f7f7',
          }}
        >
          <InputLabel sx={{ fontSize: 14, mt: -0.6 }}>Weather</InputLabel>
          <Select
            value={weather}
            name='weather'
            onChange={(e) => setWeather(e.target.value)}
            autoWidth
            label='weather'
            sx={{
              maxHeight: 30,
            }}
          >
            <MenuItem value={'hot'}>Hot</MenuItem>
            <MenuItem value={'perfect'}>Perfect</MenuItem>
            <MenuItem value={'cool'}>Cool</MenuItem>
            <MenuItem value={'cold'}>Cold</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Button
        size='medium'
        className='submit'
        type='submit'
        variant='contained'
        onClick={onSubmit}
        sx={{
          mt: 2,
          ml: 12,
          borderRadius: '20px',
          boxShadow: 3,
          backgroundColor: '#50C878',
          color: '#ffffff',
          border: 3,
          borderColor: '#ffffff',
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
