// import React from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';

// function SignUp() {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [location, setLocation] = useState('');
//   const [authorize, setAuthorize] = useState(false);
//   const navigate = useNavigate('');

//   // const { firstname, lastname, username, email, password, location } = req.body;
//   function onSubmit() {
//     fetch('/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         firstname,
//         lastname,
//         username,
//         email,
//         password,
//         location,
//       }),
//     })
//       .then((response) => {
//         response.json();
//         setAuthorize(true);
//       })
//       .catch((error) => {
//         console.log(error, 'error');
//       });
//   }

//   return (
//     <div id='SignUp'>
//       <form>
//         <p>First Name:</p>
//         <input type='text' onChange={(e) => setFirstname(e.target.value)} />
//         <p>Last Name:</p>
//         <input type='text' onChange={(e) => setLastname(e.target.value)} />
//         <p>Username:</p>
//         <input type='text' onChange={(e) => setUsername(e.target.value)} />
//         <p>Password:</p>
//         <input type='text' onChange={(e) => setPassword(e.target.value)} />
//         <p>Email:</p>
//         <input type='text' onChange={(e) => setEmail(e.target.value)} />
//         <p>Location:</p>
//         <input type='text' onChange={(e) => setLocation(e.target.value)} />
//         <input
//           className='submit'
//           type='submit'
//           value='Sign Up'
//           onClick={onSubmit}
//         ></input>
//       </form>
//       {authorize ? <Navigate to='/home' /> : null}
//     </div>
//   );
// }

// // const { firstname, lastname, username, email, password, location } = req.body;

// export default SignUp;

import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import authServices from '../services/authService';
import axios from 'axios';

function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const navigate = useNavigate('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authServices
        .signup(username, password, firstname, lastname, email, location)
        .then(
          (response) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate('/home');
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='SignUp'>
      <form onSubmit={onSubmit}>
        <p>First Name:</p>
        <input type='text' onChange={(e) => setFirstname(e.target.value)} />
        <p>Last Name:</p>
        <input type='text' onChange={(e) => setLastname(e.target.value)} />
        <p>Username:</p>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
        <p>Password:</p>
        <input type='text' onChange={(e) => setPassword(e.target.value)} />
        <p>Email:</p>
        <input type='text' onChange={(e) => setEmail(e.target.value)} />
        <p>Location:</p>
        <input type='text' onChange={(e) => setLocation(e.target.value)} />
        <input
          className='submit'
          type='submit'
          value='Sign Up'
          onClick={onSubmit}
        ></input>
       </form>
       
    </div>
  );
}
// {authorize ? <Navigate to='/home' /> : null}
// const { firstname, lastname, username, email, password, location } = req.body;

export default SignUp;
