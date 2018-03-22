import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../public/images/logo.png';
import PageFooter from '../PageFooter';
import LoginForm from './LoginForm';
import loginUser from '../../actions/login';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.renderLoginMessage = this.renderLoginMessage.bind(this);
  }

  renderLoginMessage() {
    console.log(this.props);
    let loginMessage = '';
    if (this.props.isLoggingIn) {
      loginMessage = 'Logging you in...';
    }
    if (this.props.hasErrored) {
      loginMessage = `Authentication failed. ${this.props.error}`;
    }
    if (this.props.isAuthenticated) {
      loginMessage = 'Login successful';
    }
    return loginMessage;
  }

  render() {
    return (
      <div className = "row">
        <div className="row">
            <div className="col s1 m3 l4 "></div>
            <div className="col s10 m6 l4">
                <div className="row card-panel">
                    <div className="row">
                        <div className="center-align">
                            <img src= { logo } alt="logo" className="form-logo" />
                        </div>
                    </div>
                    <div className="center"><span className= { this.props.hasErrored ? 'sign-up-error' : 'sign-up-success' }>
                      { this.renderLoginMessage() }
                    </span></div>
                    <div className="row">
                        <LoginForm handler = { this.props.loginUser } />
                    </div>
                </div>
            </div>
            <div className="col s1 m3 l4"></div>
        </div>
        <PageFooter />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.login,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user) => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

