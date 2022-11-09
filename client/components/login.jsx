import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ userId, setUserId }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [authorize, setAuthorize] = useState(false);
  // const [error, setError] = useState('');
  // const [token, setToken] = useState('');

  // custom hook for handling login page inputs
  const loginInputs = {
    username: '',
    password: '',
    email: '',
  };
  // use navigate for navigation to login page
  const navigate = useNavigate();

  // hook for storing state based on users login infor inputs
  const [inputData, setInputData] = useState(loginInputs);

  // handleChange function for changing data state
  const handleChange = (e, inputId) => {
    return setInputData((prevState) => ({
      // prevState is all of the login input so spread out before using
      ...prevState,
      [inputId]: e.target.value,
    }));
  };

  // this useEffect is for storing in localStorage, can comment in later if needed

  // handleSubmit function for sending our login request to the backend
  const handleSubmit = (event) => {
    event.preventDefault();
    (async function userLogin() {
      try {
        await axios
          .post('http://localhost:3000/auth/login', inputData)
          .then((res) => {
            setInputData(loginInputs);
            return res.data;
          })
          .then(() => {
            return navigate('/home');
          });
      } catch (error) {
        alert('login information not valid');
      }
    });
  };


  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <p>Username:</p>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => handleChange(e, 'username')}
        />
        <p>Password:</p>
        <input
          type="text"
          placeholder="password"
          onChange={(e) => handleChange(e, 'password')}
        />
        <p>Email:</p>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => handleChange(e, 'email')}
        />

        {/* <button Home type='submit' onClick={(e) => handleLogin(e) && handleDashboard(e)} > */}

        <button
          type="submit"
        >
          Login
        </button>
        <span>
          Dont have an account? <Link to="/signup">Signup</Link>
        </span>
        {error ? <span>{error}</span> : null}
      </form>
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

//// {authorize ? <Navigate to={`/home/${userId}`} /> : null}
export default Login;
