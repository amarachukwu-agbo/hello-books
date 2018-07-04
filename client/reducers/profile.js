import {
  FETCHING_PROFILE,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_FAILURE,
} from '../actions/types';

import Notify from '../helpers/Notify';

const initialState = {};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PROFILE: {
      return {
        ...state,
        isFetchingProfile: true,
        profile: null,
      };
    }
    case PROFILE_FAILURE: {
      return {
        ...state,
        isFetchingProfile: false,
        profileError: action.error,
      };
    }
    case PROFILE_SUCCESS: {
      return {
        ...state,
        isFetchingProfile: false,
        profile: action.profile,
      };
    }
    case RETURN_BOOK_REQUEST: {
      return {
        ...state,
        isSendingRequest: true,
      };
    }
    case RETURN_BOOK_FAILURE: {
      Notify.notifyError(`Error sending return request.${action.error}`);
      return {
        ...state,
        isSendingRequest: false,
        requestError: action.error,
      };
    }
    case RETURN_BOOK_SUCCESS: {
      Notify.notifySuccess('Your request to return book has been sent');
      return {
        ...state,
        isSendingRequest: false,
        profile: {
          ...state.profile,
          userReturnRequests: [
            ...state.profile.userReturnRequests, action.returnRequest,
          ],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default profile;
