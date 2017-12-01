// import necessary modules
import User from '../module/User';
import Admin from '../module/Admin';

const userControllers = {
  // Method registers a new user to the database
  createUser(req, res) {
    User.signUp(req, res);
  },

  // Method allows user log in
  authenticateUser(req, res) {
    // Validate email and password fields
    if (!req.body.email) return res.status(400).json({ msg: 'Email field required' });
    if (!req.body.password) return res.status(400).json({ msg: 'Password field required' });
    User.logIn(req, res);
  },

  // Method lets user upvote book
  upVote(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorised to upvote a book',
      });
    }
    User.upvoteBook(req, res);
  },

  // Method lets user downvote book
  downVote(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorized to downvote a book',
      });
    }
    User.downvoteBook(req, res);
  },

  // Method lets user favorite book
  favoriteBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorised to handle request',
      });
    }
    User.favoriteBook(req, res);
  },

  // Method allows user post a review
  reviewBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorised to review a book',
      });
    }
    if (req.body.review) {
      User.reviewBook(req, res);
    }
    return res.status(400).json({ msg: 'Review missing' });
  },

  // Method gets user's favorite books
  getFavoriteBooks(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorised to favorite a book',
      });
    }
    User.getFavoriteBooks(req, res);
  },

  // Method gets all books in database
  getAllBooks(req, res) {
    User.getAllBooks(req, res);
  },

  // Method gets a book in database
  getBook(req, res) {
    User.getBook(req, res);
  },

  // Method allows authenticated user borrow a book
  sendBorrowRequest(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) {
      return res.status(401).json({
        msg: 'You are not authorised to borrow book',
      });
    }
    if (req.body.reason && req.body.returnDate) {
      User.sendBorrowRequest(req, res);
    }
    return res.status(400).json({ msg: 'Some fields missing' });
  },

  // Method allows authenticated admin accept or reject borrow request
  handleBorrowRequest(req, res) {
    // Validate user as Admin
    if (req.decoded.role !== 'Admin') {
      return res.status(401).json({
        msg: 'You are not authorised to handle request',
      });
    }
    // Validate status field
    if (!req.body.status) return res.status(400).json({ msg: 'Status is missing' });
    if (req.body.status === 'Accepted' || req.body.status === 'Declined') {
      Admin.handleBorrowRequest(req, res);
      return;
    }
    return res.status(400).json({ msg: 'Invalid status' });
  },

  sendReturnRequest(req, res) {
    User.sendReturnRequest(req, res);
  },

  handleReturnRequest(req, res) {
    // Validate user as Admin
    if (req.decoded.role !== 'Admin') {
      return res.status(401).json({
        msg: 'You are not authorised to handle return request',
      });
    }
    // Validate status field
    if (!req.body.status) return res.status(400).json({ msg: 'Status is missing' });
    if (req.body.status === 'Accepted' || req.body.status === 'Declined') {
      Admin.handleReturnRequest(req, res);
    }
    return res.status(400).json({ msg: 'Invalid status' });
  },
};


export default userControllers;
