import React, { Component } from 'react';
import { Dropdown, NavItem } from 'react-materialize';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
              <Link to="/" className="brand-logo">
                <img src={logo} className="img-logo" />
              </Link>
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
                    <Link to='/admin'>Books Catalog</Link>
                  </li>
                  <li>
                    <Link to='/admin/addBook'>Add Book</Link>
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
                  <li><Link to={'/users/favorites'}>Favorites</Link></li>
                  <li><Link to={'/users/profile'}>Profile</Link></li>
                  <li><Link to='/books'>Books</Link></li>
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
                  <li><Link to="/signup">Sign up</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to='/books'>Books</Link></li>
                </ul>
              }
            </div>
          </nav>
        </div>

        {/* Navbar Mobile devices */}

        {
          isAuthenticated && user.role === 'Admin' &&
          <ul className="side-nav" id="mobile-demo">
            <li><Link to='/admin'>Books Catalog</Link></li>
            <li><Link to='/admin/addBook'>Add Book</Link></li>
            <li><Link to='/admin/borrowRequests'>Borrow Requests</Link></li>
            <li><Link to='/admin/returnRequests'>Return Requests</Link></li>
            <li><Link to='/users/favorites'>Favorites</Link></li>
            <li><Link to='/users/profile'>Profile</Link></li>
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
              <Link to={'/books'}>Books</Link>
            </li>
            <li><Link to={'/users/favorites'}>Favorites</Link></li>
            <li><Link to={'/users/profile'}>Profile</Link></li>
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
            <li><Link to='/books'>Books</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
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
