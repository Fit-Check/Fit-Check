import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FitCheck from './components/FitCheck.jsx';
import Wardrobe from './components/Wardrobe.jsx';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import '../client/styles/styles.css';
import logo from './img/fit-check-logo.png';
import { useState, useEffect } from 'react';

function App() {
  // const [token, setToken] = useState('');
  // const [userId, setUserId] = useState('');

  return (
    <div className="mainContainer">
      <header>
        <img
          src={logo}
          alt=""
        />
      </header>
      <div className="contentContainer">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                // userId={userId}
                // setUserId={setUserId}
                // token={token}
                // setToken={setToken}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <SignUp
                // userId={userId}
                // setUserId={setUserId}
                // token={token}
                // setToken={setToken}
                ></SignUp>
              }
            ></Route>
            <Route
              path="/home"
              element={<Dashboard />}
            ></Route>
            <Route
              path="/fitCheck/"
              element={
                <FitCheck
                // userId={userId}
                // token={token}
                />
              }
            ></Route>

            <Route
              path="/wardrobe"
              element={
                <Wardrobe
                // userId={userId}
                // token={token}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
