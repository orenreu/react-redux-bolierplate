/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 16/06/2016
 * Time: 00:34
 */
import React from 'react';
import Axios from 'axios';
import Footer from '../Footer';
import mixpanel from 'mixpanel-browser'


class Signin extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {

        e.preventDefault();
        this.props.login(this.state.email.toLowerCase(), this.state.password)
        this.setState({
            password:""
        })

    }


    render() {
        return (
            <div>
                <img src="/images/logo_icon.png" className="center-block" style={{marginTop: 50, marginBottom: 50}}/>
                <h1 className="text-center" style={{marginBottom: 30}}>Sign in to Webscope</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">

                            <label htmlFor="email_input">Email</label>
                            <input id="email_input"
                                   type="email"
                                   className="form-control"
                                   value={this.state.email}
                                   onChange={(e) => this.setState({email: e.target.value})}
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_input">Password</label>
                            <input id="password_input"
                                   type="password"
                                   value={this.state.password}
                                   className="form-control"
                                   onChange={(e) => this.setState({password: e.target.value})}
                                   required/>
                            <p style={{paddingTop: 5}}>Forgot password? <a href="/password">Click here</a></p>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Submit"
                                   className="btn btn-primary full-width-btn"/>
                        </div>
                    </form>
                    <p className="text-center">First time here? <a href="/signup">Sign up</a></p>
                </div>
                {this.props.auth.message ? <Alert message={this.props.auth.message}/> : null}
                <Footer />
            </div>
        );
    }
}
;

const Facebook = () => (
    <div className="facebook-signin">
        <div className="text-center">
            <a href="/auth/facebook">
                <button className="btn btn-facebook">
                    <i className="fa fa-facebook-square"></i> &nbsp;  Sign in with Facebook
                </button>
            </a>
        </div>
        <div>
            <h5 className="or-sperator text-center">Or</h5>
        </div>
    </div>
);

const Alert = (props) => (
    <div style={{marginTop: 20}} className="alert alert-danger col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
        <h5 className="text-center">{props.message}</h5>
    </div>
)

module.exports = Signin;