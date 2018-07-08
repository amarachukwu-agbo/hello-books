import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import {
  addBook,
  getMostUpvotedBooks,
  getBooks,
  editBook,
  deleteBook,
  searchBooks,
} from '../../actions/books';

describe('Books actions', () => {
  const mockStore = configureStore([thunk]);
  const { books } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it(`dispatches GET_BOOKS_REQUEST and
    GET_BOOKS_SUCCESS when fetching books`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: books.booksDataResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_BOOKS_REQUEST,
    }, {
      type: actionTypes.GET_BOOKS_SUCCESS,
      books: books.booksDataResponse.books,
      pagination: books.booksDataResponse.pagination,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBooks(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_BOOKS_REQUEST and
    GET_BOOKS_FAILURE when there is an error fetching books`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: books.booksErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_BOOKS_REQUEST,
    }, {
      type: actionTypes.GET_BOOKS_FAILURE,
      error: books.booksErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBooks())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches ADDING_BOOK and
    ADD_BOOK_SUCCESS when adding a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.addBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.ADDING_BOOK,
    }, {
      type: actionTypes.ADD_BOOK_SUCCESS,
      book: books.addBookResponse.bookEntry,
    },
    {
      payload: {
        args: ['/admin'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    }];
    const store = mockStore({});
    return store.dispatch(addBook(books.addBookRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches ADDING_BOOK and
    ADD_BOOK_FAILURE when there is an error adding a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.addBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.ADDING_BOOK,
    }, {
      type: actionTypes.ADD_BOOK_FAILURE,
      error: books.addBookErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(addBook(books.addBookRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches SEARCHING_BOOKS and
    SEARCH_BOOKS_SUCCESS when searching for a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.searchBooksResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.SEARCHING_BOOKS,
    }, {
      type: actionTypes.SEARCH_BOOKS_SUCCESS,
      books: books.searchBooksResponse.books,
      pagination: books.searchBooksResponse.pagination,
    },
    {
      payload: {
        args: ['/books'],
        method: 'push',
      },
      type: '@@router/CALL_HISTORY_METHOD',
    }];
    const store = mockStore({});
    return store.dispatch(searchBooks('title', 'A new book'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches SEARCHING_BOOKS and
    SEARCH_BOOK_FAILURE when searching for a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: books.searchBooksErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.SEARCHING_BOOKS,
    }, {
      type: actionTypes.SEARCH_BOOKS_FAILURE,
      error: books.searchBooksErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(searchBooks('title', 'Unavailable'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches EDIT_BOOK_REQUEST and
    EDIT_BOOK_SUCCESS when editing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.editBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.EDIT_BOOK_REQUEST,
    }, {
      type: actionTypes.EDIT_BOOK_SUCCESS,
      book: books.editBookResponse.updatedBook,
      bookId: books.editBookResponse.updatedBook.id,
    }];
    const store = mockStore({});
    return store.dispatch(editBook(97, books.editBookRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches EDIT_BOOK_REQUEST and
    EDIT_BOOK_FAILURE when editing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: books.editBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.EDIT_BOOK_REQUEST,
    }, {
      type: actionTypes.EDIT_BOOK_FAILURE,
      error: books.editBookErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(editBook(97, {}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches DELETE_BOOK_REQUEST and
    DELETE_BOOK_SUCCESS when deleting a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 204,
      });
    });
    const expectedActions = [{
      type: actionTypes.DELETE_BOOK_REQUEST,
    }, {
      type: actionTypes.DELETE_BOOK_SUCCESS,
      bookId: 97,
    }];
    const store = mockStore({});
    return store.dispatch(deleteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches DELETE_BOOK_REQUEST and
    DELETE_BOOK_FAILURE when editing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: books.deleteBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.DELETE_BOOK_REQUEST,
    }, {
      type: actionTypes.DELETE_BOOK_FAILURE,
      deleteError: books.deleteBookErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(deleteBook(970))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches GET_UPVOTED_BOOKS_REQUEST and
    GET_UPVOTED_BOOKS_SUCCESS when getting most upvoted books`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: books.upvotedBooksResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_UPVOTED_BOOKS_REQUEST,
    }, {
      type: actionTypes.GET_UPVOTED_BOOKS_SUCCESS,
      books: books.upvotedBooksResponse.books,
      pagination: books.upvotedBooksResponse.pagination,
    }];
    const store = mockStore({});
    return store.dispatch(getMostUpvotedBooks(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_UPVOTED_BOOKS_REQUEST and
    GET_UPVOTED_BOOKS_FAILURE when getting most upvoted books`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: books.upvotedBooksErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_UPVOTED_BOOKS_REQUEST,
    }, {
      type: actionTypes.GET_UPVOTED_BOOKS_FAILURE,
      error: books.upvotedBooksErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getMostUpvotedBooks(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
