import React, { Component } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-toastify/dist/ReactToastify.min.css';

const searchParams = ['Title', 'Author', 'Subject'];

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBy: 'Search By',
      searchParam: '',
    };
  }

  searchBook = () => {
    const { searchBy, searchParam } = this.state;
    if (searchBy !== 'Search By' && searchParam.trim() !== '') {
      this.props.searchBooks(searchBy.toLowerCase(), searchParam);
      this.setState({ searchParam: '' });
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
                <form onSubmit={(e) => { e.preventDefault(); this.searchBook(); }}>

                  <div className="col s4 m3 l2">

                    <div className="input-field">
                      <DropdownList data={searchParams}
                        disabled={this.props.isSearching}
                        value={searchBy} onChange={value => this.setState({ searchBy: value })} />
                    </div>
                  </div>

                  <div className="col s8 m9 l10">
                    <div className="input-field">
                      <input className="white grey-text text-darken-3" type="text"
                        placeholder="Book title, author or subject..."
                        disabled={this.props.isSearching}
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
export default SearchBar;
