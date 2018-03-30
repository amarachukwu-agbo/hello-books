import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/login';
import logo from '../public/images/logo.png';

class Navbar extends Component {
  render() {
    const { user, isAuthenticated } = this.props;
    return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper teal darken-2">
                            <Link to="/" className="brand-logo">
                                <img src={logo} className="img-logo" />
                            </Link>
                            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                            {
                                isAuthenticated &&
                                <ul className="right hide-on-med-and-down">
                                    <li>{ `Welcome ${user.firstName}` } </li>
                                    <li><Link to= { `/users/${user.id}/favorites` }>Favorites</Link></li>
                                    <li><Link to= { `/users/${user.id}/profile` }>Profile</Link></li>
                                    <li><button className="btn btn-flat white-text" onClick={ this.props.logOut }>Log out</button></li>
                                </ul>
                            }
                            {!isAuthenticated &&
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to="/signup">Sign up</Link></li>
                                    <li><Link to="/login">Login</Link></li>
                                </ul>
                            }
                        </div>
                    </nav>
                </div>
                {
                    this.props.isAuthenticated &&
                    <ul className="side-nav" id="mobile-demo">
                        <li>{ `Welcome ${user.firstName}` } </li>
                        <li><Link to={ `/users/${user.id}/favorites` }>Favorites</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button className="btn btn-flat white-text" onClick={ this.props.logOut }>Log out</button></li>
                    </ul>
                }
                {
                    !this.props.isAuthenticated &&
                    <ul className="side-nav" id="mobile-demo">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                }
            </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => { dispatch(logOut()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
