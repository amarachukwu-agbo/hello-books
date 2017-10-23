// import necessary modules
import express from 'express';
import jsonfile from 'jsonfile';
import bodyParser from 'body-parser';
import User from './models/User';
import Admin from './models/Admin';

const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure server to listen on port 3000
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// API endpoint to get all books
app.get('/api/books', (req, res) => {
  jsonfile.readFile('./data/books.json', (err, data) => {
    if (err) console.log(err);
    res.json(data.books);
  });
});

// API endpoint to add a book
app.post('/api/books', (req, res) => {
  const newAdmin = new Admin();
  const result = newAdmin.addBook(
    req.body.id,
    req.body.title,
    req.body.author,
    req.body.description,
    req.body.imageURL,
    req.body.subject,
    req.body.quantity,
  );
  res.json(result);
});

/* API endpoint to modify a book
   @params bookId is the book's Id
*/
app.put('/api/books/:bookId', (req, res) => {
  const newAdmin = new Admin();
  const result = newAdmin.updateBook(
    req.params.bookId,
    req.body.title,
    req.body.author,
    req.body.description,
    req.body.imageURL,
    req.body.subject,
    req.body.quantity,
  );
  res.json(result);
});

/* API endpoint for a user to upvote a book
   @params bookId is the book's Id
*/
app.post('/api/users/upvote/books/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.upvoteBook(req.params.bookId);
  res.json(result);
});

/* API endpoint for a user to downvote a book
   @params bookId is the book's Id
*/
app.post('/api/users/downvote/books/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.downvoteBook(req.params.bookId);
  res.json(result);
});

/* API endpoint to get books with most upvotes. Fix Blocker
*/
app.get('/api/books?sort=upvotes&order=desc', (req, res) => {
  res.json(port);
});

/* API endpoint for a user to add a book to favorites
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.post('/api/users/:userId/fav/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.favoriteBook(req.params.userId, req.params.bookId);
  res.json(result);
});

/* API endpoint to get a user's favorite books
   @params userId is the user's Id
*/
app.get('/api/users/:userId/favbooks', (req, res) => {
  const newUser = new User();
  const result = newUser.getFavoriteBooks(req.params.userId);
  res.json(result);
});

/* API endpoint for a user to review a book
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.post('/api/users/:userId/review/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.reviewBook(req.params.userId, req.params.bookId, req.body.review);
  res.json(result);
});

/* API endpoint for a user to send a borrow request
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.post('/api/users/:userId/borrow/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.sendBorrowRequest(
    req.params.userId,
    req.params.bookId,
    req.body.reason,
    req.body.returnDate,
    req.body.comments,
  );
  res.json(result);
});

/* API endpoint for a user to send a return request
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.post('/api/users/:userId/return/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.sendReturnRequest(req.params.userId, req.params.bookId, req.body.comments);
  res.json(result);
});

/* API endpoint for an admin to accept or decline a borrow request
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.put('/api/users/:userId/borrow/:bookId', (req, res) => {
  const newAdmin = new Admin();
  const result = newAdmin.handleBorrowRequest(
    req.params.userId,
    req.params.bookId,
    req.body.action,
  );
  res.json(result);
});

/* API endpoint for an admin to accept or decline a return request
   @params userId is the user's Id
   @params bookId is the book's Id
*/
app.put('/api/users/:userId/return/:bookId', (req, res) => {
  const newAdmin = new Admin();
  const result = newAdmin.handleReturnRequest(
    req.params.userId,
    req.params.bookId,
    req.body.action,
  );
  res.json(result);
});

export default app;
