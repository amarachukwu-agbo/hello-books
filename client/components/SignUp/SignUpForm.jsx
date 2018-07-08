import React from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { InputText } from '../Common/InputTypes.jsx';
import validate from '../../helpers/validations/signup';

/**
 * @description stateless component for signup form
 *
 * @param submitForm - handles submission of login form
 * @param {func} handleSubmit - reduxForm wrapper
 * @param {boolean} isSigningUp
 *
 * @returns {Node} - react node containing SignUpForm component
 */
const SignUpForm = ({
  handleSubmit,
  isSigningUp,
  submitForm,
}) => (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className=" row center-align lighten-2">
        <h4>Sign Up</h4>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <Field name="firstName" type="text"
            icon="account_circle" component={InputText}
            label="First Name" />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <Field name="lastName" type="text"
            icon="account_circle" component={InputText}
            label="Last Name" />
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <Field name="email" type="email"
            label="Email" icon="email"
            component={InputText} />
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <Field name="password" type="password"
            label="Password" icon="lock"
            component={InputText} />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <Field name="password2" type="password"
            label="Confirm Password" icon="lock"
            component={InputText} />
        </div>
      </div><br />

      <div className="row">
        <div className="col s12">
          <input type="checkbox" id="check" name="check" required />
          <label htmlFor="check">
            By signing, you agree to our terms and conditions
            </label>
        </div>
      </div>
      <br /><br />

      <div className="row">
        <div className="col s12 center-align">
          <button className="btn waves-effect primary-button waves-light"
            type="submit" disabled={isSigningUp} name="action">Submit
            {isSigningUp ?
              <i className="fa fa-spinner fa-spin" />
              : <i className="material-icons right">send</i>
            }
          </button>
        </div>
      </div>
      <p className="col s12 center-align">
        Have an account here already?
          <Link to="/login">Sign In</Link>
      </p>
    </form>
);

SignUpForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isSigningUp: propTypes.bool,
  submitForm: propTypes.func.isRequired,
};

// Redux Form wrapper
const reduxSignUp = reduxForm({
  form: 'signUp',
  validate,
})(SignUpForm);

export default reduxSignUp;