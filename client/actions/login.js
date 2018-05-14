import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from './types';
import { apiURL } from './userSignUp';

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
      const userInfo = JSON.stringify(response.data.user);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('user', userInfo);
      dispatch(loginSuccess(response.data.user));
      if (response.data.user.role === 'Admin') {
        setTimeout(() => {
          dispatch(push('/admin'));
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(push('/'));
        }, 2000);
      }
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        if (error.response.status === 401) {
          errorMessage = 'Incorrect email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found';
        } else {
          console.log(error.response);
          errorMessage = 'An error occured';
        }
        dispatch(loginFailure(errorMessage));
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

