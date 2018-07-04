import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { connect } from 'react-redux';
import Preloader from '../Preloader';
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
class AdminBooksPage extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      book: { bookId: '', bookIndex: null },
    };
  }

  /**
   * @method setBook
   * @description sets the book to be edited
   *
   * @param {Number} bookId - book's id
   * @param {Number} bookIndex - book's index in the books array
   *
   * @returns {void}
   */
  setBookForEdit = (bookId, bookIndex) => {
    this.setState({ book: { bookId, bookIndex } });
    this.toggleModal();
  }


  /**
   * @method toggleModal
   * @description toggles modal for editing a book
   *
   * @return {void}
   */
  toggleModal = () => {
    $('#edit-modal').modal('open');
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
   * @method renderBooks
   * @description renders books
   *
   * @returns {Node} - react node containing books
   */
  renderBooks() {
    if (this.props.books) {
      return (
        <div>
        <AdminBooks books = { this.props.books }
        setBookForEdit = { this.setBookForEdit }
        {...this.props }/>
        <Pagination onPageChange = {page => this.props.getBooks(page) }
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
            { ...this.props }
              book = {this.state.book}/>
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

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  getBooks: (page) => { dispatch(getBooks(page)); },
  deleteBook: (bookId, bookIndex) => {
    dispatch(deleteBook(bookId, bookIndex));
  },
  editBook: (bookId, bookIndex, book) => {
    dispatch(editBook(bookId, bookIndex, book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooksPage);
