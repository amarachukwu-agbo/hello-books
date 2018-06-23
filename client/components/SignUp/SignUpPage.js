import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Navbar';
import books2 from '../../public/images/books(4).jpg';
import PageFooter from '../PageFooter';
import SignUpForm from './SignUpForm';
import { signUp } from '../../actions/userSignUp';


class SignUpPage extends Component {
  render() {
    const style = {
      backgroundImage: `url(${books2})`,
    };
    return (
      <div className="row wrap">
        <Navbar />
        <div className="valign-wrapper" style={style}>
          <div className="col s1 m2 l4 "></div>
          <div className="col s10 m7 l5">
            <div className="row form-wrap card-panel">
                <ToastContainer />
                <SignUpForm handler={this.props.signUp} {...this.props}/>
            </div>
          </div>
          <div className="col s1 m2 l4"></div>
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
