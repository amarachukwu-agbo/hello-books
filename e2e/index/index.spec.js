/*eslint-disable*/
import {
  LoginValidationError,
  UserNotFoundError,
  PasswordMisMatchError,
  LoginSuccess,
  LogOut,
} from '../Login.spec';
import {
  SignUpValidationError,
  EmailExistsError,
} from '../SignUp.spec';
import {
  ViewBookError,
  ViewBook,
  UpvoteBook,
  DownvoteBook,
  UpvoteBookError,
  DownvoteBookError,
  BorrowBook,
  BorrowBookError,
  AddBookToFavorites,
  AddBookToFavoritesError,
  ReviewBook,
  ReviewBookError,
} from '../BookDetails.spec';
import {
  ViewBooks,
  SearchBooksValidationError,
  SearchBooksNotFound,
  SearchBooksSuccess,
  AdminBooksCatalog,
  AddBookError,
  AddBookValidationError,
  AddBookSuccess,
  EditBookValidationError,
  EditBookSuccess,
  DeleteBook,
} from '../Books.spec';
import {
BorrowRequests,
ReturnRequests,
AcceptBorrowRequest,
} from '../Requests.spec';
import { UserFavorites } from '../Favorites.spec';
import { UserProfile } from '../Profile.spec';
import {
  IndexPage,
  NotFoundPage,
} from '../IndexPage.spec';

module.exports = {
  'Index Page Test': browser => IndexPage(browser),
  'Users should see errors if there are errors when filling the sign up form':
    browser => SignUpValidationError(browser),
  
  'Users should see error if email already exists when signing up':
    browser => EmailExistsError(browser),
  
  'Users should see errors if there are errors when logging in':
    browser => LoginValidationError(browser),
  
  'Users should see not found error when logging in if they are not signed up':
    browser => UserNotFoundError(browser),
  
  'Users should see error when logging in if their password is wrong':
    browser => PasswordMisMatchError(browser),
  
  'Users should see be able to login into the application':
   browser => LoginSuccess(browser),
  
  'User should be able to see the books in the application':
    browser => ViewBooks(browser),
  
  'Users should see error if there is validation error while searching for a book':
    browser => SearchBooksValidationError(browser),
  
  'Users should see notification if book searched for was not found':
    browser => SearchBooksNotFound(browser),
  
  'User should be able to search for books in the application by subject, author, title':
    browser => SearchBooksSuccess(browser),
  
  'Users should see an error when they try to view a book that does not exist':
    browser => ViewBookError(browser),
  
  'Users should see be able to view a book in the application':
    browser => ViewBook(browser),
  
  'Users should see be able to upvote a book in the application':
    browser => UpvoteBook(browser),
  
  'Users should see an error when they try to upvote a book more than once':
    browser => UpvoteBookError(browser),
  
  'Users should see be able to downvote a book in the application':
    browser => DownvoteBook(browser),
  
  'Users should see an error when they try to downvote a book more than once':
    browser => DownvoteBookError(browser),
  
  'Users should be able to add a book to their favorites':
    browser => AddBookToFavorites(browser),
  
  'Users should see an error when they try to favorite a book already in their favorites':
    browser => AddBookToFavoritesError(browser),
  
  'Users should be able to review a book': browser => ReviewBook(browser),

  'Users should get an error when adding an empty review':
    browser => ReviewBookError(browser),
  
  'Users should be able to borrow a book': browser => BorrowBook(browser),

  'Users should see an error if the request to borrow a book has already been sent':
    browser => BorrowBookError(browser),

  'Users should be view their favorites': browser => UserFavorites(browser),

  'Users should be view their profile': browser => UserProfile(browser),

  'Users should be able to log out of the application': browser => LogOut(browser),

   'An authenticated admin should be able to view the books catalog on the Admin Dashboard':
    browser => AdminBooksCatalog(browser),

  'An authenticated admin should see errors if there are validation errors when adding a book':
  browser => AddBookValidationError(browser),

  'An authenticated admin should be able to add a book': browser => AddBookSuccess(browser),

  'An authenticated admin should see error when adding a book if book title  already exists':
    browser => AddBookError(browser),

  'An authenticated admin should see errors if there are validation errors when editing a book':
  browser => EditBookValidationError(browser),

  'An authenticated admin should be able to edit a book': browser => EditBookSuccess(browser),

  'An authenticated admin should be able to delete a book': browser => DeleteBook(browser),

  'An authenticated admin can view the borrow requests': browser => BorrowRequests(browser),

  'An authenticated admin can view the return requests': browser => ReturnRequests(browser),

  'An authenticated admin can accept a request to borrow a book': browser => AcceptBorrowRequest(browser),

  'Users should see a 404 page if a page is not found':
   browser => NotFoundPage(browser),
};

