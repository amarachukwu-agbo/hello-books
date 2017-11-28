// import necessary modules
import express from 'express';
import books from '../controllers/books';
import users from '../controllers/users';
import verifyToken from '../controllers/auth/verifyToken';


const router = express.Router();

// Endpoint to add a book
router.post('/', verifyToken, books.createBook);

// Endpoint to update a book
router.put('/:bookId', verifyToken, books.updateBook);

// Endpoint to get book with most upvotes
router.get('/?sort=upvotes&order=desc', users.sortBooksWithUpvotes);

// Endpoint to get all books
router.get('/', users.getAllBooks);

// Endpoint to get a book
router.get('/:bookId', users.getBook);

export default router;
