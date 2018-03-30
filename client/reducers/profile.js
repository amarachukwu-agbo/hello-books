import { FETCHING_PROFILE, PROFILE_SUCCESS, PROFILE_FAILURE } from '../actions/types';

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
    default: {
      return state;
    }
  }
};

export default profile;
