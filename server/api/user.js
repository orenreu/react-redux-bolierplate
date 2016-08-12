/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 16/06/2016
 * Time: 21:16
 */

const router = require('express').Router()
const mailer = require('../utils/mailer')
const models = require('../models')
const User = models.User
const r = models.r
var constants = require('../utils/constants')
var logger = require('../../logger');





// ====================================================
// GET AUTHENTICATED USER==============================
// ====================================================

router.get('/', function(req,res) {
    if (req.isAuthenticated()) {

        User.get(req.user.id).getJoin({projects: {users:true, admin:true}, notifications:{
            author:true,
            _apply: function (sequence) {
                return sequence.orderBy(r.desc("createdAt")).limit(10)
            }
        }}).run().then(function(user){
            res.json({user:user})
        }).error(handleError(res))

    }
    else
        res.json({})
})




// ====================================================
// UPDATE USER=========================================
// ====================================================

router.post("/:userId", function (req, res) {

    User.get(req.params.userId)
        .run()
        .then(function (user) {
            if(req.body.user.firstName != null && req.body.user.firstName != ""){
                user.firstName = req.body.user.firstName
            }
            if(req.body.user.lastName != null) {
                user.lastName = req.body.user.lastName
            }

            if(req.body.user.avatar != null) {
                user.avatar = req.body.user.avatar
            }

            if(req.body.user.company != null) {
                user.company = req.body.user.company
            }

            user.save().then(function (user) {
                res.json({
                    user: user
                });
            }).error(handleError(res));

        }).error(handleError(res));

})






module.exports = router


function handleError(res) {
    return function (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
}