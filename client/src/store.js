import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const initialState = {};
export const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, middleware)));


export default store;