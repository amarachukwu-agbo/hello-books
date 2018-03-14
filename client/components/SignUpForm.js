import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from '../public/images/logo.png';
import PageFooter from '../components/PageFooter';
import InputText from './InputText';
import { Field, reduxForm } from 'redux-form';
import validate from '../helpers/validations/signup';
import updateTextFields from '../helpers/materialize';

const SignUpForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
        return (
            <div className = "grey lighten-4">
                <div className="row">
                    <div className="col s3 "></div>
                    <div className="col s6">
                        <div className="row card-panel">
                            <div className="row">
                                <div className="center-align">
                                    <img src={ logo } alt="logo" className="form-logo" />
                                </div>
                            </div>
                        
                            <div className="row">
                                <form onSubmit = {handleSubmit}>
                                    <div className=" row center-align teal lighten-2">
                                        <h5 className="white-text">Register</h5>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">account_circle</i>
                                            <Field name="first_name" type="text" component={ InputText } label = "First Name" className="validate"/>
                                        </div>
                                        <div className="input-field col s6">
                                            <Field name="last_name" type="text" component= { InputText } label = "Last Name" className = "validate"/>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <Field name= "email" type="email" label="Email" component = { InputText }className="validate"/>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <Field name= "password1" type="password" label="Password" component = { InputText } className="validate"/>
                                        </div>
                                        <div className="input-field col s6">
                                            <Field name= "password2" type="password" label="Confirm Password" component = { InputText } className="validate"/>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <input type="checkbox" id="check" name="check" required/>
                                        <label htmlFor="check">By signing, you agree to our terms and conditions</label>
                                    </div>
                                    <br /><br />
                                    <div className="row">
                                        <div className="col s12 center-align">
                                            <button className="btn waves-effect waves-light" type="submit" disabled= {submitting} name="action">Submit <i className="material-icons right">send</i></button>
                                        </div>
                                    </div>
                                    <p className="col s12 center-align">Have an account here already? <a href="/login">Sign In</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s3"></div>
                </div>
                <PageFooter />
            </div>
        )
}

export default reduxForm({
    form: 'SignUp',
    validate
})(SignUpForm);