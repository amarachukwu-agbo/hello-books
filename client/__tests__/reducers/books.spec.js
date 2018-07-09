import { books, mostUpvotedBooks } from '../../reducers/books';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const booksMockData = mockData.books;

describe('Books reducer', () => {
  it('should return the initial state', () => {
    expect(books(undefined, {})).toEqual({});
  });

  it('should handle GET_BOOKS_REQUEST', () => {
    const action = {
      type: actionTypes.GET_BOOKS_REQUEST,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isFetching: true,
      error: null,
      books: null,
      searchError: null,
    });
  });

  it('should handle GET_BOOKS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_BOOKS_SUCCESS,
      books: booksMockData.booksDataResponse.books,
      pagination: booksMockData.booksDataResponse.pagination,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isFetching: false,
      books: booksMockData.booksDataResponse.books,
      pagination: booksMockData.booksDataResponse.pagination,
      error: null,
      searchResults: null,
    });
  });

  it('should handle GET_BOOKS_FAILURE', () => {
    const action = {
      type: actionTypes.GET_BOOKS_FAILURE,
      error: booksMockData.booksErrorResponse.error,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      error: booksMockData.booksErrorResponse.error,
      isFetching: false,
    });
  });

  it('should handle SEARCHING_BOOKS', () => {
    const action = {
      type: actionTypes.SEARCHING_BOOKS,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isSearching: true,
      searchError: null,
    });
  });

  it('should handle SEARCH_BOOKS_SUCCESS', () => {
    const action = {
      type: actionTypes.SEARCH_BOOKS_SUCCESS,
      books: booksMockData.searchBooksResponse.books,
      pagination: booksMockData.searchBooksResponse.pagination,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isSearching: false,
      searchError: null,
      books: null,
      searchResults: booksMockData.searchBooksResponse.books,
      pagination: booksMockData.searchBooksResponse.pagination,
    });
  });

  it('should handle SEARCH_BOOKS_FAILURE', () => {
    const action = {
      type: actionTypes.SEARCH_BOOKS_FAILURE,
      error: booksMockData.searchBooksErrorResponse.error,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isSearching: false,
      searchError: action.error,
    });
  });

  it('should handle ADDING_BOOK', () => {
    const action = {
      type: actionTypes.ADDING_BOOK,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isAdding: true,
    });
  });

  it('should handle ADD_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.ADD_BOOK_FAILURE,
      error: booksMockData.addBookErrorResponse.error,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isAdding: false,
    });
  });

  it('should handle ADD_BOOK_SUCCESS', () => {
    const action = {
      type: actionTypes.ADD_BOOK_SUCCESS,
    };

    const newState = books(initialState, action);

    expect(newState).toEqual({
      isAdding: false,
    });
  });

  it('should handle EDIT_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.EDIT_BOOK_REQUEST,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isEditing: true,
    });
  });

  it('should handle EDIT_BOOK_SUCCESS', () => {
    const previousState = booksMockData.booksPreviousState;
    const action = {
      type: actionTypes.EDIT_BOOK_SUCCESS,
      bookId: booksMockData.editBookResponse.updatedBook.id,
      book: booksMockData.editBookResponse.updatedBook,
    };
    const expectedBooks = {
      books: [
        {
          id: 95,
          title: 'Born a Crime',
          author: 'Trevor Noah',
          description: 'Attuned to the power of la',
          subject: 'Biography',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 20,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 92,
          title: 'A Place Called Freedom',
          author: 'Ken Follet',
          description: 'This lush novel, set ',
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 2,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        booksMockData.editBookResponse.updatedBook,
      ],
    };
    const newState = books(previousState, action);

    expect(newState).toEqual({
      isEditing: false,
      books: expectedBooks.books,
      pagination: booksMockData.booksPreviousState.pagination,
    });
  });

  it('should handle EDIT_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.EDIT_BOOK_FAILURE,
      error: booksMockData.editBookErrorResponse.error,
    };
    const newState = books(initialState, action);

    expect(newState).toEqual({
      isEditing: false,
    });
  });

  it('should handle DELETE_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.DELETE_BOOK_REQUEST,
    };
    const previousState = booksMockData.booksPreviousState;
    const newState = books(previousState, action);

    expect(newState).toEqual({
      isDeleting: true,
      books: booksMockData.booksPreviousState.books,
      pagination: booksMockData.booksPreviousState.pagination,
    });
  });

  it('should handle DELETE_BOOK_SUCCESS', () => {
    const action = {
      type: actionTypes.DELETE_BOOK_SUCCESS,
      bookId: 97,
    };
    const expectedBooks = {
      books: [
        {
          id: 95,
          title: 'Born a Crime',
          author: 'Trevor Noah',
          description: 'Attuned to the power of la',
          subject: 'Biography',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 20,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
        {
          id: 92,
          title: 'A Place Called Freedom',
          author: 'Ken Follet',
          description: 'This lush novel, set ',
          subject: 'Thriller',
          imageURL: 'https://images-na.ssl-image.jpg',
          quantity: 2,
          borrowCount: 0,
          favCount: 0,
          upvotes: 0,
          downvotes: 0,
          createdAt: '2018-05-10T03:11:52.181Z',
          updatedAt: '2018-05-10T03:11:52.181Z',
          bookReviews: [],
        },
      ],
    };
    const previousState = booksMockData.booksPreviousState;
    const newState = books(previousState, action);

    expect(newState).toEqual({
      isDeleting: false,
      books: expectedBooks.books,
      pagination: {
        pageCount: 1,
        pageSize: 3,
        currentPage: 1,
        dataCount: 2,
      },
    });
  });

  it('should handle DELETE_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.DELETE_BOOK_FAILURE,
      error: booksMockData.deleteBookErrorResponse.error,
    };
    const previousState = booksMockData.booksPreviousState;
    const newState = books(previousState, action);

    expect(newState).toEqual({
      isDeleting: false,
      books: booksMockData.booksPreviousState.books,
      pagination: booksMockData.booksPreviousState.pagination,
    });
  });

  describe('MostUpvotedBooks Reducer', () => {
    it('should return the initial state', () => {
      expect(mostUpvotedBooks(undefined, {})).toEqual({});
    });

    it('should handle GET_UPVOTED_BOOKS_REQUEST', () => {
      const action = {
        type: actionTypes.GET_UPVOTED_BOOKS_REQUEST,
      };
      const newState = mostUpvotedBooks(initialState, action);

      expect(newState).toEqual({
        isLoading: true,
        upvotedError: null,
        upvotedBooks: null,
      });
    });

    it('should handle GET_UPVOTED_BOOKS_SUCCESS', () => {
      const action = {
        type: actionTypes.GET_UPVOTED_BOOKS_SUCCESS,
        books: booksMockData.upvotedBooksResponse.books,
        pagination: booksMockData.upvotedBooksResponse.pagination,
      };
      const newState = mostUpvotedBooks(initialState, action);

      expect(newState).toEqual({
        isLoading: false,
        upvotedBooks: booksMockData.upvotedBooksResponse.books,
        upvotedBooksPagination: booksMockData.upvotedBooksResponse.pagination,
        upvotedError: null,
      });
    });

    it('should handle GET_UPVOTED_BOOKS_FAILURE', () => {
      const action = {
        type: actionTypes.GET_UPVOTED_BOOKS_FAILURE,
        error: booksMockData.upvotedBooksErrorResponse.error,
      };
      const newState = mostUpvotedBooks(initialState, action);

      expect(newState).toEqual({
        upvotedError: booksMockData.upvotedBooksErrorResponse.error,
        isLoading: false,
      });
    });
  });
});
