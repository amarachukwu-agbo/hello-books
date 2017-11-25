// import necessary modules
import express from 'express';
import users from '../controllers/users';

const router = express.Router();
router.post('/signup', users.createUser);
router.post('/login', users.authenticateUser);

export default router;
