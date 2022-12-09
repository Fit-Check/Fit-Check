import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import FitCheck from './components/FitCheck.jsx';
import Wardrobe from './components/Wardrobe.jsx';
import SignUp from './components/signup.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/Dashboard.jsx';
import '../client/styles/muistyles.css';
import logo from './img/fit-check-logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C4EBF1',
      dark: '#89C7E7',
    },
    secondary: {
      main: '#A594F9',
      dark: '#CDC1FF',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '##c62828',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
  },
});

export default function App() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          backgroundColor: '#FEF8DD',
          maxHeight: { height: '100vh' },
          maxWidth: { width: '100vw' },
        }}
      >
        <Box
          className='header-img'
          component='img'
          d
          sx={{
            maxHeight: { xs: 391, md: 391 },
            maxWidth: { xs: 395, md: 395 },
            mb: -7,
            ml: -2,
          }}
          alt='logo'
          src={logo}
        />
        <Routes>
          <Route
            path='/'
            element={
              <Login
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />

          <Route
            path='/signup'
            element={
              <SignUp
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              ></SignUp>
            }
          ></Route>
          <Route path='/home' element={<Dashboard />}></Route>
          <Route path='/fitCheck' element={<FitCheck />}></Route>

          {/* <Route
         path='/fitcheck'
         element={<FitCheck userId={userId} token={token} />}
       ></Route> */}

          <Route
            path='/wardrobe'
            element={<Wardrobe userId={userId} token={token} />}
          ></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}
