// import necessary modules
import User from '../module/User';
import Admin from '../module/Admin';

const userControllers = {
  // Method registers a new user to the database
  createUser(req, res) {
    // Validate fields
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.role ||
      !req.body.firstName ||
      !req.body.lastName
    ) return res.status(400).json({ msg: 'Some field missing' });
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
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.upvoteBook(req, res);
  },

  // Method lets user downvote book
  downVote(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.downvoteBook(req, res);
  },

  // Method lets user favorite book
  favoriteBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.favoriteBook(req, res);
  },

  // Method allows user post a review
  reviewBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.reviewBook(req, res);
  },

  // Method gets user's favorite books
  getFavoriteBooks(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
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
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.sendBorrowRequest(req, res);
  },

  // Method allows authenticated admin accept or reject borrow request
  handleBorrowRequest(req, res) {
    // Validate user as Admin
    if (req.decoded.role !== 'Admin') return res.status(401).json({ msg: 'Unauthorized user' });
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
    Admin.handleReturnRequest(req, res);
  },

};


export default userControllers;
