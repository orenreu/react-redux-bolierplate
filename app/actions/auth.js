/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 25/07/2016
 * Time: 12:09
 */
import * as types from '../constants/actionTypes'
import axios from 'axios'
import mixpanel from 'mixpanel-browser'
import {push} from 'react-router-redux'
import {toggleMessage} from './message'



// =========================================================================
// LOGIN====================================================================
// =========================================================================

export function login(email, password) {
    return function (dispatch) {
        //Start action
        dispatch(requestLogin())

        //Send login request to server
        axios.post("/auth/login", {email, password}).then(function (response) {

            //track analytics
            //mixpanel.track('login', {role: response.data.user.role})
            //mixpanel.people.set_once('First Login Date', new Date());

            //dispatch success and navigate to projects screen
            dispatch(loginSuccessful())
            dispatch(getUser())
            dispatch(push('/projects'))

        }).catch(function (error) {
            dispatch(loginFailure(error))
        })

    }
}


// Request Login
function requestLogin() {
    return {
        type: types.REQUEST_LOGIN
    }
}


// Login successful
function loginSuccessful(user) {
    return {
        type: types.LOGIN_SUCCESS,
        user: user
    }
}


// Login failure
function loginFailure(response) {
    return function (dispatch) {
        console.log(response);
        dispatch(toggleMessage(response.data.error))
        return {
            type: types.LOGIN_FAILURE
        }
    }

}


// =========================================================================
// GET USER=================================================================
// =========================================================================

export function getUser() {
    return function (dispatch) {
        dispatch(requestUser())

        axios.get('/api/user').then(function (response) {

            dispatch(receiveUser(response.data.user || {}))

            if (response.data.user) {

                dispatch(getProjectsSuccess(response.data.user.projects))
                dispatch(setNotifications(response.data.user.notifications))
            }


        }).catch(function (error) {
            dispatch(receiveUserFailure(error))
        })

    }

}


function requestUser() {

    return {
        type: types.REQUEST_USER
    }
}


function receiveUser(user) {
    return {
        type: types.RECEIVE_USER,
        user: user
    }
}


function receiveUserFailure(error) {
    console.log("failure receiving user. error:", error);
    return {
        type: types.RECEIVE_USER_FAILURE
    }
}

// =========================================================================
// RESET PASSWORD REQUEST===================================================
// =========================================================================

export function resetPasswordRequest(email) {
    return function (dispatch) {
        dispatch(requestResetPasswordRequest())

        axios.post('/auth/password',
            {email: email})
            .then((result)=> {
                if (result.data.success) {
                    dispatch(resetPasswordRequestSuccess())
                } else {
                    dispatch(toggleMessage(result.data.message))
                    dispatch(resetPasswordRequestFailure())
                }
            }).catch((error)=> {
            console.log("Reset Password Failed", error);
            dispatch(resetPasswordRequestFailure())
        });

    }
}

function requestResetPasswordRequest() {
    return {
        type: types.REQUEST_RESET_PASSWORD_REQUEST
    }
}

function resetPasswordRequestSuccess() {
    return {
        type: types.RESET_PASSWORD_REQUEST_SUCCESS
    }
}

function resetPasswordRequestFailure() {
    return {
        type: types.RESET_PASSWORD_REQUEST_FAILURE
    }
}


// =========================================================================
// RESET PASSWORD===========================================================
// =========================================================================

export function resetPassword(code, userId, password, verify_password) {
    return function (dispatch) {
        //Start action


        if (password !== verify_password) {
            return toggleMessage("Passwords don't match");
        }

        dispatch(requestResetPassword())
        axios.post('/auth/password/reset', {
            code,
            userId,
            password
        }).then(function (result) {
            if (result.data.success) {
                dispatch(requestResetPasswordSuccess(result))
            } else {
                dispatch(requestResetPasswordFailure(result.data.message))
            }
        }).catch(function (error) {
            dispatch(requestResetPasswordFailure(error))
        })

    }
}


function requestResetPassword() {
    return {
        type: types.REQUEST_RESET_PASSWORD
    }
}


