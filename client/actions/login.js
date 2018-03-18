import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import { apiURL } from './userSignUp';

const loggingIn = () => ({
  type: LOGGING_IN,
});

const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

const loginUser = user => (dispatch) => {
  dispatch(loggingIn());
  return axios.post(`${apiURL}/users/login`, user)
    .then((response) => {
      localStorage.setItem('userToken', response.data.token);
      dispatch(loginSuccess(response.data.token));
      setTimeout(() => {
        dispatch(push('/'));
      }, 2000);
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        if (error.response.status === 401) {
          errorMessage = 'Incorrect email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found';
        } else {
          errorMessage = 'An error occured';
        }
        dispatch(loginFailure(errorMessage));
      } else {
        dispatch(loginFailure(error.message));
      }
    });
};

export default loginUser;

