/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 06/08/2016
 * Time: 13:26
 */
import * as types from '../constants/actionTypes'

const defaultState = {}



function errors(state = defaultState, action) {

    switch(action.type) {
        case(types.SET_ERROR):

            return {
                ...state,
                [action.key]: action.value
            }

        case(types.CLEAR_ERRORS):
            return defaultState


        default:
            return state
    }
}


export default errors