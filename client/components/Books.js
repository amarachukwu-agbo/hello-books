import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PageFooter from './PageFooter';
import Book from './Book';
import BooksDetailsPage from './BookDetailsPage';
import Preloader from './Preloader';
import { getBooks, searchBook } from '../actions/books';
import materialize from '../helpers/materialize';

class Books extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentDidMount() {
    materialize();
    this.props.getBooks();
  }
  onInputChange(event) {
    this.props.searchBook(event.target.value);
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
                            { this.props.books &&
                                    <div className="container">
                                        <div className="input-field">
                                            <label><i className="material-icons">search</i>Search Books...</label>
                                            <input type="text"
                                                onChange = {e => this.onInputChange(e) }
                                            />
                                        </div>
                                </div>
                            }

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
                                    this.props.currentlyDisplayed.map((book, index) =>
                                        <Book key= { index } book= { book } />)
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
  searchBook: (value) => { dispatch(searchBook(value)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Books);
