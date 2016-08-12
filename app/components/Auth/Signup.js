/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 15/06/2016
 * Time: 17:05
 */
import React from 'react'
import Footer from '../Footer'
import CircularProgress from 'material-ui/CircularProgress'



class Signup extends React.Component{

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            verify_password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state.email, this.state.password, this.state.verify_password)
    }

    render() {
        const {isLoading} = this.props.auth
        return (
            <div>
                <img src="/images/logo_icon.png" className="center-block" style={{marginTop:50, marginBottom:50}} />
                <h1 className="text-center" style={{marginBottom:30}}>Create {this.props.params.role} account</h1>
                <div className="signup-div col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email_input">Email</label>
                            <input id="email_input"
                                   type="email"
                                   className="form-control"
                                   onChange={(e)=>{ this.setState({email: e.target.value})} }
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_input">Password</label>
                            <input id="password_input"
                                   type="password"
                                   className="form-control"
                                   onChange={(e)=>{ this.setState({password: e.target.value})} }
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="verify_password_input">Verify Password</label>
                            <input id="verify_password_input"
                                   type="password"
                                   className="form-control"
                                   onChange={(e)=>{ this.setState({verify_password: e.target.value})} }
                                   required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary full-width-btn" value="Submit"/>
                        </div>
                    </form>
                    <p className="text-center">Already have an account? <a href="/login">Sign in</a></p>
                </div>
                { isLoading ? <CircularProgress style={{position:"absolute",left:"50%",marginLeft:-25,top:"50%",marginTop:-25}}/>: null }
                <Footer />
            </div>
        );
    }
};


module.exports = Signup;