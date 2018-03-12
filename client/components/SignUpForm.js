import React, { Component } from 'react';
import { render } from 'react-dom';
import logo from '../public/images/logo.png';
import PageFooter from '../components/PageFooter';
import updateTextFields from '../helpers/materialize';

class SignUpForm extends Component{
    render(){
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
                                <form>
                                    <div className=" row center-align teal lighten-2">
                                        <h5 className="white-text">Register</h5>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input id="first_name" type="text"  required className="validate" />
                                            <label for="first_name" data-error="Enter first name">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="last_name" type="text" required="" aria-required="true" className="validate" />
                                            <label for="last_name">Last Name</label>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <input id="email" type="email" className="validate" />
                                            <label for="email" data-error="Invalid email">Email</label>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input id="password1" type="password" className="validate" />
                                            <label for="password">Password</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="password2" type="password" className="validate" />
                                            <label for="password">Confirm Password</label>
                                        </div>
                                    </div>
                        
                                    <div className="row">
                                        <div className=" input-field col s12">
                                            <input id="check" type="checkbox" checked= "checked"/>
                                            <label for="check">By signing you agree to our terms and conditions</label>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="row">
                                        <div className="col s12 center-align">
                                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit <i className="material-icons right">send</i></button>
                                        </div>
                                    </div>
                                    <p className="col s12 center-align">Have an account already? <a href="/login">Sign In</a></p>
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
}

export default SignUpForm;