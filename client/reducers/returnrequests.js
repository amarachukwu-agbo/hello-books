import {
  FETCHING_RETURN_REQUESTS,
  RETURN_REQUESTS_SUCCESS,
  RETURN_REQUESTS_FAILURE,
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
    default: {
      return state;
    }
  }
};

export default returnRequests;

