import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import SearchBar from '../Common/Searchbar.jsx';
import Notify from '../../helpers/Notify';
import BooksList from './BooksList.jsx';
import Preloader from '../Common/Preloader.jsx';
import Pagination from '../Common/Pagination.jsx';
import { getBooks, searchBooks } from '../../actions/books';
import materialize from '../../helpers/materialize';

/**
 * @description - Container class components for all books
 *
 * @class BooksPage
 *
 * @extends {React.Component}
 */
export class BooksPage extends Component {
  /**
   * @constructor create an instance of BooksPage component
   *
   * @param {object} props properties for the BooksPage component
   */
  constructor(props) {
    super(props);
    this.renderPreloader = this.renderPreloader.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  /**
   * @description fetch books on page 1 when the component
   * is already mounted on the DOM
   */
  componentDidMount() {
    materialize();
    if (!this.props.searchResults) {
      this.props.getBooks(1);
    }
  }

  /**
   * @method renderPreloader
   * @description render preloader while books are being fetched
   *
   * @return {Node} react node containing the Preloader component
   */
  renderPreloader() {
    if (this.props.isFetching) {
      return (
        <div className="row center">
          <Preloader />
        </div>
      );
    }
  }

  /**
   * @method renderError
   * @description render error if an error occured
   * @return {Node} react node containing the error
   */
  renderError() {
    if (this.props.error) {
      return (
        <div className="row center card-panel">
          <h6 className="flow-text red-text">
            {`Oops! Couldn't fetch available books. ${
              this.props.error}`}
          </h6>
        </div>
      );
    }
  }

  /**
   * @method renderBooks
   * @description render books if they are available in props
   * @return {Node} react node containing the books
   */
  renderBooks() {
    if (this.props.books) {
      return (
        <div id="books-container">
          <BooksList books={this.props.books} />
          <Pagination
            onPageChange={this.props.getBooks}
            pagination={this.props.pagination}
          />
        </div>
      );
    }
  }

  /**
   * @method renderSearchResults
   * @description render searchResults if they are available in props
   * @return {Node} react node containing search results
   */
  renderSearchResults() {
    if (this.props.searchResults) {
      return (
        <div>
          <div className="row" id="search-results">
            <BooksList books={this.props.searchResults} />
            <div className="search-result">
              <div>
                <Link to="/books">
                  <button
                    id="get-books-button"
                    className="btn btn-flat btn-medium
                        search-button darken-2 waves-effect waves-light"
                    onClick={() => this.props.getBooks(1)}
                  >
                    <i className="material-icons left">arrow_back </i>
                    Books Catalog
                  </button>
                </Link>
              </div>
              <div>
                <Pagination
                  onPageChange={this.props.searchBooks}
                  pagination={this.props.pagination}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="search-section white wrapper">
        <br />
        <SearchBar {...this.props} />
        {this.props.searchError && Notify.notifyInfo(this.props.searchError)}
        <div className="row book-list">
          {this.renderPreloader()}
          {this.renderError()}
          {this.renderBooks()}
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

// Prop type validation
BooksPage.propTypes = {
  getBooks: propTypes.func.isRequired,
  searchBooks: propTypes.func.isRequired,
  searchResults: propTypes.array,
  books: propTypes.array,
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
  searchBooks,
};
export default connect(
  mapStateToProps,
  actionCreators,
)(BooksPage);
