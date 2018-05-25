// import necessary modules
import express from 'express';
import books from '../controllers/books';
import verifyToken from '../middlewares/verifyToken';
import verifyBook from '../middlewares/validation/book';
import validateParams from '../middlewares/validation/params';
import verifyUpdateBook from '../middlewares/validation/updateBook';
import validateReview from '../middlewares/validation/review';
import verifySearchBook from '../middlewares/validation/searchBook';
import verifyQuery from '../middlewares/validation/getBook';
import checkAdmin from '../middlewares/checkAdmin';
import { bookCheck, bookTitleCheck } from '../middlewares/checkBook';

const router = express.Router();

// Endpoint to add a book
router.post(
  '/',
  verifyToken,
  checkAdmin,
  verifyBook,
  bookTitleCheck,
  books.addBook,
);

// Endpoint to update a book
router.put(
  '/:bookId',
  verifyToken,
  checkAdmin,
  verifyUpdateBook,
  bookCheck,
  bookTitleCheck,
  books.updateBook,
);

// Endpoint to delete a book
router.delete(
  '/:bookId',
  verifyToken,
  checkAdmin,
  books.deleteBook,
);

// Endpoint to get book with most upvotes
router.get('/?sort=upvotes&order=desc', verifyQuery, books.getAllBooks);

// Endpoint to get all books
router.get('/', verifyQuery, books.getAllBooks);

// Endpoint to get a book
router.get('/:bookId', validateParams, bookCheck, books.getBook);

// Endpoint to upvote a book
router.post(
  '/:bookId/upvote',
  verifyToken,
  validateParams,
  bookCheck,
  books.voteBook,
);

// Endpoint to downvote a book
router.post(
  '/:bookId/downvote',
  verifyToken,
  validateParams,
  bookCheck,
  books.voteBook,
);

// Endpoint to favorite a book
router.post(
  '/:bookId/favorite',
  verifyToken,
  validateParams,
  bookCheck,
  books.favoriteBook,
);

// Endpoint to review a book
router.post(
  '/:bookId/review',
  verifyToken,
  validateReview,
  bookCheck,
  books.reviewBook,
);

// Endpoint to search for a book
router.post('/search', verifySearchBook, books.searchBooks);

export default router;
