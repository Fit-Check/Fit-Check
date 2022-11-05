import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Clothe = ({ clothing }) => {
  const { name, style } = clothing;
  return (
    <div id='clothingCard'>
      <p>Name: {name}</p>
      <p>Style: {style}</p>
    </div>
  );
};

export default Clothe;
