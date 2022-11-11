import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const FitCheck = () => {
  const [topsArr, setTopsArray] = useState([]);
  const [bottomsArr, setBottomsArray] = useState([]);
  const [token, setToken] = useState('');
  const [weather, setWeather] = useState('');

  const geolocationAPI = navigator.geolocation;
  // need to figure out a way to add process.env to react side [CANNOT HAVE KEYS]
  const locationURL =
    'https://ipgeolocation.abstractapi.com/v1/?api_key=c2fcf887bbad4de5b2b93ce2048ad242';
  const locationKey = 'c2fcf887bbad4de5b2b93ce2048ad242';

  // const locationURL = process.env.REACT_APP_BASE_URL;
  // const locationKey = process.env.REACT_APP_API_KEY;

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [country, setCountry] = useState(null);

  const [currTop, chooseTop] = useState('');
  const [currBottom, chooseBottom] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  // GETTING WEATHER API
  // geolocation api calls here for latitude and longitude which can be given as variables to below weather api call
  function getCurrWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=51bc9ba3a9de3e5aa5c7dc601894c699`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log('this is data temp', data.main.temp);
        const kelvinTemp = data.main.temp;
        // (298K − 273.15) × 9/5 + 32 = 76.73°F
        //convert to fahrenheit
        const fahTemp = (kelvinTemp - 273.15) * (9 / 5) + 32;
        console.log(fahTemp);
        return fahTemp;
      })
      .then((temp) => {
        const currTemp = Math.floor(temp);
        setWeather(currTemp);
      })
      .catch((err) => console.log(err));
  }

  getCurrWeather();

  function onSubmit() {
    console.log(weather, 'weather');
    if (!weather) return;
    // send post request to server containing state

    console.log(weather);
    // fetch(`/clothes/${weather.toLowerCase()}/${userId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((result) => {
    //     setTopsArray(result.top);
    //     setBottomsArray(result.bottom);
    //   })
    //   .catch((error) => console.log(error, 'error'));
  }

  // GETTING GEO-LOCATION VIA API
  const getUserLocationFromAPI = async () => {
    try {
      const response = await axios.get(locationURL, {
        location_key: locationKey,
      });
      setLat(response.data.latitude);
      setLong(response.data.longitude);
      setCity(response.data.city);
      setRegion(response.data.region_iso_code);
      setCountry(response.data.country_code);
    } catch (error) {
      console.log(
        `Something went wrong getting Geolocation from API! : ${error}`
      );
    }
  };

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
      }}
    >
      {weather ? <h2>Today, the weather is {weather}° F!</h2> : null}
      <Typography component='h2' sx={{ mb: 1 }}>
        What is the weather like today?
      </Typography>
      <FormControl
        size='small'
        sx={{
          ml: 1,
          minWidth: 90,
          backgroundColor: '#f7f7f7',
        }}
      >
        <InputLabel sx={{ fontSize: 14, mt: -0.6, mb: 1 }}>Weather</InputLabel>
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
          <MenuItem value={'sunny'}>Sunny</MenuItem>
          <MenuItem value={'rainy'}>Rainy</MenuItem>
          <MenuItem value={'cold'}>Cold</MenuItem>
        </Select>
      </FormControl>
      {/* make the below into a new component that will be rendered on change */}
      {/* <h2 className=''>Your outfit for the day!</h2> */}
      {/* make the below into a new component that will be rendered on change */}
      {/* <h2 className=''>Your outfit for the day!</h2> */}

      {topsArr.length && bottomsArr.length ? (
        <p>
          Your outfit for today is your{' '}
          {topsArr[Math.floor(Math.random() * topsArr.length)].name} and{' '}
          {bottomsArr[Math.floor(Math.random() * bottomsArr.length)].name}!
        </p>
      ) : null}
      {/* {bottomsArr.length ? (<p> and your {bottomsArr[Math.floor(Math.random() * bottomsArr.length)].name}</p>) : null} */}

      <Button
        type='submit'
        variant='contained'
        onClick={getUserLocationFromAPI}
        sx={{
          borderRadius: '25px',
          boxShadow: 3,
          border: 3,
          borderColor: '#ffffff',
          backgroundColor: '#FF5733',
          color: '#ffffff',
          mt: 2,
          mb: 2,
        }}
      >
        Get It!
      </Button>
      <Typography component='h6' sx={{ textAlign: 'center' }}>
        Your coordinates are: {[lat, long]}
      </Typography>
      <Typography component='h6' sx={{ textAlign: 'center' }}>
        You are located in: {city} {region} {country}
      </Typography>
    </Box>
  );
};

// [top1, top2, top3][(bottom1, bottom2, bottom3)];

export default FitCheck;
