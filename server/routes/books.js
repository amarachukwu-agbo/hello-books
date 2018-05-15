// import necessary modules
import express from 'express';
import books from '../controllers/books';
import verifyToken from '../middlewares/verifyToken';
import verifyBook from '../middlewares/validation/book';
import validateParams from '../middlewares/validation/params';
import verifyUpdateBook from '../middlewares/validation/updateBook';
import verifySearchBook from '../middlewares/validation/searchBook';
import verifyQuery from '../middlewares/validation/getBook';
import checkAdmin from '../middlewares/checkAdmin';

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

// Endpoint to delete a book
router.post(
  '/remove/:bookId',
  verifyToken,
  checkAdmin,
  books.deleteBook,
);

// Endpoint to get book with most upvotes
router.get('/?sort=upvotes&order=desc', verifyQuery, books.getAllBooks);

// Endpoint to get all books
router.get('/', verifyQuery, books.getAllBooks);

// Endpoint to get a book
router.get('/:bookId', validateParams, books.getBook);

// Endpoint to search for a book
router.post('/search', verifySearchBook, books.searchBooks);

export default router;
