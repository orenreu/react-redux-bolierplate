/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 16:09
 */

var User = require('../../models').User;
var constants = require('../constants')
var passport = require('passport')
const router = require('express').Router();
const mailer = require('../mailer')
var CryptoJS = require('crypto-js');
const moment = require('moment')
require('./passport');


// =========================================================================
// SIGNUP===================================================================
// =========================================================================


function handleSignup(req, res) {

    User.filter({email: req.body.email}).run().then(function (users) {
        if (users.length == 0) {

            var firstName = req.body.email.match(/^([^@]*)@/)[1];

            User.save({
                firstName: firstName,
                email: req.body.email.toLowerCase(),
                password: CryptoJS.MD5(req.body.password).toString(),
                role: req.body.role,
                color: colors[Math.floor(Math.random() * colors.length)]
            }).then(function (user) {

                req.login(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(JSON.stringify({success: true, user: user}))
                });

            }).error(handleError(res));

        } else {
            //Email already is in the DB
            res.status(200).send(JSON.stringify({success: false, message: 'Email already exists'}))
        }


    })
};


// =========================================================================
// ASK TO RESET PASSWORD====================================================
// =========================================================================

function sendResetPasswordEmail(req, res) {


    User.filter({email: req.body.email}).run().then(function (users) {
        if (users.length == 0) {
            //No user with this email in the DB
            res.status(200).send(JSON.stringify({success: false, message: 'User does not exist.'}))
        } else {

            //send response to frontend
            res.status(200).send(JSON.stringify({success: true, message: 'Email was sent'}))

            const user = users[0];

            //Generate code
            const code = Math.random().toString(36).substr(2, 9);

            //store code in db under user
            User.get(user.id).update({
                code: code,
                codeUpdatedAt: new Date()
            }).run().then(function (user) {

                var emailData = {
                    data: {
                        link: constants.SYSTEM_URL + "/password/reset/" + user.id + "/" + code
                    }
                }
                //send email to user with proper link
                mailer.sendMail(user.email, 'Reset Password', 'password', emailData).then(function (result) {

                }).catch(handleError(res))

            }).error(handleError(res));


        }

    });

}


// =========================================================================
// RESET PASSWORD====================================================
// =========================================================================
function resetPassword(req, res) {

    User.get(req.body.userId).run().then(function (user) {

        if (user.code !== req.body.code) {
            //code doesn't match
            return res.status(200).send(JSON.stringify({
                success: false,
                message: 'Reset code mismatch. Please try again'
            }))
        }

        const now = new moment();
        const codeDatePlusDay = moment(user.codeUpdatedAt).add(1, 'days');

        if (now.isAfter(codeDatePlusDay)) {
            //code expired
            return res.status(200).send(JSON.stringify({
                success: false,
                message: 'Reset code expired. Please try again'
            }))
        }

        User.get(user.id).update({
            password: CryptoJS.MD5(req.body.password).toString(),
            code: '',
            codeUpdatedAt: null
        }).then(function (user) {
            return res.status(200).send(JSON.stringify({success: true, message: 'Password was successfully reset'}))
        }).error(handleError(res))

    }).error(handleError(res));

};


// =========================================================================
// SET PASSWORD=============================================================
// =========================================================================
function setPassword(req, res) {

    User.get(req.body.userId).run().then(function (user) {

        if (user.code !== req.body.code) {
            //code doesn't match
            return res.status(200).send(JSON.stringify({
                success: false,
                message: 'Code mismatch, please contact project admin.'
            }))
        }


        User.get(user.id).update({
            password: CryptoJS.MD5(req.body.password).toString(),
            color: colors[Math.floor(Math.random() * colors.length)],
            code: '',
            codeUpdatedAt: null
        }).then(function (user) {
            return res.status(200).send(JSON.stringify({success: true, message: 'Password was successfully set'}))
        }).error(handleError(res))

    }).error(handleError(res));

};


/*

 //Handle Facebook Login
 router.get('/facebook',
 passport.authenticate('facebook', {
 scope: ['email', 'public_profile']
 }))
 //Handle Facebook callback
 router.get('/facebook/callback',
 passport.authenticate('facebook', {
 successRedirect: '/',
 failureRedirect: '/login'
 }));
 */

//Handle Login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user)
            return res.status(401).send({error: info.message});

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send({user: user});
        });
    })(req, res, next);
});


//Handle Signup
router.post('/signup', handleSignup);

//Handle requests for session flash messages
router.get('/flash', function (req, res) {
    res.status(200).send(JSON.stringify(req.flash()))
})


//Handle Logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

//Handle Request to reset password
router.post('/password', sendResetPasswordEmail);

//Handle Request to reset password
router.post('/password/reset', resetPassword);


//Handle Request to set password for new users
router.post('/password/set', setPassword);

function handleError(res) {
    return function (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
}


module.exports = router;


const colors = [
    "#FF4081",
    "#2196F3",
    "#03A9F4",
    "#FBC02D",
    "#FF5722",
    "#64FFDA"
]