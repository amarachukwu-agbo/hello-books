import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validate from '../../helpers/validations/login';
import { InputText } from '../../components/InputText';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.props.handler(values);
  }

  render() {
    const { handleSubmit, isLoggingIn } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)} >
        <div className=" row center-align">
          <h4>Log In</h4>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Field name="email" type="email"
              icon="email" component={InputText} label="Email" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Field name="password" type="password"
              icon="lock" component={InputText} label="Password" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect primary-button waves-light"
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
                    <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    );
  }
}

const reduxLogin = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default reduxLogin;
