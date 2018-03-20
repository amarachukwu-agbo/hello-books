import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import books2 from '../public/images/books2.jpg';
import PageFooter from './PageFooter';
import BooksList from './BooksList';
import Preloader from './Preloader';
import { getBooks, getMostUpvotedBooks } from '../actions/books';

class IndexPage extends Component {
  componentDidMount() {
    this.props.getBooks();
    this.props.getMostUpvotedBooks();
  }
  render() {
    return (
            <div>
                <Navbar />
                <div className="parallax-container z-depth-4">
                    <div className="parallax"> <img src= { books2 } className = "responsive-img" /></div>
                    <div className="center-align">
                        <br/>
                        <h2 className="white-text text-darken-4 bold">Welcome to Hello-books</h2>
                        <h3 className="white-text flow-text bold">Managing library operations just got easier!!!</h3>
                        <h3 className="white-text flow-text bold"> You can rent and return books and lots more. </h3><br />
                        <Link to="/login" className="btn btn-large white-text red waves-effect waves-light">Get Started</Link>
                    </div>
                </div>
                <div className="section white">
                    <br/>
                    <div className="container center">
                        <h4 className="text-darken-3 book-header">Available books</h4>
                    </div>
                    <div className="row">
                        { this.props.isFetching &&
                            <div className="row center">
                                <Preloader />
                            </div>
                        }
                        { this.props.error &&
                            <div className="row center">
                                <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.error}`} </h4>
                            </div>
                        }
                        { this.props.books &&
                            <BooksList books = { this.props.books } />
                        }
                    </div>
                    <div className="container"><div className="divider z-depth-1"></div></div>
                    <div className="row center">
                        <h4 className="book-header text-darken-3">Most popular among readers</h4>
                    </div>
                    <div className="row">
                        { this.props.isLoading &&
                            <div className="row center">
                                <Preloader />
                            </div>
                        }
                        { this.props.upvotedError &&
                            <div className="row center">
                                <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.upvotedError}`} </h4>
                            </div>
                        }
                        { this.props.upvotedBooks &&
                            <BooksList books = { this.props.upvotedBooks } />
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
  getMostUpvotedBooks: () => { dispatch(getMostUpvotedBooks()); },
});
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
