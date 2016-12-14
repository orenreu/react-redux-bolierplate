/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/12/2016
 * Time: 20:32
 */
import * as types from '../constants/actionTypes'

const defaultState = {
    user: {},
    isLoading: false,
}

function user(state = defaultState, action) {
    switch(action.type){

        case types.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.user
            }

        case types.GET_USER_FAILURE:
            return state

        case types.REQUEST_UPDATE_USER_PROFILE:
            return {
                ...state,
                user: action.user
            }


        default:
            return state
    }
}

export default user