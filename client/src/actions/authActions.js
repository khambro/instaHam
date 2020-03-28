import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch(
        {
          type: GET_ERRORS,
          payload: err.response.data
        }
      ));
}

//Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localstorage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);

      //Set token to authheader
      setAuthToken(token);

      //Decode token to get the user data
      var decoded = jwt_decode(token);
      //Set current user - redux
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}