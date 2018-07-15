import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from
  'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers/index';
import { loginSuccess } from '../actions/login';

const initialState = {};
export const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, middleware)),
);

const userToken = localStorage.getItem('userToken');
const userInfo = JSON.parse(localStorage.getItem('user'));

if (userToken && userInfo) {
  store.dispatch(loginSuccess(userInfo));
}

export default store;
