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
    console.log(values);
    console.log(this.props);
    this.props.handler(values);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
            <form onSubmit = { handleSubmit(this.submitForm) } >
                <div className=" row center-align teal lighten-2">
                    <h5 className="white-text">Log In</h5>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Field name="email" type="email" icon="email" component={InputText} label="Email" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Field name="password" type="password" icon="lock" component={InputText} label="Password" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col s12 center-align">
                        <button className="btn waves-effect waves-light" type="submit" disabled = { submitting }>Submit <i className="material-icons right">send</i></button>
                    </div>
                </div>
                <p className="col s12 center-align">Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
            </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
