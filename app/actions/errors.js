/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 06/08/2016
 * Time: 13:25
 */
import * as types from '../constants/actionTypes'


// =========================================================================
// SET ERROR================================================================
// =========================================================================
export function setError(key, value){
    return {
        type: types.SET_ERROR,
        key,
        value
    }
}


// =========================================================================
// CLEAR ERRORS=============================================================
// =========================================================================

export function clearErrors() {
    return {
        type: types.CLEAR_ERRORS
    }
}