import axios from 'axios';
import {
  FETCHING_RETURN_REQUESTS,
  RETURN_REQUESTS_SUCCESS,
  RETURN_REQUESTS_FAILURE,
  HANDLING_RETURN_REQUEST,
  HANDLE_RETURN_REQUEST_SUCCESS,
  HANDLE_RETURN_REQUEST_FAILURE,
} from './types';

import setHeader from '../helpers/setheader';
import { apiURL } from './userSignUp';

const fetchingReturnRequests = () => ({
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

export const getReturnRequests = () => (dispatch) => {
  dispatch(fetchingReturnRequests());
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

const handlingReturnRequest = () => ({
  type: HANDLING_RETURN_REQUEST,
});

const handleReturnRequestSuccess = (status, index) => ({
  type: HANDLE_RETURN_REQUEST_SUCCESS,
  status,
  index,
});

const handleReturnRequestFailure = error => ({
  type: HANDLE_RETURN_REQUEST_FAILURE,
  error,
});

export const handleReturnRequest = (status, userId, bookId, requestIndex) => (dispatch) => {
  dispatch(handlingReturnRequest());
  setHeader();
  return axios.put(`${apiURL}/users/${userId}/return/${bookId}`, status)
    .then((response) => {
      console.log(response.data);
      dispatch(handleReturnRequestSuccess(response.data.msg, requestIndex));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        let errorMessage = '';
        errorMessage = error.response.msg;
        dispatch(handleReturnRequestFailure(errorMessage));
      } else {
        dispatch(handleReturnRequestFailure(error.message));
      }
    });
};
