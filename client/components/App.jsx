import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './Form.jsx';
import Fitcheck from './Fitcheck.jsx';
import Wardrobe from './Wardrobe.jsx';
import '../styles.css';
import logo from '../img/fit-check-logo.png';

function App() {
  return (
    <div className='mainContainer'>
      <header>
        <img src={logo} alt="" />
      </header>
      <div className='contentContainer'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <div className='optionContainer'>
                <div className='fitCheckContainer'>
                  <Link to='/fitCheck'>
                    <button className='btnGoFit'>Go to Fitcheck</button>
                  </Link>
                </div>
                <Form />
              </div>
            </Route>
            <Route path='/fitCheck'>
              <div className='fitcheck-container'>
                <div>
                  <Link to='/'>
                    <button className='btnGoBack'>Add More Outfits</button>
                  </Link>
                </div>
                <Fitcheck />
              </div>
            </Route>
          </Switch>
        </Router>
        <br></br>
        <Wardrobe />
      </div>
    </div>
  );
}

export default App;