function requestResetPasswordSuccess() {
    return {
        type: types.RESET_PASSWORD_SUCCESS,
    }
}


function requestResetPasswordFailure(error) {
    return function (dispatch) {

        dispatch(toggleMessage(error))
        return {
            type: types.RESET_PASSWORD_FAILURE,
        }
    }

}

// =========================================================================
// SET PASSWORD===========================================================
// =========================================================================

export function setPassword(code, userId, password, verify_password) {
    return function (dispatch) {
        //Start action


        if (password !== verify_password) {
            return toggleMessage("Passwords don't match");
        }

        dispatch(requestSetPassword())
        axios.post('/auth/password/set', {
            code,
            userId,
            password
        }).then(function (result) {
            if (result.data.success) {
                dispatch(requestSetPasswordSuccess(result))
            } else {
                dispatch(requestSetPasswordFailure(result.data.message))
            }
        }).catch(function (error) {
            dispatch(requestSetPasswordFailure(error))
        })

    }
}


function requestSetPassword() {
    return {
        type: types.REQUEST_SET_PASSWORD
    }
}


function requestSetPasswordSuccess() {
    return {
        type: types.SET_PASSWORD_SUCCESS,
    }
}


function requestSetPasswordFailure(error) {
    return function (dispatch) {

        dispatch(toggleMessage(error))
        return {
            type: types.SET_PASSWORD_FAILURE
        }
    }

}


// =========================================================================
// ONBOARDING===============================================================
// =========================================================================

export function toggleOnboarding() {
    return function (dispatch) {
        dispatch(requestToggleOnboarding())
        axios.get('/api/onboarding').then(function () {
            dispatch(toggleOnBoardingSuccess())
        }).catch(function (error) {
            dispatch(toggleOnBoardingFailure())
            console.log("toggle onboarding failure", error);
        })


    }
}


function requestToggleOnboarding() {
    return {
        type: types.REQUEST_TOGGLE_ONBOARDING
    }
}

function toggleOnBoardingSuccess() {
    return {
        type: types.TOGGLE_ONBOARDING_SUCCESS
    }
}

function toggleOnBoardingFailure() {
    return {
        type: types.TOGGLE_ONBOARDING_FAILURE
    }
}


// =========================================================================
// PROFILE==================================================================
// =========================================================================

export function toggleUserEditMode() {
    return {
        type: types.TOGGLE_USER_EDIT_MODE
    }
}


export function updateUserProfile(user) {
    return function (dispatch) {
        dispatch(requsetUpdateUserProfile(user))

        axios.post('/api/user/' + user.id, {user}).then(function () {

            dispatch(updateUserProfileSuccess())

        }).catch(function (error) {
            console.log("User Update Failure ", error);
            dispatch(updateUserProfileFailure())
        })

    }
}

function requsetUpdateUserProfile(user) {
    return {
        type: types.REQUEST_UPDATE_USER_PROFILE,
        user: user
    }
}


function updateUserProfileSuccess() {
    return {
        type: types.UPDATE_USER_PROFILE_SUCCESS,
    }
}


function updateUserProfileFailure() {
    return {
        type: types.UPDATE_USER_PROFILE_FAILURE,
    }
}


// =========================================================================
// SIGNUP==================================================================
// =========================================================================

export function signup(email, password, verify_password) {
    return function (dispatch) {

        if (password != verify_password) {
            return dispatch(toggleMessage("Passwords don't match"));
        }

        dispatch(requestSignup())
        axios.post('/auth/signup', {
            email, password, role: "developer"
        }).then(function (response) {
            if (response.data.success) {
                dispatch(signupSuccess())
                window.location.href = "/projects"
            } else {
                dispatch(toggleMessage(response.data.message));
                dispatch(signupFailure(response.data.message))
            }
        })
            .catch(function (error) {
                dispatch(toggleMessage(error));
                dispatch(signupFailure(error))
            });


    }
}

function requestSignup() {
    return {
        type: types.REQUEST_SIGNUP
    }
}

function signupSuccess() {
    return {
        type: types.SIGNUP_SUCCESS
    }
}

function signupFailure() {
    return {
        type: types.SIGNUP_FA
    }
}