/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:23
 */
import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Main  from '../components/App.js'
import Signup from '../components/Auth/Signup'
import Login from '../components/Auth/Login'
import Password from '../components/Auth/Password'
import PasswordReset from '../components/Auth/PasswordReset'
import PasswordSet from '../components/Auth/PasswordSet'



module.exports = (
    <Route path="/" component={Main}>

        /* Auth Routes*/
        <Route path="/login" component={Login}/>
        <Route path="/signup" router={Router} component={Signup}/>
        <Route path="/password/reset/:userId/:code" component={PasswordReset}/>
        <Route path="/password/set/:userId/:code" component={PasswordSet}/>
        <Route path="/password" component={Password}/>

        <IndexRoute component={Login}/>

    </Route>
);





