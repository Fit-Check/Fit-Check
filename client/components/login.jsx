import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ userId, setUserId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authorize, setAuthorize] = useState(false);
  const [error, setError] = useState('');
  // const [token, setToken] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
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
          console.log('this is username and password', username, password);
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

  const handleHome = (e) => {
    e.preventDefault();
    if (authorize) {
      navigate(`/home/${userId}`);
    }
  };

  return (
    <div id='login'>
      <form onSubmit={handleLogin}>
        <p>Username:</p>
        <input
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password:</p>
        <input
          type='text'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Email:</p>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* <button Home type='submit' onClick={(e) => handleLogin(e) && handleDashboard(e)} > */}

        <button type='submit' onClick={(e) => handleLogin(e)}>
          Login
        </button>
        <span>
          Dont have an account? <Link to='/signup'>Signup</Link>
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
