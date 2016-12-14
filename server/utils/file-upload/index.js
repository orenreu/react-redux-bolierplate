/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 21/06/2016
 * Time: 15:18
 */
const router = require('express').Router();
var multer  = require('multer');
var upload = multer({ dest: './server/uploads/' });
var cloudinary = require('cloudinary');
var constants = require('../constants');
var fs = require("fs");

cloudinary.config({
    cloud_name: constants.CLOUDINARY_NAME,
    api_key: constants.CLOUDINARY_API_KEY,
    api_secret: constants.CLOUDINARY_API_SECRET
});

router.post('/', upload.single('file'), function (req, res, next) {

    var type = req.body.type
    const file = req.file;

    var options;

    switch(type){
        case avatar:
            options = {
                width: 160,
                height: 160,
                crop: "fill"
            }
        break;
        default:
            options = {}
    }

    // Grab extension from uploaded file
    var re = /(?:\.([^.]+))?$/;
    var extension = re.exec(file.originalname)[1];

    // Move the file to uploads folder
    var path = './public/uploads/'+file.filename+"."+extension;
    fs.rename(file.path, path)

    FileUpload.uploadToCloudinary(path, options, function(url){
        res.status(200).send({url: url});
    })


});



const FileUpload = {

    uploadToCloudinary: function (path, options, callback) {

        // Upload file to cloudinary
        cloudinary.uploader.upload(path, function (result) {
            // Send uploaded image url back
            var url = result.url;
            callback(url);

            // Delete local copy
            fs.unlink(path);
        }, options);

    }
}

module.exports = {router, FileUpload};