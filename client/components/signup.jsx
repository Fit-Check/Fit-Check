import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import authServices from '../services/authService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

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
    <Box
      component='form'
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FEF8DD',
        maxHeight: { height: '100vh' },
        maxWidth: { width: '100vw' },
      }}
    >
      <form onSubmit={onSubmit}>
        <Typography component='h1' variant='h6'>
          First name:
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
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
          Last name:{' '}
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
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
          Username:
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
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
          Password:
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
          margin='normal'
          required
          fullWidth
          id='Firstname'
          label='First name'
          name='firstnameSignup'
          autoComplete='First name'
          autoFocus
          onChange={(e) => setFirstname(e.target.value)}
        />
        {/*<input type='text' onChange={(e) => setPassword(e.target.value)} />*/}

        <Typography component='h1' variant='h6'>
          Email:
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
          margin='normal'
          required
          fullWidth
          id='Firstname'
          label='Email'
          name='emailSignup'
          autoComplete='Email'
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        {/*<input type='text' onChange={(e) => setEmail(e.target.value)} /> */}

        <Typography component='h1' variant='h6'>
          Location:
        </Typography>
        <TextField
          sx={{ backgroundColor: '#f7f7f7' }}
          margin='normal'
          required
          fullWidth
          id='locationSignup'
          label='Set your current location'
          name='locationSignup'
          autoComplete='Location'
          autoFocus
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* <input type='text' onChange={(e) => setLocation(e.target.value)} />
          <input*/}
        <Button
          type='submit'
          variant='contained'
          size='medium'
          sx={{
            mt: 2,
            mb: 2,
            borderRadius: '20px',
            boxShadow: 3,
            border: 3,
            borderColor: '#ffffff',
            backgroundColor: '#FF5733',
            color: '#ffffff',
          }}
          onClick={onSubmit}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}
// {authorize ? <Navigate to='/home' /> : null}
// const { firstname, lastname, username, email, password, location } = req.body;

export default SignUp;
