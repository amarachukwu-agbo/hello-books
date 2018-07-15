import React, { Component } from 'react';
import propTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import Notify from '../../helpers/Notify';

// Parameters for searching books to be used in dropdown
const searchParams = ['Title', 'Author', 'Subject'];

/**
 * @description container component for searching books
 *
 * @class SearchBar
 *
 * @extends {React.Component}
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchBook = this.searchBook.bind(this);
    this.state = {
      searchBy: 'Search By',
      searchParam: '',
    };
  }

  /**
   * @method searchBooks
   * @description handles searching of books
   *
   * @returns {void}
   */
  searchBook() {
    const { searchBy, searchParam } = this.state;

    if (searchBy !== 'Search By' && searchParam.trim() !== '') {
      this.props.searchBooks(searchBy.toLowerCase(), searchParam);
    }

    if (searchParam.trim() === '') {
      Notify.notifyError('Search input cannot be empty');
    }

    if (searchBy === 'Search By') {
      Notify.notifyInfo('Choose a parameter to search by');
    }
  }


  render() {
    const { searchBy, searchParam } = this.state;
    return (
      <section id="search" className="section-search white-text center">
        <div className="container search">
          <div className="row">
            <div className="col s12 search-div">
              <h5>Search Books</h5>
              <div className="row">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.searchBook();
                }}>

                  <div className="col s4 m3 l2">
                    <div className="input-field">
                      <DropdownList data={searchParams}
                        id="drop-down-list"
                        disabled={this.props.isSearching}
                        value={searchBy}
                        onChange={value =>
                        this.setState({ searchBy: value })} />
                    </div>
                  </div>

                  <div className="col s8 m9 l10">
                    <div className="input-field">
                      <input className="white grey-text text-darken-3"
                        placeholder="Book title, author or subject..."
                        id="search-input"
                        type="text" disabled={this.props.isSearching}
                        value={searchParam} onChange={e =>
                          this.setState({ searchParam: e.target.value })} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// propType validation
SearchBar.propTypes = {
  searchBooks: propTypes.func.isRequired,
  isSearching: propTypes.bool,
};

export default SearchBar;
