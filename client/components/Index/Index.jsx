import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Slider, Slide } from 'react-materialize';
import books4 from '../../public/images/books(4).jpg';
import books1 from '../../public/images/books(1).jpg';
import BooksList from '../Books/BooksList.jsx';
import Preloader from '../Common/Preloader.jsx';
import {
  getBooks,
  getMostUpvotedBooks,
  searchBooks,
} from '../../actions/books';
import SearchBar from '../Common/Searchbar.jsx';
import Notify from '../../helpers/Notify';
import materialize from '../../helpers/materialize';
import Pagination from '../Common/Pagination.jsx';

/**
 * @description - container component for Index page
 *
 * @class IndexPage
 *
 * @extends {React.Component}
 */
export class IndexPage extends Component {
  /**
   * @method componentDidMount
   * @description get books on page 1
   * and most upvoted books on page 1
   *
   * @returns {void}
   */
  componentDidMount() {
    materialize();
    this.props.getBooks(1);
    this.props.getMostUpvotedBooks(1);
  }

  render() {
    return (
      <div>
        <div>
          <Slider indicators={false} className="slider-div">
            <Slide
              src={books4}>
              <p className="white-text flow-text slider-text" id="welcome">
                Welcome to Hello-books
              </p>
              <p className="white-text flow-text slider-text flow-text"
                id="borrow">
                Borrow your favorite books on our platform!!!
              </p>
              <Link to="/login" className="btn btn-large primary-button
                white-text darken-2 waves-effect waves-light"
                id="get-started">
                Get Started
              </Link>
            </Slide>
            <Slide
              src={books1}
              placement="left">
              <p className="white-text flow-text slider-text bold"
                id="rate-review">
                Rate and review books
              </p>
              <p className="white-text flow-text slider-text flow-text bold"
                id="review">
                View others' reviews of books and give yours
              </p>
              <Link to="/login" className="btn btn-large primary-button
                white-text darken-2 waves-effect waves-light">
                Get Started
              </Link>
            </Slide>
          </Slider>
        </div>

        <SearchBar {...this.props} />
        {this.props.searchError && Notify.notifyInfo(this.props.searchError)}
        <div className="section white wrapper">
          <div className="row center" id="available">
            <h4
            className="text-darken-3 book-header"
            >Available books</h4>
          </div>
          <div className="row book-list">
            {this.props.isFetching &&
              <div className="row center">
                <Preloader />
              </div>
            }
            {this.props.error &&
              <div className="row center">
                <h6 className="flow-text red-text">
                  {`Oops! Couldn't fetch available books. ${
                    this.props.error}`}
                </h6>
              </div>
            }
            {this.props.books &&
              <div>
                  <BooksList books={this.props.books.slice(0, 4)} />
                <div className="row center">
                  <Link to="/books">
                    <button className="btn btn-medium
                      primary-button waves-effect waves-light"
                      id="all-books">
                      View All Books
                    </button>
                  </Link>
                </div>
              </div>
            }
          </div>
          <div className="container">
            <div className="divider z-depth-1"></div>
          </div>
          <div className="row center" id="most-popular">
            <h4 className="book-header text-darken-3">
              Most popular among readers
            </h4>
          </div>
          <div className="row">
            {this.props.isLoading &&
              <div className="row center">
                <Preloader />
              </div>
            }
            {this.props.upvotedError &&
              <div className="row center">
                <h6 id="upvoted-error"
                  className="flow-text red-text">
                  {`Oops! Couldn't fetch available books. ${
                    this.props.upvotedError}`}
                </h6>
              </div>
            }
            {this.props.upvotedBooks &&
              <div className = "row book-list"
              id="most-popular-books">
              <BooksList books={this.props.upvotedBooks} />
              <Pagination pagination={this.props.upvotedBooksPagination}
                floatingButton = { true }
                onPageChange ={this.props.getMostUpvotedBooks}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

// Prop type validation
IndexPage.propTypes = {
  getBooks: propTypes.func.isRequired,
  searchBooks: propTypes.func.isRequired,
  getMostUpvotedBooks: propTypes.func.isRequired,
  books: propTypes.array,
  upvotedBooks: propTypes.array,
  upvotedError: propTypes.string,
  isLoading: propTypes.bool,
  error: propTypes.string,
  isFetching: propTypes.bool,
  searchError: propTypes.string,
  upvotedBooksPagination: propTypes.object,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.books,
  ...state.mostUpvotedBooks,
});

// action creators
const actionCreators = {
  getBooks,
  searchBooks,
  getMostUpvotedBooks,
};

export default connect(mapStateToProps, actionCreators)(IndexPage);
