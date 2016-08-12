/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 07:31
 */

var nodemailer = require("nodemailer");
var constants = require('../constants');
var path = require('path');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: constants.SMTP_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: constants.SYSTEM_EMAIL,
        pass: constants.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


module.exports = transporter;