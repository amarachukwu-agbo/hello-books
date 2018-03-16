import { SIGN_UP_USER, SIGN_UP_SUCCESS, SIGNING_UP, SIGN_UP_FAILURE } from '../actions/types';

const initialState = {
    isSigningUp: false,
    hasErrored: false,
    error: null,
    user: null,
    
};

const auth = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_UP_FAILURE:
            return {
                ...state,
                hasErrored: true,
                isSigningUp: false,
                error: action.error,
                user: null,
            }   
        case SIGNING_UP:
            return {
                ...state,
                isSigningUp: true,
                hasErrored: false,
                error: null,
                user: null,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                user: action.user,
            }
        default:
            return state;         
    }
}

export default auth;