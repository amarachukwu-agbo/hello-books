// import necessary modules
import express from 'express';
import books from '../controllers/books';

const router = express.Router();

// Endpoint to add a book
router.post('/', books.createBook);

export default router;
