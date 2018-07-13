import axios from 'axios';
import {
  FETCHING_RETURN_REQUESTS,
  RETURN_REQUESTS_SUCCESS,
  RETURN_REQUESTS_FAILURE,
  HANDLING_RETURN_REQUEST,
  HANDLE_RETURN_REQUEST_SUCCESS,
  HANDLE_RETURN_REQUEST_FAILURE,
} from './types';
import checkError from '../helpers/checkError';
import setHeader from '../helpers/setHeader';
import { apiURL } from './signUp';
import Notify from '../helpers/Notify';

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
      const errorMessage = checkError(error);
      dispatch(returnRequestsFailure(errorMessage));
    });
};

const handlingReturnRequest = () => ({
  type: HANDLING_RETURN_REQUEST,
});

const handleReturnRequestSuccess = (status, requestId) => ({
  type: HANDLE_RETURN_REQUEST_SUCCESS,
  status,
  requestId,
});

const handleReturnRequestFailure = error => ({
  type: HANDLE_RETURN_REQUEST_FAILURE,
  error,
});

export const handleReturnRequest =
  (status, userId, bookId, requestId) => (dispatch) => {
    dispatch(handlingReturnRequest());
    setHeader();
    return axios.put(`${apiURL}/users/${userId}/return/${bookId}`, status)
      .then((response) => {
        dispatch(handleReturnRequestSuccess(
          response.data.status,
          requestId,
        ));
      })
      .catch((error) => {
        const errorMessage = checkError(error);
        dispatch(handleReturnRequestFailure(errorMessage));
        Notify.notifyError(`Failed to handle request. ${errorMessage}`);
      });
  };
