import { ADDING_BOOK, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE } from '../actions/types';

const initialState = {};

const addBook = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_BOOK: {
      return {
        ...state,
        isAdding: true,
        addBookError: null,
      };
    }
    case ADD_BOOK_FAILURE: {
      Materialize.toast(`Error adding book. ${action.error}`, 2000);
      return {
        ...state,
        isAdding: false,
        addBookError: action.error,
      };
    }
    case ADD_BOOK_SUCCESS: {
      Materialize.toast('Book has been added', 2000);
      return {
        ...state,
        isAdding: false,
        book: action.book,
        addBookError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default addBook;
