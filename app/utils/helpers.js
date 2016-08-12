/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:23
 */

import Axios from 'axios';
import Moment from 'moment';
import mixpanel from 'mixpanel-browser';


module.exports = {

    user: function () {
        return new Promise(function (resolve, reject) {
            Axios.get('/api/user').then((response) => {
                const user = response.data;

                if(user.id !== null){
                    mixpanel.identify(user.id);
                    mixpanel.people.set({
                        $first_name: user.firstName,
                        $last_name: user.lastName,
                        $email: user.email,
                        role: user.role,
                        company: user.company
                    })
                }

                    resolve(user)

                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },

    checkRTL: function (s) {
        var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
            rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
            rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

        return rtlDirCheck.test(s);
    },


    timeFromNow: (time)=> {
        return Moment(time).fromNow()
    },

    capFirst:(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
}

