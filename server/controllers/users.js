// import necessary modules
import User from '../module/User';

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

  authenticateUser(req, res) {
    // Validate email and password fields
    if (!req.body.email) return res.status(400).json({ msg: 'Email field required' });
    if (!req.body.password) return res.status(400).json({ msg: 'Password field required' });
    User.logIn(req, res);
  },

  upVote(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.upvoteBook(req, res);
  },

  downVote(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.downvoteBook(req, res);
  },

  favoriteBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.favoriteBook(req, res);
  },

  reviewBook(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.reviewBook(req, res);
  },

  getFavoriteBooks(req, res) {
    // Validate user's token
    if (req.decoded.id !== req.params.userId) return res.status(401).json({ msg: 'Unauthorized User' });
    User.getFavoriteBooks(req, res);
  },

  sortBooksWithUpvotes(req, res) {
    if (req.params.sort === 'upvotes' && req.params.order === 'desc') {
      User.sortBooksWithUpvotes(req, res);
    }
  },

  getAllBooks(req, res) {
    User.getAllBooks(req, res);
  },

  getBook(req, res) {
    User.getBook(req, res);
  },

};

export default userControllers;
