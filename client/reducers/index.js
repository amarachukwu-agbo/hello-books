import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './userSignUp';

const rootReducer = combineReducers({
    form: formReducer,
    auth,
    routing: routerReducer
});

export default rootReducer;