import React, { Component } from 'react';
import propTypes from 'prop-types';
import swal from 'sweetalert';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader.jsx';
import AdminBooks from './AdminBooks.jsx';
import Pagination from '../Common/Pagination.jsx';
import { getBooks, deleteBook, editBook } from '../../actions/books';
import EditBookForm from './Form/EditBookForm.jsx';

/**
 * @description - container component for AdminBooks
 *
 * @class AdminBooksPage
 *
 * @extends {React.Component}
 */
export class AdminBooksPage extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.state = {
      book: { bookId: '', bookIndex: null },
    };
    this.deleteBook = this.deleteBook.bind(this);
    this.setBookForEdit = this.setBookForEdit.bind(this);
  }

  /**
   * @memberof AdminBooksPage
   * @method setBook
   * @description sets the book to be edited
   *
   * @param {Number} bookId - book's id
   * @param {Number} bookIndex - book's index in the books array
   *
   * @returns {void}
   */
  setBookForEdit(bookId, bookIndex) {
    this.setState({ book: { bookId, bookIndex } });
    $('#edit-modal').modal('open');
  }

  /**
   * @memberof AdminBooksPage
   * @method deleteBook
   * @description deletes a book
   *
   * @param {Number} bookId - book's id
   * @param {Number} bookIndex - book's index in the books array
   *
   * @returns {void}
   */
  deleteBook(bookId) {
    swal({
      title: 'Are you sure you want to delete this book?',
      text: 'Once deleted, you will not be able to recover the book',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          return this.props.deleteBook(bookId);
        }
      });
  }

  /**
   * @method componentDidMount
   * @description get books on page 1
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getBooks(1);
  }

  /**
   * @memberof AdminBooksPage
   * @method renderPreloader
   * @description renders loader when books are still fetching
   *
   * @returns {Node} - react node containing preloader
   */
  renderPreloader() {
    if (this.props.isFetching) {
      return (
        <div className="row center wrapper">
          <Preloader />
        </div>
      );
    }
  }

  /**
   * @method renderError
   * @description renders error if any
   *
   * @returns {Node} - react node containing error
   */
  renderError() {
    if (this.props.error) {
      return (
        <div className="row center wrapper">
          <h4 className="flow-text red-text">
            {`Oops! Couldn't fetch available books. ${this.props.error}`}
          </h4>
        </div>
      );
    }
  }

  /**
   * @memberof AdminBooksPage
   * @method renderBooks
   * @description renders books
   *
   * @returns {Node} - react node containing books
   */
  renderBooks() {
    if (this.props.books) {
      return (
        <div className="wrapper">
        <AdminBooks books = { this.props.books }
          setBookForEdit = { this.setBookForEdit }
          deleteBook = { this.deleteBook }
          isDeleting = { this.props.isDeleting }
        />
        <Pagination onPageChange = { this.props.getBooks }
              pagination = { this.props.pagination }
            />
        </div>
      );
    }
  }

  render() {
    return (
    <div className="admin">
      { this.renderPreloader() }
      { this.renderError() }
      <h5 className="book-header center">Books Catalog</h5>
        <div className="divider"></div>
      { this.renderBooks() }
      { this.props.books &&
      <Modal id="edit-modal" actions={null} >
          <div className="container">
            <EditBookForm index = { this.state.book.bookIndex }
            { ...this.props } />
          </div>
        </Modal>
      }
    </div>
    );
  }
}

// Prop type validation
AdminBooksPage.propTypes = {
  getBooks: propTypes.func.isRequired,
  books: propTypes.array,
  pagination: propTypes.object,
  isFetching: propTypes.bool,
  error: propTypes.string,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.books,
});

// action creators
const actionCreators = {
  getBooks,
  deleteBook,
  editBook,
};

export default connect(mapStateToProps, actionCreators)(AdminBooksPage);
