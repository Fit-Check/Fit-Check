import axios from "axios";


const API_URL = "/auth"
const signup = ( firstname,lastname,username,email,password,location,) => {
    return axios
    .post(API_URL + "/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
        location,

    })
    .then((response)=>{
        if (response.data.accessToken) {
            localStorage.setItem("token", JSON.stringify(response.data));
          }
    
          return response.data;
    });
};

const authServices = {
    signup,
}

export default authServices;