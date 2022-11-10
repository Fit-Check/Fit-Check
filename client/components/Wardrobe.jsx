import React from 'react';
import { useState, useEffect } from 'react';
// import Clothes from './Clothes.jsx';
import springClothes from '../seasonalClothes/SpringClothes.js';
import sweater1 from '../seasonalClothes/clothingImgs/sweater1.jpg';
import sweater2 from '../seasonalClothes/clothingImgs/sweater2.jpg';
import summertop from '../seasonalClothes/clothingImgs/summertop1.jpg';
import boots from '../seasonalClothes/clothingImgs/boots.jpg';
import canadagoose from '../seasonalClothes/clothingImgs/canadagoose.jpg';

import Grid from '@mui/material/Grid'; //help center login
import Box from '@mui/material/Box'; //help center login
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';

//  { log: 'Error caught in verifyToken middleware',
//    status: 400,
//    message: { err: 'Invalid token.' }
//  } error from global error handler
// -> error located in auth.mjs

const Wardrobe = ({ userId, setUserId, token, setToken }) => {
  const [wardrobe, setWardrobe] = useState([]);
  const [openSpring, setOpenSpring] = useState(false);
  const [openSummer, setOpenSummer] = useState(false);
  const [openFall, setOpenFall] = useState(false);
  const [openWinter, setOpenWinter] = useState(false);

  // on mount (useEffect) send get request to server to obtain all wardrobe data
  console.log(userId, token, 'userID and Token');
  function fetchData() {
    console.log('inside fetchData');
    fetch(`/clothes/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result, 'result');
        setWardrobe([...result.top, ...result.bottom]);
      })
      .catch((err) => {
        console.log('error after fetch', err);
      });
  }
  useEffect(() => {
    console.log('I was triggered');
    console.log(token, 'useEffect token');
    if (token) fetchData();
  }, [token]); // not sure on this

  // useEffect(() => {
  //   if (refetch) fetchData();
  // }, [refetch]);
  // `Bearer ${token string}`

  // loop through wardrobe state array
  // const clothingArr = [];
  // for (let i = 0; i < wardrobe.length; i++) {
  //   clothingArr.push(<Clothes clothing={wardrobe[i]} key={i}></Clothes>);
  // }

  const handleSpringClothes = () => {
    console.log('spring button is working');
    // setSpring(springClothes);
    setOpenSpring(!openSpring);
  };

  const handleSummerClothes = () => {
    console.log('Summer button is working');
    // setSpring(springClothes);
    setOpenSummer(!openSummer);
  };
  const handleFallClothes = () => {
    console.log('Fall button is working');
    // setSpring(springClothes);
    setOpenFall(!openFall);
  };

  const handleWinterClothes = () => {
    console.log('Winter button is working');
    // setSpring(springClothes);
    setOpenWinter(!openWinter);
  };
  return (
    <Box>
      <div className='wardrobeBox'>
        <Typography variant='h6'>In Your Closet</Typography>
        <ButtonGroup variant='contained' sx={{ mt: 1 }}>
          <Button type='submit' onClick={handleSpringClothes}>
            Spring
          </Button>
          {openSpring ? (
            <ul className='springWardrobe'>
              <img src={sweater1} />
            </ul>
          ) : null}

          <Button type='submit' onClick={handleSummerClothes}>
            Summer
          </Button>
          {openSummer ? (
            <ul className='summerWardrobe'>
              <img src={summertop} />
            </ul>
          ) : null}
          <Button type='submit' onClick={handleFallClothes}>
            Fall
          </Button>
          {openFall ? (
            <ul className='fallWardrobe'>
              <img src={sweater2} />
            </ul>
          ) : null}
          <Button type='submit' onClick={handleWinterClothes}>
            Winter
          </Button>
          {openWinter ? (
            <ul className='winterWardrobe'>
              <img src={canadagoose} />
              <img src={boots} />
            </ul>
          ) : null}
        </ButtonGroup>
      </div>
    </Box>
  );
};

/**
 * {wardrobe.length ? (
        <div className='grid'>{clothingArr}</div>
      ) : (
        <h3>You have no clothes. Go buy some clothes!</h3>
      )}
 */

export default Wardrobe;
