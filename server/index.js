// import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import books from './routes/books';
import users from './routes/users';
import index from './routes/index';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', path.join(__dirname, '/../templates'));
app.set('view engine', 'ejs');

// Specify route handlers
app.use('/api/v1', index);
app.use('/api/v1/users', users);
app.use('/api/v1/books', books);


// Configure server to listen on port 8000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Specify routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/bookdetails', (req, res) => {
  res.render('bookdetails');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/addbook', (req, res) => {
  res.render('addbook');
});

app.get('/borrow', (req, res) => {
  res.render('borrow');
});

app.get('/borrowrequests', (req, res) => {
  res.render('borrowrequests');
});

app.get('/returnrequests', (req, res) => {
  res.render('returnrequests');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/returnbook', (req, res) => {
  res.render('returnbook');
});

app.get('/favorites', (req, res) => {
  res.render('favorites');
});

export default app;
