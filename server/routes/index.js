// import necesary module
import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import users from '../controllers/users';
import checkAdmin from '../middlewares/checkAdmin';

const router = express.Router();

// API index endpoint
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-books API',
}));

// Endpoint to get all borrow requests
router.get(
  '/borrowrequests',
  verifyToken,
  checkAdmin,
  users.getBorrowRequests,
);

// Endpoint to get all return requests
router.get(
  '/returnrequests',
  verifyToken,
  checkAdmin,
  users.getReturnRequests,
);

export default router;
