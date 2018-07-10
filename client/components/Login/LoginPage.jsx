import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import books2 from '../../public/images/books(4).jpg';
import LoginForm from './LoginForm.jsx';
import { loginUser } from '../../actions/login';

/**
 * @description - container component for LoginForm
 *
 * @class LoginPage
 *
 * @extends {React.Component}
 */
export class LoginPage extends Component {
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
   * @memberof LoginPage
   * @method submitForm
   * @description handles form submission
   *
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
  submitForm(values) {
    this.props.loginUser(values);
  }

  render() {
    const style = {
      backgroundImage: `url(${books2})`,
    };
    return (
      <div className="row wrap" style={style}>
        <div className="wrapper valign-wrapper">
          <div className="col s1 m2 l4 "></div>
          <div className="col s10 m7 l5">
            <div className="row card-panel">
              <div className="row">
                <LoginForm id="login-form"
                  submitForm={this.submitForm}
                  {...this.props} />
              </div>
            </div>
          </div>
          <div className="col s1 m2 l4"></div>
        </div>
      </div>
    );
  }
}

// Prop  type validation
LoginPage.propTypes = {
  loginUser: propTypes.func.isRequired,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.login,
});

// action creators
const actionCreators = {
  loginUser,
};

export default connect(mapStateToProps, actionCreators)(LoginPage);

