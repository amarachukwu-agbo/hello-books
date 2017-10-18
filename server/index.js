import express from 'express';
import jsonfile from 'jsonfile';
import bodyParser from 'body-parser';
import User from './models/User';
import Book from './models/Book';
// import fs from 'fs';
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure server to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/api/books', (req, res) => {
  jsonfile.readFile('./data/books.json', (err, data) => {
    if (err) console.log(err);
    res.json(data.books);
  });
});

app.post('/api/books', (req, res) => {
  console.log(req.body);
  const newBook = new Book();
  const result = newBook.addBook(req.body.id, req.body.title, req.body.author, req.body.description, req.body.imageURL, req.body.subject, req.body.quantity);
  console.log(result);
  res.json(result);
});

app.put('/api/books/:bookId', (req, res) => {
  const newBook = new Book();
  const result = newBook.updateBook(req.params.bookId, req.body.title, req.body.author, req.body.description, req.body.imageURL, req.body.subject, req.body.quantity);
  res.json(result);
});

app.put('/api/users/upvote/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.upvoteBook(req.params.bookId);
  res.json(result);
});

app.put('/api/users/downvote/:bookId', (req, res) => {
  const newUser = new User();
  const result = newUser.downvoteBook(req.params.bookId);
  res.json(result);
});

app.get('/api/books?sort=upvotes&order=desc', (req, res) => {
  const data = jsonfile.readFileSync('./data/books.json');
  const filteredArray = data.books.filter(book => book.upvotes !== null);
  res.json(filteredArray);
});





