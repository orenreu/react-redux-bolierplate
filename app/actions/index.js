/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 25/07/2016
 * Time: 12:26
 */
import * as auth from './auth'
import * as message from './message'
import * as imageUpload from './imageUpload'
import * as errors from './errors'


export default Object.assign({},
    auth,
    message,
    imageUpload,
    errors)