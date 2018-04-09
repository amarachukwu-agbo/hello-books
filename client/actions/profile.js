import axios from 'axios';
import { FETCHING_PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE } from './types';
import { apiURL } from './userSignUp';
import setHeader from '../helpers/setheader';

const fetchingProfile = () => ({
  type: FETCHING_PROFILE,
});

const profileSuccess = profile => ({
  type: PROFILE_SUCCESS,
  profile,
});

const profileFailure = error => ({
  type: PROFILE_FAILURE,
  error,
});

const getUserProfile = userId => (dispatch) => {
  dispatch(fetchingProfile());
  setHeader();
  return axios.get(`${apiURL}/users/${userId}`)
    .then((response) => {
      console.log(response.data);
      dispatch(profileSuccess(response.data));
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        errorMessage = error.response.msg;
        dispatch(profileFailure(errorMessage));
      } else {
        dispatch(profileFailure(error.message));
      }
    });
};

export default getUserProfile;

