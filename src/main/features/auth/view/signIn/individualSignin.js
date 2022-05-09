import React, {Component} from 'react';
import $ from "jquery";
import {NavLink} from "react-router-dom";
import {API} from "../../../../utils/services";
import {setAuthEnv, STRINGS, SvgSpinner} from "../../../../utils/base";

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

        this.state = {
            disableFormSubmit: false,
            dialogMessage: "",
            openView: false,
            path: ''
        };

        this.loginData = {
            email: "",
            password: "",
            canSubmit: true
        };
    }

    closeViewerModal = () => {
        this.setState({openView: false, path: ''});
    };

    validateForm = (email, password) => {
        let valid = {error: false, message: ""};
        const email_regex = /\S+@\S+\.\S+/;
        if ($.isEmptyObject(email)) valid = {
            error: true,
            message: "Email Required!"
        };
        else if (!email_regex.test(email)) valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Invalid Email. example@exa.com" : `${valid.message}\nInvalid Email. example@exa.com`
        };
        if (typeof password !== 'undefined') {
            if ($.isEmptyObject(password)) valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Password Required!" : `${valid.message}\nPassword Required!`
            };
        }
        return valid;
    };

    handleLoginSubmit(event) {
        try {
            if (this.loginData.canSubmit) {
                const user_name = this.loginData.email;
                const password = this.loginData.password;
                const validateForm = this.validateForm(user_name, password);
                if (!validateForm.error) {
                    this.setState({dialogMessage: "", disableFormSubmit: true});
                    this.loginData.canSubmit = false;
                    API.AUTH.login({user_name, password}).then(({status, error, data}) => {
                        if (status) {
                            setAuthEnv(data.token, data.user)
                        } else {
                            this.setState({dialogMessage: error, disableFormSubmit: false});
                            this.loginData.canSubmit = true;
                        }
                    }).catch(() => {
                        this.setState({dialogMessage: "Something unexpected happened.", disableFormSubmit: false});
                        this.loginData.canSubmit = true;
                    });
                } else {
                    this.setState({dialogMessage: validateForm.message})
                }
            }
        } catch (error) {
            this.setState({dialogMessage: error})
        }
        event.preventDefault();
    }

    render() {
        return (
            <form className="lg-form" onSubmit={this.handleLoginSubmit}>
                <div className="row-header">

                    <div className="row-cl-1">
                        <div className="row-cl-img">
                            {/*img tag align here*/}
                        </div>
                        <div className="row-cl-label-img">Upload Image
                        </div>
                    </div>

                    <div className="row-cl-2">
                        <div className="row-cl-2-heading1">Sign Up
                        </div>
                        <div className="row-cl-2-heading2">
                            You’re signing up as an Individual.
                        </div>
                    </div>

                </div>
                <div className="row-pair-input">
                    <div className="row">
                        <div className="inp">
                            <input name="first_name" type="text" placeholder="First Name"
                                   onChange={(event) => this.loginData.email = event.target.value}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="inp">
                            <input name="last_name" type="text" placeholder="Last Name"
                                   onChange={(event) => this.loginData.email = event.target.value}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="ic">
                        <i className="ic-envelope"/>
                    </div>
                    <div className="inp">
                        <input name="designation" type="text" placeholder="Enter Your Designation"
                               onChange={(event) => this.loginData.email = event.target.value}/>
                    </div>
                </div>
                <div className="row">
                    <div className="ic">
                        <i className="ic-phone"/>
                    </div>
                    <div className="inp">
                        <input name="phone_no" type="text" placeholder="Enter Phone Number"
                               onChange={(event) => this.loginData.email = event.target.value}/>
                    </div>
                </div>

                <div className="row">
                    <div className="ic">
                        <i className="ic-envelope"/>
                    </div>
                    <div className="inp">
                        <input name="email" type="text" placeholder="Enter Your Email"
                               onChange={(event) => this.loginData.password = event.target.value}/>
                    </div>
                </div>

                <div className="row-check-box">
                    <div className="check-box-Box">
                        <input type="checkbox"/>
                        <span className="label">
                        I would like to utilize my 14 day trial period.</span>
                    </div>

                    <div className="check-box-Box">
                        <input type="checkbox"/>
                        <span className="label">
                        I agree the terms and conditions.</span>
                    </div>
                </div>


                <div className="t-c-row">

                </div>
                {!$.isEmptyObject(this.state.dialogMessage) && (
                    <div className="alert lg alert-error">
                        <div className="_ms-lb">{this.state.dialogMessage}</div>
                    </div>
                )}
                <div className="btn">
                    <button className={`button ${this.state.disableFormSubmit ? "disable" : ""}`}>
                        Sign in
                        {!this.state.disableFormSubmit ?
                            <span className="icon-login"><i className="ic-login_icon"/></span> :
                            <SvgSpinner/>}
                    </button>
                </div>

                <div className="btm-txt-box">
                    <NavLink className="bottom-txt-area" to={STRINGS.ROUTES.AUTH.SIGN_IN}>
                        Already have an account?
                    </NavLink>
                </div>
            </form>
        );
    }
}

export default SignIn
