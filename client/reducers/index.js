import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './userSignUp';
import login from './login';
import book from './book';
import favorites from './favorites';
import profile from './profile';
import addBook from './addBook';
import { books, mostUpvotedBooks } from './books';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  login,
  books,
  book,
  addBook,
  mostUpvotedBooks,
  favorites,
  profile,
  routing: routerReducer,
});

export default rootReducer;
