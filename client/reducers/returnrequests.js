import {
  FETCHING_RETURN_REQUESTS,
  RETURN_REQUESTS_SUCCESS,
  RETURN_REQUESTS_FAILURE,
  HANDLING_RETURN_REQUEST,
  HANDLE_RETURN_REQUEST_SUCCESS,
  HANDLE_RETURN_REQUEST_FAILURE,
}
  from '../actions/types';

const initialState = {};

const returnRequests = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_RETURN_REQUESTS: {
      return {
        ...state,
        isFetchingReturnRequests: true,
        returnRequests: null,
        returnRequestsError: null,
      };
    }
    case RETURN_REQUESTS_SUCCESS: {
      return {
        ...state,
        isFetchingReturnRequests: false,
        returnRequests: action.returnRequests,
        returnRequestsError: null,
      };
    }
    case RETURN_REQUESTS_FAILURE: {
      return {
        ...state,
        isFetchingReturnRequests: false,
        returnRequestsError: action.error,
      };
    }
    case HANDLING_RETURN_REQUEST: {
      return {
        ...state,
        isHandlingReturnRequest: true,
      };
    }
    case HANDLE_RETURN_REQUEST_SUCCESS: {
      return {
        ...state,
        returnRequests: [...state.returnRequests.slice(0, action.index),
          { ...state.returnRequests[action.index], status: action.status.split(' ')[1] },
          ...state.returnRequests.slice(action.index + 1)],
        isHandlingReturnRequest: false,
      };
    }
    case HANDLE_RETURN_REQUEST_FAILURE: {
      Materialize.toast(`Failed to handle request. ${action.error}`, 2000);
      return {
        ...state,
        isHandlingReturnRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default returnRequests;

