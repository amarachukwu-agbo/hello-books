// import necessary modules
import express from 'express';
import books from '../controllers/books';
import verifyToken from '../controllers/auth/verifyToken';

const router = express.Router();

// Endpoint to add a book
router.post('/', verifyToken, books.createBook);

export default router;
