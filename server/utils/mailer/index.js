/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 07:56
 */

var constants = require('../constants');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var transporter = require('./config');




//Set and render the template
function setTemplate (template) {
    var templateDir = path.join(__dirname, 'templates', template)
    return transporter.templateSender(new EmailTemplate(templateDir), {
        from: {
            name: constants.SYSTEM_NAME,
            address: constants.SYSTEM_EMAIL
        },
    });
}

//Deliver the email
function deliver (templateTransporter, to, subject, emailData, callback) {
    templateTransporter({
        to: to,
        subject: subject
    }, emailData, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
            return callback(err, null);
        } else {

            return callback(null, info);
        }
    });
}

const mailer = {

    sendMail: function (to, subject, template, emailData) {

        //Set template
        var templateTrasnporter = setTemplate(template)

        return new Promise(function (resolve, reject) {
            //Deliver email
            deliver(templateTrasnporter, to, subject, emailData, function (err, info) {

                if (err != null) {
                    reject(err);
                } else {
                    resolve(info);
                }

            })
        })

    }
}


module.exports = mailer;