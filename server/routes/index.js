// import necesary module
import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import users from '../controllers/users';

const router = express.Router();

// API index endpoint
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-books API',
}));

router.get('/borrowrequests', verifyToken, users.getBorrowRequests);
router.get('/returnrequests', verifyToken, users.getReturnRequests);

export default router;
