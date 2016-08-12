/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 26/07/2016
 * Time: 22:35
 */
import * as types from '../constants/actionTypes'

const defaultState = {
    messageOpen: false,
    message: null,
    actionText: null,
    action: null
}


function message(state = defaultState, action) {

    switch (action.type) {

        case types.TOGGLE_MESSAGE:
            return {
                ...state,
                message: action.message,
                action: action.action,
                actionText: action.text,
                messageOpen: !state.messageOpen
            }

        default:
            return state
    }
}


export default message