import axios from 'axios';
import {
  FETCHING_RETURN_REQUESTS,
  RETURN_REQUESTS_SUCCESS,
  RETURN_REQUESTS_FAILURE,
} from './types';

import setHeader from '../helpers/setheader';
import { apiURL } from './userSignUp';

const fetchingreturnRequests = () => ({
  type: FETCHING_RETURN_REQUESTS,
});

const returnRequestsSuccess = returnRequests => ({
  type: RETURN_REQUESTS_SUCCESS,
  returnRequests,
});

const returnRequestsFailure = error => ({
  type: RETURN_REQUESTS_FAILURE,
  error,
});

const getReturnRequests = () => (dispatch) => {
  dispatch(fetchingreturnRequests());
  setHeader();
  return axios.get(`${apiURL}/returnrequests`)
    .then((response) => {
      console.log(response.data);
      dispatch(returnRequestsSuccess(response.data.requests));
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        errorMessage = error.response.msg;
        dispatch(returnRequestsFailure(errorMessage));
      } else {
        dispatch(returnRequestsFailure(error.message));
      }
    });
};

export default getReturnRequests;

