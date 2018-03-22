import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../public/images/logo.png';
import PageFooter from '../PageFooter';
import SignUpForm from './SignUpForm';
import { signUp } from '../../actions/userSignUp';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.renderSignUpMessage = this.renderSignUpMessage.bind(this);
  }

  renderSignUpMessage() {
    let signUpMessage = '';
    if (this.props.isSigningUp) {
      signUpMessage = 'Signing you up...';
    }
    if (this.props.hasErrored) {
      signUpMessage = `Sign up failed. ${this.props.error}`;
    }
    if (this.props.user) {
      signUpMessage = 'Sign up successful';
    }
    return signUpMessage;
  }

  render() {
    return (
            <div className="grey lighten-4">
                <div className="row">
                    <div className="col s1 m2 l3 "></div>
                    <div className="col s10 m8 l6">
                        <div className="row card-panel">
                            <div className="row">
                                <div className="center-align">
                                    <img src={logo} alt="logo" className="form-logo" />
                                </div>
                            </div>
                            <div className="row">
                                <div className = "row center-align">
                                    <span className = {this.props.hasErrored ? 'sign-up-error' : 'sign-up-success' } >
                                        { this.renderSignUpMessage() }
                                    </span>
                                </div>
                                <SignUpForm handler = { this.props.signUp } />
                            </div>
                        </div>
                    </div>
                    <div className="col s1 m2 l3"></div>
                </div>
                <PageFooter />
            </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp: (user) => { dispatch(signUp(user)); },
});

const mapStateToProps = state => ({
  error: state.auth.error,
  isSigningUp: state.auth.isSigningUp,
  hasErrored: state.auth.hasErrored,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
