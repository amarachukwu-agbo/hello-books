// import necessary modules
import express from 'express';
import users from '../controllers/users';

const router = express.Router();
router.post('/signup', users.createUser);
router.post('/login', users.authenticateUser);

// Endpoint for user to upvote a book
router.post('/book/:bookId/upvote', users.upVote);
// Endpoint for user to downvote a book
router.post('/book/:bookId/upvote', users.downVote);

export default router;
