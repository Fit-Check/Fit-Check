import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const Login = ({ userId, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const [error, setError] = useState('');
  // const [token, setToken] = useState('');

  // custom hook for handling login page inputs
  const loginInputs = {
    username,
    password,
    email,
  };

  // use navigate for navigation to login page
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  // hook for storing state based on users login in for inputs
  const [inputData, setInputData] = useState(loginInputs);

  // handleSubmit function for sending our login request to the backend

  const handleSubmit = (e) => {
    e.preventDefault();
    (async function userLogin() {
      try {
        await axios
          .post('/login', inputData)
          .then((res) => {
            setInputData(loginInputs);
            console.log('res.data in login: ', res.data);
            return res.data;
          })
          .then((data) => {
            localStorage.setItem('username', data.username);
            localStorage.setItem('user_id', data.user_id);
            return navigate('/home');
          });
      } catch (err) {
        alert('login information not valid');
      }
    });
  };

  // handleChange function for changing data state
  const handleChange = (e, inputId) => {
    return setInputData((prevState) => ({
      // prevState is all of the login input so spread out before using
      ...prevState,
      [inputId]: e.target.value,
    }));
  };

  // this useEffect is for storing in localStorage, can comment in later if needed
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div id='login'>
      <form onSubmit={handleSubmit}>
        <p>Username:</p>

        <input
          type='text'
          placeholder='username'
          onChange={(e) => handleChange(e, 'username')}
        />
        <p>Password:</p>
        <input
          type='text'
          placeholder='password'
          // value={inputData.password}
          onChange={(e) => handleChange(e, 'password')}
        />
        <p>Email:</p>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => handleChange(e, 'email')}
        />

        {/* <button Home type='submit' onClick={(e) => handleLogin(e) && handleDashboard(e)} > */}

        <div>
          <button
            className='login-button'
            type='submit'
            onClick={navigateToHome}
          >
            Login
          </button>
          <button className='sign-up-button'>
            <Link to='/signup'>Signup</Link>
          </button>
          <p className='no-account'>Dont have an account?</p>
        </div>
      </form>
    </div>
  );
};
export default Login;
