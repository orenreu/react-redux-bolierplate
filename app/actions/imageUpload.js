/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 28/07/2016
 * Time: 17:41
 */
import * as types from '../constants/actionTypes'
import axios from 'axios'
import mixpanel from 'mixpanel-browser'
import {toggleMessage} from './message'


export function setPreviewImage(image = null) {
    return {
        type: types.SET_PREVIEW_IMAGE,
        image: image
    }
}


export function uploadImage(files, type) {
    return function (dispatch) {

        dispatch(requestUploadImage(files[0].preview))

        var data = new FormData();
        data.append('file', files[0]);
        data.append('type', type);

        axios.post('/file', data).then(function (response) {

            dispatch(uploadImageSuccess(response.data.url))

        }).catch(function (error) {

            console.log("upload image failure", error);
            dispatch(uploadImageFailure())

        })

    }
}



function requestUploadImage(image) {
    return {
        type: types.REQUEST_UPLOAD_IMAGE,
        image: image
    }
}




function uploadImageSuccess(url) {
    return {
        type: types.UPLOAD_IMAGE_SUCCESS,
        url: url
    }
}


function uploadImageFailure() {
    return {
        type: types.UPLOAD_IMAGE_FAILURE
    }
}