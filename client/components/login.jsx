import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const navigateToHome = () => {
    navigate('/home');
  };

  // hook for storing state based on users login in for inputs
  const [inputData, setInputData] = useState(loginInputs);

  // const handleLogin = (e) => {
  //   try {
  //     e.preventDefault();
  //     fetch('/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //         email,
  //       }),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((response) => {
  //         console.log('this is username and password', username, password);
  //         console.log(response, 'response');
  //         setUserId(response.id);
  //         localStorage.setItem('token', response.token);
  //         if (response.token) {
  //           setAuthorize(true);
  //         }
  //         navigate(`/home/${response.id}`);
  //       });
  //   } catch (error) {
  //     setError(error.message.err);
  //     // window.alert(error.message.err);
  //     console.log(error.message, 'error from login in');
  //   }
  //   // setAuthorize((preState) => {
  //   //   return !preState;
  //   // });
  // };

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

  // const handleHome = (e) => {
  //   e.preventDefault();
  //   if (authorize) {
  //     navigate(`/home/${userId}`);
  //   }
  // };

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
          // value={inputData.username}
          // onChange={(e) => handleChange(e.target.value, 'username')}
          // onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password:</p>
        <input
          type='text'
          placeholder='password'
          // value={inputData.password}
          onChange={(e) => handleChange(e, 'password')}
          // onChange={(e) => handleChange(e.target.value, 'password')}
          // onChange={(e) => setPassword(e.target.value)}
        />

        <p>Email:</p>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => handleChange(e, 'email')}
          // value={inputData.email}
          // onChange={(e) => handleChange(e.target.value, 'email')}
          // onChange={(e) => setEmail(e.target.value)}
        />

        {/* <button Home type='submit' onClick={(e) => handleLogin(e) && handleDashboard(e)} > */}

        <div>
          <button
            className='login-button'
            type='submit'
            onClick={navigateToHome}
            // onClick={(e) => handleSubmit(e)}
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
