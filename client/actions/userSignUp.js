import axios from 'axios';
import { push } from 'react-router-redux';
import { SIGN_UP_SUCCESS, SIGNING_UP, SIGN_UP_FAILURE } from './types';

const apiURL = 'https://hellobooksv2.herokuapp.com/api/v1/users/signup';

export const signUpSuccess = (user) => {
    return {
        type: SIGN_UP_SUCCESS,
        user,
    }
}

export const signUpFailure = (error) => {
    return {
        type: SIGN_UP_FAILURE,
        error,
    }
}

export const signingUp = () => {
    return {
        type: SIGNING_UP,
    }
}

export const signUp = (user) => {
    return dispatch => {
        dispatch(signingUp());
        return axios.post(apiURL, user)
            .then(response => {
                console.log(response);
                dispatch(signUpSuccess(response));
                localStorage.setItem('userToken', response.data.token);
                dispatch(push('/'));
            })
            .catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    dispatch(signUpFailure(error.response.data.error));
                } else {
                    console.log(error);
                    dispatch(signUpFailure(error.message));
                }
            });   
    }
}