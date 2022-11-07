import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Clothe from './Clothe.jsx';

function Wardrobe() {
  const [wardrobe, setWardrobe] = useState([]);
  const [size, setSize] = useState(0);
  // on mount (useEffect) send get request to server to obtain all wardrobe data

  useEffect(() => {
    function fetchData() {
      fetch('/clothes/1')
        .then((data) => data.json())
        .then((result) => {
          // console.log(result)
          setWardrobe([...result.top, ...result.bottom])})
        .catch((err) => {
          console.log('error after fetch', err);
        });
    }
    fetchData();
  }, []); // not sure on this

  // loop through wardrobe state array
  const clothingArr = [];
  for (let i = 0; i < wardrobe.length; i++) {
    clothingArr.push(<Clothe clothing={wardrobe[i]} key={i}></Clothe>);
  }
  return (
    <div className='wardrobeBox'>
      <h2>~ In Your Closet ~</h2>
      <div className='grid'>{clothingArr}</div>
    </div>
  );
}

export default Wardrobe;
