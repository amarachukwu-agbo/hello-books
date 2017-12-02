// import necessary modules
import express from 'express';
import users from '../controllers/users';
import verifyToken from '../controllers/auth/verifyToken';
import verifyFields from '../controllers/validation/verifyFields';
import emailCheck from '../controllers/validation/email';
import loginCheck from '../controllers/validation/login';
import validateReviewSchema from '../controllers/validation/review';
import validateParamsSchema from '../controllers/validation/params';
import validateBorrowBookSchema from '../controllers/validation/borrowbook';
import validateReturnRequestSchema from '../controllers/validation/returnrequest';
import validateHandleRequestSchema from '../controllers/validation/handlerequest';


const router = express.Router();
// Endpoint for user to signup
router.post('/signup', verifyFields, emailCheck, users.createUser);
// Endpoint for user to signin
router.post('/login', loginCheck, users.authenticateUser);
// Endpoint for user to upvote a book
router.post('/:userId/book/:bookId/upvote', verifyToken, validateParamsSchema, users.upVote);
// Endpoint for user to downvote a book
router.post('/:userId/book/:bookId/downvote', verifyToken, validateParamsSchema, users.downVote);
// Endpoint to favorite a book
router.post('/:userId/fav/:bookId', verifyToken, validateParamsSchema, users.favoriteBook);
// Endpoint for user to review a book
router.post('/:userId/review/:bookId', verifyToken, validateReviewSchema, users.reviewBook);
// Endpoint for user to get favorite books
router.get('/:userId/favbooks', verifyToken, validateParamsSchema, users.getFavoriteBooks);
// Endpoint for user to borrow a book
router.post('/:userId/borrow/:bookId', verifyToken, validateBorrowBookSchema, users.sendBorrowRequest);
// Endpoint for Admin to handle borrow requests
router.put('/:userId/borrow/:bookId', verifyToken, validateHandleRequestSchema, users.handleBorrowRequest);
router.post('/:userId/return/:bookId', verifyToken, validateReturnRequestSchema, users.sendReturnRequest);
router.put('/:userId/return/:bookId', verifyToken, validateHandleRequestSchema, users.handleReturnRequest);

export default router;
