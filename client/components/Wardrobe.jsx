import React from 'react';
import { useState, useEffect } from 'react';

// clothes
import springClothes from '../seasonalClothes/SpringClothes.js';
import sweater1 from '../seasonalClothes/clothingImgs/sweater1.png';
import sweater2 from '../seasonalClothes/clothingImgs/sweater2.png';
import summertop from '../seasonalClothes/clothingImgs/summertop1.png';
import boots from '../seasonalClothes/clothingImgs/boots.png';
import canadagoose from '../seasonalClothes/clothingImgs/canadagoose.png';

// styling
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';

const Wardrobe = ({ userId, setUserId, token, setToken }) => {
  const [wardrobe, setWardrobe] = useState([]);
  const [openSpring, setOpenSpring] = useState(false);
  const [openSummer, setOpenSummer] = useState(false);
  const [openFall, setOpenFall] = useState(false);
  const [openWinter, setOpenWinter] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleSpringClothes = (e) => {
    e.preventDefault();
    console.log('spring button is working');
    // setSpring(springClothes);
    setOpenSpring(!openSpring);
  };

  const handleSummerClothes = (e) => {
    e.preventDefault();
    console.log('Summer button is working');
    // setSpring(springClothes);
    setOpenSummer(!openSummer);
  };
  const handleFallClothes = (e) => {
    e.preventDefault();
    console.log('Fall button is working');
    // setSpring(springClothes);
    setOpenFall(!openFall);
  };

  const handleWinterClothes = (e) => {
    e.preventDefault();
    console.log('Winter button is working');
    // setSpring(springClothes);
    setOpenWinter(!openWinter);
  };

  return (
    <Box
      component='form'
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <ImageList
        sx={{
          width: 390,
          height: '100%',
          ml: 20,
          mr: 20,
          backgroundColor: '#FEF8DD',
        }}
        cols={1}
        rowHeight={100}
      >
        <Button variant='contained' onClick={handleSpringClothes}>
          Spring
        </Button>
        <ul>
          {openSpring ? <img src={sweater1} width={380} height={400} /> : null}
        </ul>

        <Button variant='contained' onClick={handleSummerClothes}>
          Summer
        </Button>
        <ul>
          {openSummer ? <img src={summertop} width={380} height={400} /> : null}
        </ul>

        <Button variant='contained' onClick={handleFallClothes}>
          Fall
        </Button>
        <ul>
          {openFall ? <img src={sweater2} width={380} height={400} /> : null}
        </ul>

        <Button
          variant='contained'
          onClick={handleWinterClothes}
          sx={{
            mb: 3,
          }}
        >
          Winter
        </Button>
        <ul>
          {' '}
          {openWinter ? (
            <img src={canadagoose} width={380} height={400} />
          ) : null}
        </ul>
      </ImageList>
    </Box>
  );
};
export default Wardrobe;
