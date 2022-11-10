import React, { useEffect, useState } from 'react';
import Form from './Form.jsx';
import Wardrobe from './Wardrobe.jsx';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

export default function Dashboard() {
  const { user_id } = useParams();
  const [token, setToken] = useState('');
  const [refetch, setRefetch] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  //set cookies/session
  const [cookies, setCookies] = useState({});

  //post request to backend?
  //setCookie/session

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  console.log(user_id);
  return (
    <Box
      sx={{
        ml: 4,
        mr: 4,
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
      }}
    >
      <div className='optionContainer'>
        <Typography component='h1' variant='h5' sx={{ mt: 10 }}>
          What is your new fit?
          <Button
            type='submit'
            variant='contained'
            href='/fitCheck'
            sx={{
              mt: 1,
              mb: 2,
              ml: 11,
              borderRadius: '25px',
              boxShadow: 3,
              border: 3,
              borderColor: '#ffffff',
              backgroundColor: '#FF5733',
              color: '#ffffff',
            }}
          >
            Fit Check
          </Button>
        </Typography>
        <Form
          userId={user_id}
          token={token}
          refetch={refetch}
          setRefetch={setRefetch}
        />
        <Wardrobe userId={user_id} token={token} />
      </div>
    </Box>
  );
}
