// import Admin class
import Admin from '../module/Admin';

const bookControllers = {
  // Add a new book to database
  createBook(req, res) {
    // Check the role of user from decoded token
    // If 'User' return error else add book
    if (req.decoded.role !== 'Admin') return res.status(401).send({ msg: 'Unauthorized user' });
    Admin.addBook(req, res);
  },
};

export default bookControllers;
