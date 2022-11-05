import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Clothe from './Clothe.jsx';

function Wardrobe() {
  const [wardrobe, setWardrobe] = useState([
    { name: 't-shirt', style: 'cold' },
    { name: 'grey sweater', style: 'chill' },
    { name: 't-shirt', style: 'cold' },
    { name: 'grey sweater', style: 'chill' },
    { name: 'grey sweater', style: 'chill' },
    { name: 't-shirt', style: 'cold' },
    { name: 'grey sweater', style: 'chill' },
    { name: 't-shirt', style: 'cold' },
    { name: 'grey sweater', style: 'chill' },
    { name: 't-shirt', style: 'cold' },
    { name: 'grey sweater', style: 'chill' },
    { name: 't-shirt', style: 'cold' },
  ]);
  const [size, setSize] = useState(0);

  // [clothing1, clothing2]
  // response {
  //     name: asdf,
  //     type:

  // }

  // on mount (useEffect) send get request to server to obtain all wardrobe data

  //   useEffect(() => {

  //     function fetchData() {
  //         fetch("/api/")
  //         .then((data) => data.json())
  //         .then((result) => setWardrobe(result));
  //     }
  //     fetchData();

  // }, [size]) // not sure on this

  // loop through wardrobe state array
  const clothingArr = [];
  for (let i = 0; i < wardrobe.length; i++) {
    clothingArr.push(<Clothe clothing={wardrobe[i]}></Clothe>);
  }
  return (
    <div class='wardrobeBox'>
      <h1>In your closet</h1>
      <div class='grid'>{clothingArr}</div>
    </div>
  );
}

export default Wardrobe;
