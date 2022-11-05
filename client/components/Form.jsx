import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState('');
  const [clothingType, setType] = useState('');
  //   const [user, setUser] = useState('');

  function onSubmit() {
    // send post request to server containing state

    if (name && weather && clothingType) {
      console.log(name, clothingType, weather);
      axios
        .post('/', {
          // req.body.name/weather
          // user: user,
          name: name, // name of clothing as string
          weather: weather, // Sunny, Rainy, Cold, Hot
          clothingType: clothingType, // 'top' or 'bottom'
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div id='form'>
      <h1>What is your new fit? </h1>
      <form>
        <label>What is your piece called? </label>
        <input
          type='text'
          value={name}
          minlength='1'
          size='10'
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <label>What is the new piece?</label>
        <input
          type='radio'
          id='top'
          name='new_piece'
          value='Top'
          onClick={() => setType('top')}
        />{' '}
        <label for='top'>Top</label>
        <input
          type='radio'
          id='bottom'
          name='new_piece'
          value='Bottom'
          onClick={() => setType('bottom')}
        />
          <label for='bottom'>Bottom</label>
        <br></br>
        <label>What is the weather like when you wear this? </label>
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
        <br></br>
        <input type='submit' value='Submit' onClick={onSubmit}></input>
      </form>
    </div>
  );
}

export default Form;
