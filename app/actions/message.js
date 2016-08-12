/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 26/07/2016
 * Time: 22:32
 */
import * as types from '../constants/actionTypes'


export function toggleMessage(message = "", action = null, actionText = null){
    return {
        type: types.TOGGLE_MESSAGE,
        message: message,
        action: action,
        actionText: actionText
    }
}