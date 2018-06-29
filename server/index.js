// import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import books from './routes/books';
import users from './routes/users';
import index from './routes/index';
import swaggerDoc from '../swagger.json';
// Create an express instance
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up swagger-ui-express to serve API docs
app.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc),
);


// Specify route handlers
app.use('/api/v1', index);
app.use('/api/v1/users', users);
app.use('/api/v1/books', books);
app.use('/', express.static('client/dist'));
app.use('*', express.static('client/dist'));

// Configure server to listen on port 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
