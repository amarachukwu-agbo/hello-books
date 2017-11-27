// import necessary modules
import express from 'express';
import users from '../controllers/users';

const router = express.Router();
router.post('/signup', users.createUser);
router.post('/login', users.authenticateUser);

// Endpoint to for user to upvote a book
router.post('/book/:bookId/upvote', users.upVote);

export default router;
