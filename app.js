/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:22
 */
const path = require('path');
var webpack = require("webpack");
const cookieParser = require('cookie-parser')
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser')
const express = require('express');
var passport = require('passport');
var session = require('express-session');
var Auth = require('./server/utils/auth')
var User = require('./server/api/user')
var FileUpload = require('./server/utils/file-upload').router
var Contact = require('./server/utils/contact')



const app = new express();



// =========================================================================
// SETUP EXPRESS===================================================================
// =========================================================================
app.use(session({ secret: 'smiley tuesday', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// =========================================================================
// CONNECT DB===================================================================
// =========================================================================
require('./server/models');


// =========================================================================
// WEBPACK===================================================================
// =========================================================================
var compiler = webpack(webpackConfig);
compiler.watch({
    aggregateTimeout: 300,
    poll: true
}, function(err, stats) {
    console.log(err);
});




// =========================================================================
// HELPER FUNCTIONS===================================================================
// =========================================================================

function serveIndex(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

var isNotAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/projects');
}





// =========================================================================
// ROUTES TO APP===================================================================
// =========================================================================
app.get('/', serveIndex);



// =========================================================================
// ROUTES TO API===================================================================
// =========================================================================
app.use('/auth', Auth);
app.use('/api/user', User);



// =========================================================================
// AUTH ROUTES===================================================================
// =========================================================================
app.get('/signup',isNotAuthenticated, serveIndex);
app.get('/login',isNotAuthenticated, serveIndex);
app.get('/password',isNotAuthenticated, serveIndex);
app.get('/password/reset/:userId/:code',isNotAuthenticated, serveIndex);
app.get('/password/set/:userId/:code',isNotAuthenticated, serveIndex);



// Serve all files from public directory
app.use(express.static('public'))



var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Lisetning on port "+ server.address().port);
});