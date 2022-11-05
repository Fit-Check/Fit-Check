import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './Form.jsx';
import Fitcheck from './Fitcheck.jsx';
import Wardrobe from './Wardrobe.jsx';
import '../styles.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <div>
              <div>
                <Link to='/fitCheck'>
                  <button id='goFit'>Go to Fitcheck</button>
                </Link>
              </div>
              <Form />
            </div>
          </Route>
          <Route path='/fitCheck'>
            <div>
              <div>
                <Link to='/'>
                  <button id='back'>Add More Outfits</button>
                </Link>
              </div>
              <Fitcheck />
            </div>
          </Route>
        </Switch>
      </Router>
      <br></br>
      <Wardrobe />
    </>
  );
}

export default App;
