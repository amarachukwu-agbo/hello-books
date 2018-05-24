// import necessary modules
import express from 'express';
import users from '../controllers/users';
import verifyToken from '../middlewares/verifyToken';
import signupCheck from '../middlewares/validation/signup';
import emailCheck from '../middlewares/checkEmail';
import loginCheck from '../middlewares/validation/login';
import validateParams from '../middlewares/validation/params';
import validateBorrowBook from '../middlewares/validation/borrowbook';
import validateReturnRequest from '../middlewares/validation/returnrequest';
import validateHandleRequest from '../middlewares/validation/handlerequest';
import checkAdmin from '../middlewares/checkAdmin';
import checkUser from '../middlewares/checkUser';
import { bookCheck } from '../middlewares/checkBook';


const router = express.Router();
// Endpoint for user to signup
router.post('/signup', signupCheck, emailCheck, users.signUp);

// Endpoint for user to signin
router.post('/login', loginCheck, users.logIn);

// Endpoint for user to get favorite books
router.get(
  '/:userId/favbooks',
  verifyToken,
  checkUser,
  validateParams,
  users.getFavoriteBooks,
);

// Endpoint for user to borrow a book
router.post(
  '/:userId/borrow/:bookId',
  verifyToken,
  checkUser,
  validateBorrowBook,
  bookCheck,
  users.sendBorrowRequest,
);

// Endpoint for Admin to handle borrow requests
router.put(
  '/:userId/borrow/:bookId',
  verifyToken,
  checkAdmin,
  validateHandleRequest,
  users.handleBorrowRequest,
);

// Endpoint for user to return book
router.post(
  '/:userId/return/:bookId',
  verifyToken,
  checkUser,
  validateReturnRequest,
  users.sendReturnRequest,
);

// Endpoint for Admin to handle return requests
router.put(
  '/:userId/return/:bookId',
  verifyToken,
  checkAdmin,
  validateHandleRequest,
  users.handleReturnRequest,
);

// Endpoint to get user's profile
router.get('/:userId', verifyToken, checkUser, users.getUser);

export default router;
