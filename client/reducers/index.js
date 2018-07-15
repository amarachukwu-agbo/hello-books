import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import signUp from './signUp';
import login from './login';
import book from './book';
import favorites from './favorites';
import profile from './profile';
import borrowRequests from './borrowRequests';
import returnRequests from './returnRequests';
import { books, mostUpvotedBooks } from './books';

const rootReducer = combineReducers({
  form: formReducer,
  signUp,
  login,
  books,
  book,
  mostUpvotedBooks,
  favorites,
  borrowRequests,
  returnRequests,
  profile,
  routing: routerReducer,
});

export default rootReducer;
