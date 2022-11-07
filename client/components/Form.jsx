import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState('');
  const [clothingType, setType] = useState('');
    // const [user, setUser] = useState('');

  function onSubmit() {
    // send post request to server containing state
    if (name && weather && clothingType) {
      console.log(name, clothingType, weather);
      fetch('/clothes/' + '1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, // name of clothing as string
          weather, // Sunny, Rainy, Cold, Hot
          clothingType // 'top' or 'bottom'
        })
      })
        .then((response) => response.json())
        .catch((error) => {
          console.log(error, 'error');
        });
    }
  }

  return (
    <div id='form'>
      <h2>What is your new fit?</h2>
      <form>
        <label className='formQuestion'>Describe your new piece:</label>
        <input
          type='text'
          value={name}
          minLength='1'
          size='20'
          placeholder='bell bottom jeans'
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label className='formQuestion'>Do you wear your new piece on</label>
        <input
          type='radio'
          id='top'
          name='new_piece'
          value='Top'
          onClick={() => setType('top')}
        />
        <label htmlFor='top'>Top</label>
        <input
          type='radio'
          id='bottom'
          name='new_piece'
          value='Bottom'
          onClick={() => setType('bottom')}
        />
        <label htmlFor='bottom'>Bottom</label>
        <label className='formQuestion'>What is the weather like when you wear this?</label>  
        <select
          value={weather}
          name='weather'
          onChange={(e) => setWeather(e.target.value)}
        >
          <option value=''></option>
          <option value='hot'>Hot</option>
          <option value='perfect'>Perfect</option>
          <option value='cool'>Cool</option>
          <option value='cold'>Cold</option>
        </select>
        <br></br>
        <input className='submit' type='submit' value='Submit' onClick={onSubmit}></input>
      </form>
    </div>
  );
}

export default Form;
