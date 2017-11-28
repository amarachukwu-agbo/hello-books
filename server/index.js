// import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import books from './routes/books';
import users from './routes/users';
import index from './routes/index';
import appRoutes from './routes/appRoutes';

// Load environment variables from .env file
dotenv.config();

// Create an express instance
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../templates/public')));
app.set('views', path.join(__dirname, '/../templates'));
app.set('view engine', 'ejs');

// Specify route handlers
app.use('/api/v1', index);
app.use('/api/v1/users', users);
app.use('/api/v1/books', books);
app.use('/', appRoutes);

// Configure server to listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
