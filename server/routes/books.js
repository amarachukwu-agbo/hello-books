// import necessary modules
import express from 'express';
import books from '../controllers/books';
import verifyToken from '../middlewares/verifyToken';
import verifyBook from '../middlewares/validation/book';
import validateParams from '../middlewares/validation/params';
import validateReview from '../middlewares/validation/review';
import verifyUpdateBook from '../middlewares/validation/updateBook';
import verifySearchBook from '../middlewares/validation/searchBook';
import verifyQuery from '../middlewares/validation/getBook';
import checkAdmin from '../middlewares/checkAdmin';
import checkUser from '../middlewares/checkUser';

const router = express.Router();

// Endpoint to add a book
router.post(
  '/',
  verifyToken,
  checkAdmin,
  verifyBook,
  books.addBook,
);

// Endpoint to update a book
router.put(
  '/:bookId',
  verifyToken,
  checkAdmin,
  verifyUpdateBook,
  books.updateBook,
);

// Endpoint to get book with most upvotes
router.get('/?sort=upvotes&order=desc', verifyQuery, books.getAllBooks);

// Endpoint to get all books
router.get('/', verifyQuery, books.getAllBooks);

// Endpoint to get a book
router.get('/:bookId', validateParams, books.getBook);

// Endpoint to upvote a book
router.post(
  '/:userId/book/:bookId/upvote',
  verifyToken,
  checkUser,
  validateParams,
  books.upvoteBook,
);

// Endpoint to downvote a book
router.post(
  '/:userId/book/:bookId/downvote',
  verifyToken,
  checkUser,
  validateParams,
  books.downvoteBook,
);

// Endpoint to favorite a book
router.post(
  '/:userId/fav/:bookId',
  verifyToken,
  checkUser,
  validateParams,
  books.favoriteBook,
);

// Endpoint to review a book
router.post(
  '/:userId/review/:bookId',
  verifyToken,
  checkUser,
  validateReview,
  books.reviewBook,
);

// Endpoint to delete a book
router.post(
  '/remove/:bookId',
  verifyToken,
  checkAdmin,
  books.deleteBook,
);

// Endpoint to search for a book
router.post('/search', verifySearchBook, books.searchBooks);

export default router;
