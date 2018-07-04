import React, { Component } from 'react';
import { connect } from 'react-redux';
import books2 from '../../public/images/books(4).jpg';
import Navbar from '../Navbar';
import PageFooter from '../PageFooter';
import LoginForm from './LoginForm';
import { loginUser } from '../../actions/login';

class LoginPage extends Component {
  render() {
    const style = {
      backgroundImage: `url(${books2})`,
    };
    return (
      <div className="row wrap" style={style}>
      <Navbar />
        <div className="wrapper valign-wrapper">
            <div className="col s1 m2 l4 "></div>
            <div className="col s10 m7 l5">
                <div className="row card-panel">
                    <div className="row">
                        <LoginForm
                        handler = { this.props.loginUser }
                        {...this.props}/>
                    </div>
                </div>
            </div>
            <div className="col s1 m2 l4"></div>
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

