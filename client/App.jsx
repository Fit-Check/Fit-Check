import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import FitCheck from './components/FitCheck.jsx';
import Wardrobe from './components/Wardrobe.jsx';
import SignUp from './components/signup.jsx';
import Login from './components/login.jsx';
import Dashboard from './components/Dashboard.jsx';

// import '../client/styles/styles.css';
import '../client/styles/muistyles.css';
import logo from './img/fit-check-logo.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CenterFocusStrong } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E5D9F2',
      dark: '#F5EFFF',
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

  const [w, setW] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setW(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          className='header-img'
          component='img'
          style={{
            position: 'relative',
          }}
          sx={{
            maxHeight: { xs: 391, md: 391 },
            maxWidth: { xs: 391, md: 391 },
            mb: -7,
          }}
          alt='logo'
          src={logo}
        />
        <div className='contentContainer'>
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
        </div>
      </div>
    </ThemeProvider>
  );
}
