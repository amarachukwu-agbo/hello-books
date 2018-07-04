import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import propTypes from 'prop-types';
import checkAuthentication from '../../helpers/auth';
import BorrowBookForm from './Form/BorrowBookForm.jsx';

/**
 * @description - container component for details of a book
 *
 * @class BooksDetails
 *
 * @extends {React.Component}
 */
class BookDetails extends Component {
  /**
   * @constructor create an instance of the BooksDetails component
   *
   * @param {object} props properties for the BooksDetails component
   */
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.favoriteBook = this.favoriteBook.bind(this);
    this.upvoteBook = this.upvoteBook.bind(this);
    this.downvoteBook = this.downvoteBook.bind(this);
  }

  /**
   * @method favoriteBook
   * @description add a book to favorite
   *
   * @returns {void}
   */
  favoriteBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.favoriteBook(this.props.user.id, this.props.book.id);
  }

  /**
   * @method upvoteBook
   * @description upvote a book
   *
   * @returns {void}
   */
  upvoteBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.upvoteBook(this.props.user.id, this.props.book.id);
  }

  /**
   * @method downvoteBook
   * @description downvote a book
   *
   * @returns {void}
   */
  downvoteBook() {
    checkAuthentication(this.props.isAuthenticated);
    this.props.downvoteBook(this.props.user.id, this.props.book.id);
  }

  render() {
    const { book } = this.props;

    return (
      <div className="row card-panel">
        <Modal id="modal" actions={null}>
            <div className="container">
                    <BorrowBookForm { ...this.props }/>
            </div>
        </Modal>
        <div className="row center">
          <h4 className="book-details-header">{book.title}</h4>
        </div>
        <div className='divider'></div><br />
        <div className="row">
          <div className="col s12 m4 l4" >
            <img src={book.imageURL} className="responsive-img book-image" />
          </div>
          <div className="col s12 m8 l8">
            <p className="black-text">
              <strong>Author: </strong> <span> {book.author} </span>
            </p>
            <div className='divider'></div>
            <p className="bold black-text">
              <strong>Category: </strong><span> {book.subject} </span>
            </p>
            <div className='divider'></div>
            <p className="bold black-text">
              <strong>Copies Borrowed: </strong>
              <span> {book.borrowCount} </span>
            </p>
            <div className='divider'></div>
            <p className="bold black-text">
              <strong>Copies Available: </strong>
              <span> {book.quantity} </span>
            </p>
            <div className='divider'></div>
            <p className="bold black-text">
              <strong>Description: </strong>
              <span> {book.description} </span></p>
            <div className='divider'></div><br />
            <div>
              <button className="btn btn-small primary-button"
              onClick = { () => { $('#modal').modal('open'); }}
              disabled= { !this.props.isAuthenticated || book.quantity === 0 }>
                Borrow Book
              </button>
              <div className="left">
                <button className="btn btn-small book-detail-icons left"
                  onClick={this.upvoteBook} disabled={this.props.isUpvoting}>
                  <i className="material-icons prefix">thumb_up</i>
                  <span>{book.upvotes}</span>
                </button>
                <button className="btn btn-small book-detail-icons left" onClick
                 ={this.downvoteBook} disabled={this.props.isDownvoting}>
                  <i className="material-icons prefix">thumb_down</i>
                  <span>{book.downvotes}</span>
                </button>
                <button className="btn btn-small book-detail-icons left"
                  disabled={this.props.isFavoriting}
                  onClick={this.favoriteBook}>
                  <i className="material-icons prefix">favorite_border</i>
                  <span>{book.favCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Prop type validation
BookDetails.propTypes = {
  book: propTypes.object.isRequired,
  favoriteBook: propTypes.func.isRequired,
  upvoteBook: propTypes.func.isRequired,
  downvoteBook: propTypes.func.isRequired,
  borrowBook: propTypes.func.isRequired,
  isUpvoting: propTypes.bool,
  isDownvoting: propTypes.bool,
  isFavoriting: propTypes.bool,
  isAuthenticated: propTypes.bool.isRequired,
};

export default BookDetails;