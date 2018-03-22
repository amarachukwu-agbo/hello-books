import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import BooksList from './BooksList';
import BooksDetailsPage from './BookDetailsPage';
import Preloader from './Preloader';
import { getBooks } from '../actions/books';

class Books extends Component {
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const { match } = this.props;
    return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path = {`${match.url}/:bookId`} component = { BooksDetailsPage } />
                    <Route exact path = { `${match.url}`} render= {() => (
                        <div className="section white">
                        <br/>
                            <div className="container center">
                                <h4 className="text-darken-3 book-header">Available books</h4>
                            </div>
                            <div className="row">
                                { this.props.isFetching &&
                                    <div className="row center book-image">
                                        <Preloader />
                                    </div>
                                }
                                { this.props.error &&
                                    <div className="row center book-image">
                                        <h4 className="flow-text red-text"> {`Oops! Couldn't fetch available books. ${this.props.error}`} </h4>
                                    </div>
                                }
                                { this.props.books &&
                                    <BooksList books = { this.props.books } {...this.props} />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Books);
