/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 12:29
 */
import React from 'react'
import Footer from '../Footer'
import CircularProgress from 'material-ui/CircularProgress'


class Password extends React.Component {
    constructor() {
        super()
        this.state = {
            email: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.resetPasswordRequest(this.state.email)

    }

    render() {
        const {isLoading, submitted} = this.props.auth
        return (
            <div>
                <img src="/images/logo_icon.png" className="center-block" style={{marginTop: 50, marginBottom: 50}}/>
                <h1 className="text-center" style={{marginBottom: 30}}>Reset Password</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                    {submitted ?
                        <div style={{paddingBottom: 20}}>
                            <p>Check your email for a link to reset your password. If it doesn't appear within a few
                                minutes, check your
                                spam folder.</p>
                            <div className="center-block">
                                <a href="/login">
                                    <button className="btn btn-primary full-width-btn">Return to sign in</button>
                                </a>
                            </div>
                        </div> :
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <p>Enter your email address and we will send you a link to reset your password.</p>
                                <label className="hidden" htmlFor="email_input">Email</label>
                                <input onChange={ (e)=> {
                                    this.setState({email: e.target.value})
                                } } id="email_input" type="email" className="form-control"
                                       placeholder="Enter your email" required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                            </div>
                        </form>
                    }
                </div>
                { isLoading ? <CircularProgress style={{position:"absolute",left:"50%",marginLeft:-25,top:"50%",marginTop:-25}}/>: null }
                <Footer />
            </div>
        );
    }
};

export default Password