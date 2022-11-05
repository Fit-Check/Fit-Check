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

  const [currTop, chooseTop] = useState('');
  const [currBottom, chooseBottom] = useState('');
  const [weather, setWeather] = useState('');

  const generateOutfit = () => {
    const randBotNum = Math.floor(Math.random() * bottomsArr.length);

    const randTopNum = Math.floor(Math.random() * topsArr.length);

    chooseTop(topsArr[randTopNum]);
    chooseBottom(bottomsArr[randBotNum]);
    return;
  };

  //   useEffect(() => {
  //     console.log('useeffect');
  //     // function fetchData() {
  //     //   fetch('/api/')
  //     //     .then((data) => data.json())
  //     //     .then((result) => {
  //     //       setTopsArray(result.tops);
  //     //       setBottomsArray(result.bottoms);
  //     //     });
  //     // }
  //     // fetchData();
  //     generateOutfit();
  //   }, []);

  function onSubmit() {
    // send post request to server containing state
    console.log(name, clothingType, weather);
    axios
      .post('/', {
        weather: weather, // Sunny, Rainy, Cold, Hot // req.body.name/weather
      })
      .then((response) => {
        console.log(response);
        setTopsArray(response.tops);
        setBottomsArray(response.bottoms);
      })
      .catch((error) => {
        console.log(error);
      });
    generateOutfit();
  }

  return (
    <div id='fitcheck'>
      <h2>What is the weather like today?</h2>
      <form>
        <label></label>
        <select
          value={weather}
          name='weather'
          onChange={(e) => setWeather(e.target.value)}
        >
          <option value=''></option>
          <option value='Sunny'>Sunny</option>
          <option value='Rainy'>Rainy</option>
          <option value='Cold'>Cold</option>
          <option value='Hot'>Hot</option>
        </select>
      </form>
      <h1>Your outfit for the day!</h1>
      <p>{currTop}</p>
      <p>{currBottom}</p>
      <button onClick={generateOutfit}>yolo</button>
    </div>
  );
}

// [top1, top2, top3][(bottom1, bottom2, bottom3)];

export default Fitcheck;
