import axios from 'axios';

const API_URL = '/';
const signup = (  username,
  firstname,
  lastname,
  password,
  email,) => {
  return axios
    .post(API_URL + 'signup', {
      username,
      firstname,
      lastname,
      password,
      email,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('token', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const authServices = {
  signup,
};

export default authServices;
