import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authorize, setAuthorize] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // fetch('/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //     email,
    //   }),
    // }).then((response) => setAuthorize(response));
    // setAuthorize((preState) => {
    //   return !preState;
    // });
    setAuthorize(true);
  };

  //   <Switch>
  //         <Route exact path="/login" component={Login} />
  //         <Route exact path="/signup" component={SignUp} />
  //         { authorize &&
  //           <Route exact path="/Welcome" component={Welcome} />
  //         }
  //       </Switch>
  //<Link exact path='/'></Link>

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
      {authorize ? <Redirect to='/' /> : null}
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
