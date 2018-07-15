import React from 'react';
import propTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import validate from '../../helpers/validations/login';
import { InputText } from '../Common/InputTypes.jsx';

/**
 * @description stateless component for login form
 *
 * @param submitForm - handles submission of login form
 * @param {func} handleSubmit - reduxForm wrapper
 * @param {boolean} isLoggingIn
 *
 * @returns {Node} - react node containing LoginForm component
 */
const LoginForm = ({
  handleSubmit,
  isLoggingIn,
  submitForm,
}) => (
    <form id="login-form" onSubmit={handleSubmit(submitForm)} >
      <div className=" row center-align">
        <h4>Log In</h4>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <Field name="email" type="email" id="email"
            icon="email" component={InputText} label="Email" />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12"
          id="login-password-container">
          <Field name="password" type="password" id="password"
            icon="lock" component={InputText} label="Password" />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col s12 center-align">
          <button className="btn waves-effect primary-button waves-light"
            id="login-button"
            type="submit">
            Submit
            {isLoggingIn ? <i className="fa fa-spinner fa-spin" />
              : <i className="material-icons right">send</i>
            }

          </button>
        </div>
      </div>
      <p className="col s12 center-align">
        Don't have an account yet?
        <a href="/signup"> Sign Up</a>
      </p>
    </form>
);

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isLoggingIn: propTypes.bool,
  submitForm: propTypes.func.isRequired,
};

// Redux Form wrapper
const reduxLogin = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default reduxLogin;
