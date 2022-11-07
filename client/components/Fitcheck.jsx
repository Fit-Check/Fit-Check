import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Fitcheck() {
  const [topsArr, setTopsArray] = useState([
    // 'blue shirt',
    // 'green sweater',
    // 'white jacket',
    // 'red hoodie',
    // 'denim jacket',
  ]);
  const [bottomsArr, setBottomsArray] = useState([
    // 'blue jeans',
    // 'sweats pants',
    // 'cargo pants',
    // 'black jeans',
    // 'denim shorts',
  ]);

  // const [currTop, chooseTop] = useState('');
  // const [currBottom, chooseBottom] = useState('');
  const [weather, setWeather] = useState('');

  // const generateOutfit = () => {
    
  //   const randBotNum = Math.floor(Math.random() * bottomsArr.length);

  //   const randTopNum = Math.floor(Math.random() * topsArr.length);

  //   chooseTop(topsArr[randTopNum]);
  //   chooseBottom(bottomsArr[randBotNum]);
  //   return;
  // };

  function onSubmit() {
    console.log(weather, 'weather');
    if (!weather) return;
    // send post request to server containing state
    console.log(weather)
    fetch(`/clothes/${weather.toLowerCase()}/1`)
      .then((data) => data.json())
      .then((result) => {
        setTopsArray(result.top);
        setBottomsArray(result.bottom); 
      }).catch((error) => console.log(error, 'error'));
  
  }

  return (
    <div id='fitcheck'>
     {console.log(bottomsArr, "bottomsArr HERE")}
      <h2>What is the weather like today?</h2>
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
      </form>
      {/* make the below into a new component that will be rendered on change */}
      {/* <h2 className=''>Your outfit for the day!</h2> */}
      {topsArr.length && bottomsArr.length ? (<p>Your outfit for today is your {topsArr[Math.floor(Math.random() * topsArr.length)].name} and your {bottomsArr[Math.floor(Math.random() * bottomsArr.length)].name}</p>) : null}
      {/* {bottomsArr.length ? (<p> and your {bottomsArr[Math.floor(Math.random() * bottomsArr.length)].name}</p>) : null} */}
      <button className='btnYolo' onClick={onSubmit}>yolo</button>
    </div>
  );
}

// [top1, top2, top3][(bottom1, bottom2, bottom3)];

export default Fitcheck;
