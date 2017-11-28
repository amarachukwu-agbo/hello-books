// import necessary modules
import express from 'express';

const router = express.Router();

// Specify routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/bookdetails', (req, res) => {
  res.render('bookdetails');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/addbook', (req, res) => {
  res.render('addbook');
});

router.get('/borrow', (req, res) => {
  res.render('borrow');
});

router.get('/borrowrequests', (req, res) => {
  res.render('borrowrequests');
});

router.get('/returnrequests', (req, res) => {
  res.render('returnrequests');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/returnbook', (req, res) => {
  res.render('returnbook');
});

router.get('/favorites', (req, res) => {
  res.render('favorites');
});


export default router;
