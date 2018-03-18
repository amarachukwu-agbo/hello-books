import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './userSignUp';
import login from './login';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  login,
  routing: routerReducer,
});

export default rootReducer;
