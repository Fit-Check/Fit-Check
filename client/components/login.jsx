import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
// import { Container } from '@mui/system';
import Grid from '@mui/material/Grid'; //help center login
import Box from '@mui/material/Box'; //help center login
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const Login = ({ userId, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const [error, setError] = useState('');
  // const [token, setToken] = useState('');

  // custom hook for handling login page inputs
  const loginInputs = {
    username,
    password,
    email,
  };

  // use navigate for navigation to login page
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  // hook for storing state based on users login in for inputs
  const [inputData, setInputData] = useState(loginInputs);

  // handleSubmit function for sending our login request to the backend

  const handleSubmit = (e) => {
    e.preventDefault();
    (async function userLogin() {
      try {
        await axios
          .post('/login', inputData)
          .then((res) => {
            setInputData(loginInputs);
            console.log('res.data in login: ', res.data);
            return res.data;
          })
          .then((data) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('user_id', data.user_id);
            return navigate('/home');
          });
      } catch (err) {
        alert('login information not valid');
      }
    });
  };

  // handleChange function for changing data state
  const handleChange = (e, inputId) => {
    return setInputData((prevState) => ({
      // prevState is all of the login input so spread out before using
      ...prevState,
      [inputId]: e.target.value,
    }));
  };

  // this useEffect is for storing in localStorage, can comment in later if needed
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Box
      component='form'
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>

      <form onSubmit={handleSubmit}>
        <Typography component='h1' variant='h6'>
          Username
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
          onChange={(e) => handleChange(e, 'username')}
        />
        {/*
         <input
          type='text'
          placeholder='username'
          
        />
         */}
        <Typography variant='h6'>Password</Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='Password'
          label='Password'
          name='Password'
          autoComplete='Password'
          autoFocus
          onChange={(e) => handleChange(e, 'password')}
        />
        {/*<input
          type='text'
          placeholder='password'
          // value={inputData.password}
         
        />*/}
        <Typography variant='h6'>Email</Typography>
        <TextField
          margin='normal'
          required
          fullWidth
          id='Email'
          label='Email'
          name='Email'
          autoComplete='Email'
          autoFocus
          onChange={(e) => handleChange(e, 'email')}
        />

        {/* <button Home type='submit' onClick={(e) => handleLogin(e) && handleDashboard(e)} > */}

        <div>
          <ButtonGroup size='medium' sx={{ mt: 2 }}>
            <Button
              className='login-button'
              type='submit'
              onClick={navigateToHome}
              variant='contained'
              sx={{ ml: 0.5, mr: 3 }}
            >
              Login
            </Button>
            <Button
              className='sign-up-button'
              variant='contained'
              href='/signup'
              justify='center'
              // sx={{ ml: 5, mr: 3 }}
            >
              Sign Up
              {/* <Link to='/signup'>Signup</Link> */}
            </Button>
          </ButtonGroup>
          {/* <p className='no-account'>Dont have an account?</p> */}
        </div>
      </form>
    </Box>
  );
};

//   // <input
//   type='text'
//   // placeholder='email'

// />
export default Login;
