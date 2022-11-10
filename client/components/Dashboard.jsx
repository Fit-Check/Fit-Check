import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.jsx';
import Wardrobe from './Wardrobe.jsx';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';

// import Grid from '@mui/material/Grid'; //help center login
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';

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
        // display: 'flex',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
      }}
    >
      <div className='optionContainer'>
        <div className='fitCheckContainer'>
          <Button
            className='btnGoFit'
            type='submit'
            variant='contained'
            href='/fitCheck'
            sx={{ mt: 10, ml: 16 }}
          >
            Fit Check
          </Button>
        </div>
        <Form
          userId={user_id}
          token={token}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      </div>
      <br></br>
      <Wardrobe userId={user_id} token={token} />
    </Box>
  );
}
