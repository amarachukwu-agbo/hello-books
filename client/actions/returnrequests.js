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

const returnRequestsSuccess = ({ requests, pagination }) => ({
  type: RETURN_REQUESTS_SUCCESS,
  requests,
  pagination,
});

const returnRequestsFailure = error => ({
  type: RETURN_REQUESTS_FAILURE,
  error,
});

export const getReturnRequests = page => (dispatch) => {
  dispatch(fetchingReturnRequests());
  setHeader();
  return axios.get(`${apiURL}/returnRequests?page=${page}`)
    .then((response) => {
      dispatch(returnRequestsSuccess(response.data));
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

export const handleReturnRequest =
  (status, userId, bookId, requestIndex) => (dispatch) => {
    dispatch(handlingReturnRequest());
    setHeader();
    return axios.put(`${apiURL}/users/${userId}/return/${bookId}`, status)
      .then((response) => {
        dispatch(handleReturnRequestSuccess(
          response.data.message,
          requestIndex,
        ));
      })
      .catch((error) => {
        if (error.response) {
          let errorMessage = '';
          errorMessage = error.response.data.error;
          dispatch(handleReturnRequestFailure(errorMessage));
        } else {
          dispatch(handleReturnRequestFailure(error.message));
        }
      });
  };
