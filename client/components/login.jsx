import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = ({ userId, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const [error, setError] = useState('');
  // const [token, setToken] = useState('');
  const navigate = useNavigate();
  const onSubmit = (e) => {
    try {
      e.preventDefault();
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response, 'response');
          setUserId(response.id);
          localStorage.setItem('token', response.token);
          if (response.token) {
            setAuthorize(true);
          }
          navigate(`/home/${response.id}`);
        });
    } catch (error) {
      setError(error.message.err);
      // window.alert(error.message.err);
      console.log(error.message, 'error from login in');
    }
    // setAuthorize((preState) => {
    //   return !preState;
    // });
  };

  return (
    <div id='login'>
      <p>Username:</p>
      <input type='text' onChange={(e) => setUsername(e.target.value)} />
      <p>Password:</p>
      <input type='text' onChange={(e) => setPassword(e.target.value)} />
      <p>Email:</p>
      <input type='text' onChange={(e) => setEmail(e.target.value)} />
      <button type='submit' onClick={(e) => onSubmit(e)}>
        Login
      </button>
      <span>
        Don't have an account? <Link to='/signup'>Signup</Link>
      </span>
      {error ? <span>{error}</span> : null}

      {authorize ? <Navigate to={`/home/${userId}`} /> : null}
    </div>
  );
};

// {authorize ? <p>authorized</p> : null}
// {topsArr.length && bottomsArr.length ? (
//     <p>
//       Your outfit for today is your{' '}
//       {topsArr[Math.floor(Math.random() * topsArr.length)].name} and your{' '}
//       {bottomsArr[Math.floor(Math.random() * bottomsArr.length)].name}
//     </p>
//   ) : null}
export default Login;
