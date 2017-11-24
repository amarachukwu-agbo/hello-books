// import necessary modules
import express from 'express';
import users from '../controllers/users';

const router = express.Router();
router.post('/', users.createUser);

export default router;
