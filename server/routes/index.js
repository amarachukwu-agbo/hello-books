// import necesary module
import express from 'express';

const router = express.Router();

// API index endpoint
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-books API',
}));

export default router;
