import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../public/images/logo.png';

class Navbar extends Component {
  render() {
    return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper teal darken-2">
                            <a href="#!" className="brand-logo">
                                <img src={logo} className="img-logo" />
                            </a>
                            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                            {
                                this.props.isAuthenticated &&
                                <ul className="right hide-on-med-and-down">
                                    <li><Link to="/favorites">Favorites</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li>Log out</li>
                                </ul>
                            }
                            {!this.props.isAuthenticated &&
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
                        <li><Link to="/favorites">Favorites</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>Log out</li>
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
});

export default connect(mapStateToProps)(Navbar);
