/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 19:31
 */

import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Footer from '../Footer'


class PasswordReset extends React.Component {
    constructor() {
        super()

        this.state = {
            password: '',
            verify_password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

        const code = this.props.params.code
        const userId = this.props.params.userId
        const password = this.state.password
        const verify_password = this.state.verify_password

        this.props.resetPassword(code, userId, password, verify_password)
    }

    render() {
        const {submitted, isLoading} = this.props.auth
        return (
            <div>
                <img src="/images/logo_icon.png" className="center-block" style={{marginTop: 50, marginBottom: 50}}/>
                <h1 className="text-center" style={{marginBottom: 30}}>Reset Password</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                    { submitted ? <div style={{paddingBottom: 20}}>
                        <p>Your password was reset successfully</p>
                        <div className="center-block">
                            <a href="/login">
                                <button className="btn btn-primary full-width-btn">Return to sign in</button>
                            </a>
                        </div>
                    </div> :
                        <form onSubmit={this.handleSubmit}>
                            <p>Enter a new password below</p>
                            <div className="form-group">
                                <label htmlFor="password_input">Password</label>
                                <input ref="password"
                                       id="password_input"
                                       type="password"
                                       className="form-control"
                                       onChange={(e) => {
                                           this.setState({password: e.target.value})
                                       }}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="verify_password_input">Verify Password</label>
                                <input id="verify_password_input"
                                       ref="verify_password"
                                       type="password"
                                       className="form-control"
                                       onChange={(e) => {
                                           this.setState({verify_password: e.target.value})
                                       }}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                            </div>
                        </form>}
                </div>
                { isLoading ? <CircularProgress style={{position:"absolute",left:"50%",marginLeft:-25,top:"50%",marginTop:-25}}/>: null }
                <Footer />
            </div>
        );
    }

}
;


export default PasswordReset