// import necessary modules
import express from 'express';
import users from '../controllers/users';
import verifyToken from '../controllers/auth/verifyToken';

const router = express.Router();
router.post('/signup', users.createUser);
router.post('/login', users.authenticateUser);

// Endpoint for user to upvote a book
router.post('/:userId/book/:bookId/upvote', verifyToken, users.upVote);
// Endpoint for user to downvote a book
router.post('/:userId/book/:bookId/downvote', verifyToken, users.downVote);
// Endpoint to update a book
router.post('/:userId/fav/:bookId', verifyToken, users.favoriteBook);

export default router;
