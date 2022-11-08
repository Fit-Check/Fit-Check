import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Form from './Form.jsx';
import Fitcheck from './Fitcheck.jsx';
import Wardrobe from './Wardrobe.jsx';
import SignUp from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './Dashboard.jsx';
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
          <Routes>
            <Route
              path='/'
              element={
                <Login
                  userId={userId}
                  setUserId={setUserId}
                  token={token}
                  setToken={setToken}
                />
              }
            />

            <Route
              path='/signup'
              element={
                <SignUp
                  userId={userId}
                  setUserId={setUserId}
                  token={token}
                  setToken={setToken}
                ></SignUp>
              }
            ></Route>
            <Route path='/home/:user_id' element={<Dashboard />}></Route>
            <Route
              path='/fitCheck/'
              element={
                <>
                  <div className='fitcheck-container'></div>
                  <div>
                    <Fitcheck userId={userId} token={token} />
                  </div>
                  <br></br>
                  <Wardrobe userId={userId} token={token} />
                </>
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

{
  /* <div>
  <Link to='/signup'>
    <button className='signUp'>Sign Up</button>
  </Link>
</div>; */
}

{
  /* <Link to='/'>
<button className='login'>Home</button>
</Link> */
}
