import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Slider, Slide } from 'react-materialize';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import books2 from '../public/images/books(4).jpg';
import books3 from '../public/images/hello-books.jpg';
import books1 from '../public/images/books(1).jpg';
import PageFooter from './PageFooter';
import BooksList from './BooksList';
import Preloader from './Preloader';
import { getBooks, getMostUpvotedBooks, searchBooks } from '../actions/books';
import SearchBar from './Searchbar';
import notify from '../helpers/notify';
import materialize from '../helpers/materialize';

class IndexPage extends Component {
  componentDidMount() {
    materialize();
    this.props.getBooks();
    this.props.getMostUpvotedBooks();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <Slider indicators={false} className="slider-div">
            <Slide
              src={books2}>
              <p className="white-text flow-text slider-text">Welcome to Hello-books</p>
              <p className="white-text flow-text slider-text flow-text">Managing library operations just got easier!!!</p>
              <Link to="/login" className="btn btn-large primary-button white-text darken-2 waves-effect waves-light">Get Started</Link>
            </Slide>
            <Slide
              src={books3}
              placement="right">
              <p className="white-text flow-text slider-text bold">Borrow any of our books</p>
              <p className="white-text flow-text slider-text flow-text bold">You are literally a click away from borrowing your book of choice</p>
              <Link to="/login" className="btn btn-large primary-button white-text darken-2 waves-effect waves-light">Get Started</Link>
            </Slide>
            <Slide
              src={books1}
              placement="left">
              <p className="white-text flow-text slider-text bold">Rate and review books</p>
              <p className="white-text flow-text slider-text flow-text bold">View others' reviews of books and give yours</p>
              <Link to="/login" className="btn btn-large primary-button white-text darken-2 waves-effect waves-light">Get Started</Link>
            </Slide>
          </Slider>
        </div>

        <SearchBar {...this.props} />
        {this.props.searchError && notify(this.props.searchError)}
        <ToastContainer />
        <div className="section white wrapper">
          <div className="row center">
            <h4 className="text-darken-3 book-header">Available books</h4>
          </div>
          <div className="row">
            {this.props.isFetching &&
              <div className="row center">
                <Preloader />
              </div>
            }
            {this.props.error &&
              <div className="row center">
                <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.error}`} </h4>
              </div>
            }
            {this.props.books &&
              <div>
                  <BooksList books={this.props.books.slice(0, 4)} />
                <div className="row center">
                  <Link to="/books"><button className="btn btn-medium primary-button waves-effect waves-light">View All Books </button></Link>
                </div>
              </div>
            }
          </div>
          <div className="container"><div className="divider z-depth-1"></div></div>
          <div className="row center">
            <h4 className="book-header text-darken-3">Most popular among readers</h4>
          </div>
          <div className="row">
            {this.props.isLoading &&
              <div className="row center">
                <Preloader />
              </div>
            }
            {this.props.upvotedError &&
              <div className="row center">
                <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.upvotedError}`} </h4>
              </div>
            }
            {this.props.upvotedBooks &&
              <BooksList books={this.props.upvotedBooks.slice(0, 4)} />
            }
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state.books,
  ...state.mostUpvotedBooks,
});
const mapDispatchToProps = dispatch => ({
  getBooks: () => { dispatch(getBooks()); },
  searchBooks: (searchBy, searchParam) => { dispatch(searchBooks(searchBy, searchParam)); },
  getMostUpvotedBooks: () => { dispatch(getMostUpvotedBooks()); },
});
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
