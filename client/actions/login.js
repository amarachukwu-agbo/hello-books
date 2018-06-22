import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from './types';
import { apiURL } from './userSignUp';
import setUser from '../helpers/setuser';

const loggingIn = () => ({
  type: LOGGING_IN,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

const logOutUser = () => ({
  type: LOG_OUT,
});

export const loginUser = user => (dispatch) => {
  dispatch(loggingIn());
  return axios.post(`${apiURL}/users/login`, user)
    .then((response) => {
      setUser(response);
      dispatch(loginSuccess(response.data.user));
      setTimeout(() => {
        dispatch(push('/'));
      }, 3000);
    })
    .catch((error) => {
      if (error.response) {
        dispatch(loginFailure(error.response.data.error));
      } else {
        dispatch(loginFailure(error.message));
      }
    });
};

export const logOut = () => (dispatch) => {
  dispatch(logOutUser());
  dispatch(push('/'));
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
};

