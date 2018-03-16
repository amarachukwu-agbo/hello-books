import React, { Component } from 'react';
import logo from '../../public/images/logo.png';
import PageFooter from '../PageFooter';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';



class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.renderSignUpMessage = this.renderSignUpMessage.bind(this);
    }
    renderSignUpMessage(){
        let signUpMessage = '';
        if (this.props.isSigningUp){
            signUpMessage = 'Signing you up...';
        }
        if (this.props.hasErrored) {
            signUpMessage = `Sign up failed. ${ this.props.error }`;
        }
        if (this.props.user) {
            signUpMessage = 'Sign up successful';
        }
        return signUpMessage;
    }

    render() {
        return (
            <div className="grey lighten-4">
                <div className="row">
                    <div className="col s3 "></div>
                    <div className="col s6">
                        <div className="row card-panel">
                            <div className="row">
                                <div className="center-align">
                                    <img src={logo} alt="logo" className="form-logo" />
                                </div>
                            </div>
                            <div className="row">
                                <div className = "row center-align">
                                    <span className = {this.props.hasErrored ? "signUpError" : "signUpSuccess" } >
                                        { this.renderSignUpMessage() }
                                    </span>
                                </div>
                                <SignUpForm />
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

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isSigningUp: state.auth.isSigningUp,
        hasErrored: state.auth.hasErrored,
        user: state.auth.user,     
    }
}

export default connect(mapStateToProps)(SignUpPage);

