import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import authServices from '../services/authService';
import axios from 'axios';

import Grid from '@mui/material/Grid'; //help center login
import Box from '@mui/material/Box'; //help center login
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
// import { ButtonGroup } from '@mui/material';

function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const navigate = useNavigate('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authServices
        .signup(username, firstname, lastname, password, email)
        .then(
          (response) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate('/home');
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='SignUp'>
      <Box
        component='form'
        sx={{
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={onSubmit}>
          <Typography component='h1' variant='h6'>
            {' '}
            First name:{' '}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='Firstname'
            label='Firstname'
            name='Firstname'
            autoComplete='First name'
            autoFocus
            onChange={(e) => setFirstname(e.target.value)}
          />
          {/*<input type='text' onChange={(e) => setFirstname(e.target.value)} />*/}

          <Typography component='h1' variant='h6'>
            {' '}
            Last name:{' '}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='Lastname'
            label='Lastname'
            name='Lastname'
            autoComplete='Last name'
            autoFocus
            onChange={(e) => setLastname(e.target.value)}
          />
          {/*<input type='text' onChange={(e) => setLastname(e.target.value)} />*/}

          <Typography component='h1' variant='h6'>
            {' '}
            Username:{' '}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='Username'
            label='Username'
            name='Username'
            autoComplete='Username'
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          {/*<input type='text' onChange={(e) => setUsername(e.target.value)} /> */}

          <Typography component='h1' variant='h6'>
            {' '}
            Password:{' '}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='Password'
            label='First name'
            name='firstnameSignup'
            autoComplete='First name'
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*<input type='text' onChange={(e) => setPassword(e.target.value)} />*/}

          <Typography component='h1' variant='h6'>
            {' '}
            Email:{' '}
          </Typography>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='emailSignup'
            autoComplete='Email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          {/*<input type='text' onChange={(e) => setEmail(e.target.value)} /> */}

          {/* <Typography component='h1' variant='h6'>
            {' '}
            Location:{' '}
          </Typography> */}
          {/* <TextField
            margin='normal'
            required
            fullWidth
            id='locationSignup'
            label='Set your current location'
            name='locationSignup'
            autoComplete='Location'
            autoFocus
            onChange={(e) => setLocation(e.target.value)}
          /> */}
          {/* <input type='text' onChange={(e) => setLocation(e.target.value)} />
          <input*/}
          <Button
            type='submit'
            variant='contained'
            size='medium'
            sx={{ mt: 2, mb: 2 }}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </div>
  );
}
// {authorize ? <Navigate to='/home' /> : null}
// const { firstname, lastname, username, email, password, location } = req.body;

export default SignUp;
