/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 17/07/2016
 * Time: 15:43
 */
const router = require('express').Router();
const mailer = require('../mailer')
const constants = require('../constants')


router.post('/feedback', function(req, res){
    const emailData = {
        data : {
            rating: req.body.rating,
            name: req.user.firstName + " " + req.user.lastName,
            email: req.user.email,
            message: req.body.message
        }

    }

    mailer.sendMail(constants.SYSTEM_EMAIL, "Somebody left feedback", "feedback", emailData)
        .then(function(response){
        return res.status(200).send({success:true, message:"email was sent"})
    }).catch(handleError(res))
})



router.post('/invite', function(req, res){
    const emailData = {
        data : {
            user: req.user,
            link: constants.SYSTEM_URL
        }

    }

    mailer.sendMail(req.body.email, req.user.firstName + " invited you to Webscope", "invite", emailData)
        .then(function(response){
            return res.status(200).send({success:true, message:"email was sent"})
        }).catch(handleError(res))
})



module.exports = router;

function handleError(res) {
    return function (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
}