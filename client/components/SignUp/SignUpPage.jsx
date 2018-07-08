import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Common/Navbar.jsx';
import books2 from '../../public/images/books(4).jpg';
import PageFooter from '../Common/PageFooter.jsx';
import SignUpForm from './SignUpForm.jsx';
import { signUp } from '../../actions/signUp';

/**
 * @description - container component for SignUpForm
 *
 * @class SignUpPage
 *
 * @extends {React.Component}
 */
class SignUpPage extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * @memberof SignUpPage
   * @method submitForm
   * @description handles form submission
   *
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
  submitForm(values) {
    const {
      firstName, lastName, email, password,
    } = values;
    this.props.handler({
      firstName, lastName, email, password,
    });
  }

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
                <SignUpForm submitForm={this.props.signUp} {...this.props}/>
            </div>
          </div>
          <div className="col s1 m2 l4"></div>
        </div>
        <PageFooter />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signUp: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signUp: (user) => { dispatch(signUp(user)); },
});

const mapStateToProps = state => ({
  ...state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
