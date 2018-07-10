import React, { Component } from 'react';
import { Dropdown, NavItem } from 'react-materialize';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../../actions/login';
import { getBooks } from '../../actions/books';
import logo from '../../public/images/logo.png';

/**
 * @description Navbar container component
 *
 * @class Navbar
 *
 * @extends {React.Component}
 */
class Navbar extends Component {
  render() {
    const { user, isAuthenticated } = this.props;
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                <img src={logo} className="img-logo" />
              </a>
              <a href="#" data-activates="mobile-demo"
                className="button-collapse">
                <i className="material-icons">menu</i>
              </a>

              {/* Authenticated Admin Navbar */}

              {
                isAuthenticated && user.role === 'Admin' &&
                <ul className="right hide-on-med-and-down">
                  <li>
                    <Dropdown trigger={
                      <button>
                        Requests &nbsp;
                        <i className="fa fa-caret-down" />
                      </button>}>
                      <NavItem href='/admin/borrowRequests/'>
                        Borrow Requests
                      </NavItem>
                      <NavItem divider />
                      <NavItem href='/admin/returnRequests'>
                        Return Requests
                      </NavItem>
                    </Dropdown>
                  </li>
                  <li className="second-nav-item">
                    <a href ='/admin'>Books Catalog</a>
                  </li>
                  <li>
                    <a href='/admin/addBook'>Add Book</a>
                  </li>
                  <li>
                    <Dropdown trigger={
                      <button>
                        Account &nbsp;
                        <i className="fa fa-caret-down" />
                      </button>}>
                      <NavItem href='/users/favorites'>
                        Favorites
                      </NavItem>
                      <NavItem divider />
                      <NavItem href='/users/profile'>
                        Profile
                      </NavItem>
                    </Dropdown>
                  </li>
                  <li>
                    <button className="btn btn-flat white-text"
                      onClick={this.props.logOut}>Log out
                    </button>
                  </li>
                </ul>
              }

              {/* Authenticated User Navbar */}

              {
                isAuthenticated && user.role === 'User' &&
                <ul className="right hide-on-med-and-down">
                  <li>{`Welcome ${user.firstName}`} </li>
                  <li><a href={'/users/favorites'}>Favorites</a></li>
                  <li><a href={'/users/profile'}>Profile</a></li>
                  <li><a href='/books'>Books</a></li>
                  <li>
                    <button className="btn btn-flat white-text"
                      onClick={this.props.logOut}>Log out
                    </button>
                  </li>
                </ul>
              }

              {/* Guest User Navbar */}

              {!isAuthenticated &&
                <ul className="right hide-on-med-and-down">
                  <li><a href="/signup">Sign up</a></li>
                  <li><a href="/login">Login</a></li>
                  <li><a href='/books'>Books</a></li>
                </ul>
              }
            </div>
          </nav>
        </div>

        {/* Navbar Mobile devices */}

        {
          isAuthenticated && user.role === 'Admin' &&
          <ul className="side-nav" id="mobile-demo">
            <li><a href='/admin'>Books Catalog</a></li>
            <li><a href='/admin/addBook'>Add Book</a></li>
            <li><a href='/admin/borrowRequests'>Borrow Requests</a></li>
            <li><a href='/admin/returnRequests'>Return Requests</a></li>
            <li><a href='/users/favorites'>Favorites</a></li>
            <li><a href='/users/profile'>Profile</a></li>
            <li>
              <button className="btn btn-flat primary-button"
                onClick={this.props.logOut}>Log out
              </button>
            </li>
          </ul>
        }

        {
          this.props.isAuthenticated && user.role === 'User' &&
          <ul className="side-nav" id="mobile-demo">
            <li>{`Welcome ${user.firstName}`} </li>
            <li>
              <a href={'/books'}>Books</a>
            </li>
            <li><a href={'/users/favorites'}>Favorites</a></li>
            <li><a href={'/users/profile'}>Profile</a></li>
            <li>
              <button className="btn btn-flat primary-button"
                onClick={this.props.logOut}>Log out
              </button>
            </li>
          </ul>
        }

        {
          !this.props.isAuthenticated &&
          <ul className="side-nav" id="mobile-demo">
            <li><a href='/books'>Books</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
          </ul>
        }
      </div>
    );
  }
}

// Prop type validation
Navbar.propTypes = {
  isAuthenticated: propTypes.bool,
  user: propTypes.object,
  logOut: propTypes.func.isRequired,
  getBooks: propTypes.func.isRequired,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  user: state.login.user,
});

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  logOut: () => { dispatch(logOut()); },
  getBooks: () => { dispatch(getBooks()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
