import axios from 'axios';
import { push } from 'react-router-redux';
import { SIGN_UP_SUCCESS, SIGNING_UP, SIGN_UP_FAILURE } from './types';

export const apiURL = 'https://hellobooksv2.herokuapp.com/api/v1';

export const signUpSuccess = user => ({
  type: SIGN_UP_SUCCESS,
  user,
});

export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  error,
});

export const signingUp = () => ({
  type: SIGNING_UP,
});

export const signUp = user => (dispatch) => {
  dispatch(signingUp());
  return axios.post(`${apiURL}/users/signup`, user)
    .then((response) => {
      dispatch(signUpSuccess(response));
      localStorage.setItem('userToken', response.data.token);
      setTimeout(() => {
        dispatch(push('/login'));
      }, 2000);
    })
    .catch((error) => {
      if (error.response) {
        dispatch(signUpFailure(error.response.data.error));
      } else {
        dispatch(signUpFailure(error.message));
      }
    });
};
