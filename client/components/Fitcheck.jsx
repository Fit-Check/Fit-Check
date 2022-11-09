import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Fitcheck = ({ userId, setUserId }) => {
  const [topsArr, setTopsArray] = useState([]);
  const [bottomsArr, setBottomsArray] = useState([]);
  const { user_id } = useParams();
  const [token, setToken] = useState('');
  const [weather, setWeather] = useState('');

  // const [currTop, chooseTop] = useState('');
  // const [currBottom, chooseBottom] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  // geolocation api calls here for latitude and longitude which can be given as variables to below weather api call
  function getCurrWeather() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=30.49&lon=-92.41&appid=51bc9ba3a9de3e5aa5c7dc601894c699'
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data.main.temp);
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
    fetch(`/clothes/${weather.toLowerCase()}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((result) => {
        setTopsArray(result.top);
        setBottomsArray(result.bottom);
      })
      .catch((error) => console.log(error, 'error'));
  }

  return (
    <div id='fitcheck'>
      {weather ? <h2>Today, the weather is {weather}° F!</h2> : null}
      {/* <h2>What is the weather like today?</h2>
      <form className='todayWeather-form'>
        <label htmlFor='weatherOptions'></label>
        <select
          value={weather}
          name='weatherOptions'
          onChange={(e) => setWeather(e.target.value)}
        >
          <option value=''></option>
          <option value='Sunny'>Sunny</option>
          <option value='Rainy'>Rainy</option>
          <option value='Cold'>Cold</option>
          <option value='Hot'>Hot</option>
        </select>
      </form> */}
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
      <button className='btnYolo' onClick={onSubmit}>
        Get It!
      </button>
    </div>
  );
};

// [top1, top2, top3][(bottom1, bottom2, bottom3)];

export default Fitcheck;
