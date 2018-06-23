import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import Book from './Book';
import BooksDetailsPage from './BookDetailsPage';
import Preloader from './Preloader';
import { getBooks, searchBooks } from '../actions/books';
import materialize from '../helpers/materialize';
import SearchBar from './Searchbar';
import notify from '../helpers/notify';

class Books extends Component {
  componentDidMount() {
    materialize();
    if (!this.props.searchResults) {
      this.props.getBooks();
    }
  }

  render() {
    const { match } = this.props;
    return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path = {`${match.url}/:bookId`} component = { BooksDetailsPage } />
                    <Route exact path = { `${match.url}`} render= {() => (
                        <div className="search-section white wrapper">
                        <br/>
                            <SearchBar {...this.props}/>
                            {this.props.searchError && notify(this.props.searchError) }
                        <ToastContainer />
                            <div className="row book-list">
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
                                    this.props.books.map((book, index) =>
                                        <Book key= { index } book= { book } />)
                                }
                                { this.props.searchResults &&
                                    <div>
                                        <div className="row center">
                                        <Link to = "/books">
                                        <button className= "btn btn-flat btn-medium search-button darken-2 waves-effect waves-light"
                                        onClick = {this.props.getBooks }><i className="material-icons left">arrow_back </i>
                                        Books Catalog </button>
                                        </Link>
                                        </div>
                                    <div className="row">{this.props.searchResults.map((book, index) =>
                                        <Book key= { index } book= { book } />)}</div>
                                    </div>
                                }
                            </div>
                        </div>)}
                     />
                </Switch>
                <PageFooter />
            </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state.books,
});
const mapDispatchToProps = dispatch => ({
  getBooks: () => { dispatch(getBooks()); },
  searchBooks: (searchBy, searchParam) => { dispatch(searchBooks(searchBy, searchParam)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Books);
