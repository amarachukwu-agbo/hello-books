import axios from 'axios';
import { push } from 'react-router-redux';
import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from './types';
import { apiURL } from './signUp';
import setUser from '../helpers/setUser';
import checkError from '../helpers/checkError';
import Notify from '../helpers/Notify';

const loggingIn = () => ({
  type: LOGGING_IN,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = () => ({
  type: LOGIN_FAILURE,
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
      dispatch(push('/'));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      Notify.notifyError(`Login Failed. ${errorMessage}`);
      dispatch(loginFailure());
    });
};

export const logOut = () => (dispatch) => {
  dispatch(logOutUser());
  dispatch(push('/'));
  Notify.notifySuccess('You successfully logged out');
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
};

