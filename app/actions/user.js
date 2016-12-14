/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/12/2016
 * Time: 20:29
 */
import * as types from '../constants/actionTypes'
import axios from 'axios'

// =========================================================================
// GET USER=================================================================
// =========================================================================

export function getUser() {
    return function (dispatch) {
        dispatch(requestUser())

        axios.get('/api/user').then(function (response) {

            dispatch(receiveUser(response.data.user || {}))


        }).catch(function (error) {
            dispatch(receiveUserFailure(error))
        })

    }

}


function requestUser() {

    return {
        type: types.REQUEST_GET_USER
    }
}


function receiveUser(user) {
    return {
        type: types.GET_USER_SUCCESS,
        user: user
    }
}


function receiveUserFailure(error) {
    console.log("failure receiving user. error:", error);
    return {
        type: types.GET_USER_FAILURE
    }
}


// =========================================================================
// UPDATE USER==============================================================
// =========================================================================

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
