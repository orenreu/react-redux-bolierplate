/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 25/07/2016
 * Time: 12:09
 */
import * as types from '../constants/actionTypes'

const defaultState = {
    user: {},
    email: null,
    userEditMode: false,
    isLoading: false,
    submitted: false,
}


function auth(state = defaultState, action) {

    switch (action.type) {

        case types.LOGIN_SUCCESS:
            return state
           
        
        case types.LOGIN_FAILURE:
            return state


        case types.TOGGLE_USER_EDIT_MODE:
            return {
                ...state,
                userEditMode: !state.userEditMode
            }

        case types.REQUEST_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case types.RESET_PASSWORD_REQUEST_SUCCESS:
            return {
                ...state,
                submitted: true,
                isLoading: false
            }

        case types.RESET_PASSWORD_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        case types.REQUEST_RESET_PASSWORD:
            return {
                ...state,
                isLoading: true,
            }

        case types.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                submitted: true,
                isLoading: false
            }

        case types.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        case types.REQUEST_SET_PASSWORD:
            return {
                ...state,
                isLoading: true,
            }

        case types.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                submitted: true,
                isLoading: false
            }

        case types.SET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false
            }

        case types.REQUEST_SIGNUP:
            return {
                ...state,
                isLoading: true,
            }

        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }

        case types.SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
            }



        default:
            return state
    }

}

export default auth