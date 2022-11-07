import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './Form.jsx';
import Fitcheck from './Fitcheck.jsx';
import Wardrobe from './Wardrobe.jsx';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import '../styles.css';
import logo from '../img/fit-check-logo.png';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div className='mainContainer'>
      <header>
        <img src={logo} alt='' />
      </header>
      <div className='contentContainer'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <div>
                <Link to='/login'>
                  <button className='login'>Home</button>
                </Link>
                <div className='optionContainer'>
                  <div className='fitCheckContainer'>
                    <Link to='/fitCheck'>
                      <button className='btnGoFit'>Go to Fitcheck</button>
                    </Link>
                  </div>
                  <Form userId={userId} token={token} />
                </div>
                <br></br>
                <Wardrobe userId={userId} token={token} />
              </div>
            </Route>
            <Route path='/fitCheck'>
              <div>
                <div className='fitcheck-container'>
                  <div></div>
                  <Fitcheck userId={userId} token={token} />
                </div>
                <br></br>
                <Wardrobe userId={userId} token={token} />
              </div>
            </Route>
            <Route path='/login'>
              <div>
                <Link to='/signup'>
                  <button className='signUp'>Sign Up</button>
                </Link>
                <Login
                  userId={userId}
                  setUserId={setUserId}
                  token={token}
                  setToken={setToken}
                ></Login>
              </div>
            </Route>
            <Route path='/signup'>
              <div>
                <Link to='/login'>
                  <button className='login'>Login</button>
                </Link>
                <SignUp
                  userId={userId}
                  setUserId={setUserId}
                  token={token}
                  setToken={setToken}
                ></SignUp>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
